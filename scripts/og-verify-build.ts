/**
 * Pixel-verify the prerendered production OG images found under .next/server/app.
 */
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = ".next/server/app";

function findOgBodies(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) findOgBodies(full, acc);
    else if (entry.name.startsWith("opengraph-image") && entry.name.endsWith(".body")) acc.push(full);
  }
  return acc;
}

const W = 1200;
const H = 630;
const FRAME_L = 44;
const FRAME_R = 1155;

let failures = 0;
const files = findOgBodies(ROOT);
console.log(`Found ${files.length} prerendered OG images\n`);

for (const file of files) {
  const name = path.relative(ROOT, file).replace("/opengraph-image", " ").replace(/\.body$/, "");
  const issues: string[] = [];
  const buf = statSync(file) ? Buffer.from(await (await import("node:fs/promises")).readFile(file)) : Buffer.alloc(0);
  if (buf.subarray(0, 4).toString("hex") !== "89504e47") issues.push("not PNG");

  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = (x: number, y: number) => {
    const i = (y * info.width + x) * info.channels;
    return [data[i], data[i + 1], data[i + 2]];
  };
  const isBg = ([r, g, b]: number[]) => r < 55 && g < 55 && b < 60;
  const isChalk = ([r, g, b]: number[]) => r > 150 && g > 150 && b > 150;
  const isAmberText = ([r, g, b]: number[]) => r > 150 && b < 130 && r - b > 60 && g < 210;

  // frame present
  const midY = Math.floor(H / 2);
  if (isBg(px(FRAME_L, midY)) || isBg(px(FRAME_R, midY))) issues.push("frame missing");

  // footer zone excluding corner bracket
  let lf = -1, rl = -1;
  for (let y = 540; y <= 595; y += 2) {
    for (let x = FRAME_L + 6; x <= FRAME_R - 6; x += 2) {
      if (x >= FRAME_R - 56 && y >= H - 88) continue;
      const p = px(x, y);
      if (!isBg(p) && (isAmberText(p) || isChalk(p) || p[0] > 100)) {
        if (x < 600) { if (lf === -1) lf = x; }
        else rl = Math.max(rl, x);
      }
    }
  }
  if (lf === -1) issues.push("footer left text missing");
  if (rl === -1) issues.push("footer right text missing");
  if (lf !== -1 && (lf < 56 || lf > 72)) issues.push(`footer left start ${lf}`);
  if (rl !== -1 && (rl < 1075 || rl > 1112)) issues.push(`footer right end ${rl}`);

  // title zone: densest chalk row
  let tf = -1, tl = 0;
  for (let y = 180; y <= 470; y += 2) {
    let rf = -1, rlast = 0, count = 0;
    for (let x = FRAME_L + 6; x <= FRAME_R - 6; x += 2) {
      if (isChalk(px(x, y))) { count++; if (rf === -1) rf = x; rlast = Math.max(rlast, x); }
    }
    if (count > 20 && (tf === -1 || rf < tf)) { tf = rf; tl = rlast; }
  }
  if (tf === -1) issues.push("title text missing");
  if (tf !== -1 && (tf < 88 || tf > 112)) issues.push(`title left ${tf}`);
  if (tl > FRAME_R - 60) issues.push(`title crowds right: ${tl}`);

  const status = issues.length === 0 ? "PASS" : `FAIL(${issues.length})`;
  console.log(`${status.padEnd(8)} ${name.padEnd(28)} footer ${lf}–${rl}  title ${tf}–${tl}`);
  if (issues.length) { console.log("         → " + issues.join(" | ")); failures += issues.length; }
}

console.log(failures === 0 ? `\n=== ALL ${files.length} PRODUCTION OG IMAGES PASS ===` : `\n=== ${failures} ISSUES ===`);
process.exit(failures === 0 ? 0 : 1);
