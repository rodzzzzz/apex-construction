/**
 * OG image pixel verifier.
 * Renders each generateOgImage() and asserts layout invariants:
 *  - frame present and roughly symmetric
 *  - footer: left text starts near left padding, right text ends near right padding
 *  - title: chalk ink present in title zone, starting near the left margin
 *  - nothing crowds the canvas edges
 */
import { generateOgImage } from "../lib/og";
import sharp from "sharp";

const CASES = [
  {
    key: "home",
    title: "Built right.\nBuilt to last.",
    eyebrow: "Austin, TX · Est. 2001",
  },
  {
    key: "services",
    title: "Every scope,\npriced straight.",
    eyebrow: "Services",
    subtitle: "24 services · 6 disciplines · fixed-price discipline",
  },
  {
    key: "custom-homes",
    title: "Apex\nCustom Homes",
    eyebrow: "Custom Homes",
    subtitle: "120+ homes delivered · fixed-price contracts",
  },
  {
    key: "projects",
    title: "Work we can\npoint to.",
    eyebrow: "Projects",
    subtitle: "400+ delivered across Central Texas",
  },
  {
    key: "process",
    title: "How an Apex\nbuild runs.",
    eyebrow: "Process",
    subtitle: "Pre-construction → design → build → handover",
  },
  {
    key: "about",
    title: "Builders,\nnot brokers.",
    eyebrow: "About",
    subtitle: "25+ years on Texas ground · 65 team members",
  },
  {
    key: "quote",
    title: "Start with a\nstraight answer.",
    eyebrow: "Quote",
    subtitle: "Free consultation · response within one business day",
  },
  {
    key: "contact",
    title: "Talk to a\nbuilder today.",
    eyebrow: "Contact",
    subtitle: "Austin, TX · Mon–Fri 7AM–5PM",
  },
  {
    key: "brief",
    title: "Your brief,\nitemized.",
    eyebrow: "Quote builder",
    subtitle: "Review services · request firm numbers",
  },
  {
    key: "privacy",
    title: "How we look\nafter your details.",
    eyebrow: "Privacy",
    subtitle: "Collected with care, used to build",
  },
  {
    key: "service-detail",
    title: "Warehouse & Industrial",
    eyebrow: "Services",
    subtitle: "from $95 · Austin, TX",
  },
];

const W = 1200;
const H = 630;
// Frame is drawn at inset PAD-8 → occupies x ≈ 44 … 1155 (1px stroke)
const FRAME_L = 44;
const FRAME_R = 1155;

let failures = 0;

function analyze(name: string, buf: Buffer) {
  return (async () => {
    const issues: string[] = [];
    if (buf.subarray(0, 4).toString("hex") !== "89504e47")
      issues.push("not a PNG");

    const { data, info } = await sharp(buf)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const px = (x: number, y: number) => {
      const i = (y * info.width + x) * info.channels;
      return [data[i], data[i + 1], data[i + 2]];
    };
    const isBg = ([r, g, b]: number[]) => r < 55 && g < 55 && b < 60;
    const isChalk = ([r, g, b]: number[]) => r > 150 && g > 150 && b > 150;
    const isAmberText = ([r, g, b]: number[]) =>
      r > 150 && b < 130 && r - b > 60 && g < 210;

    // 1. frame check: ink at frame coordinates on a middle row
    const midY = Math.floor(H / 2);
    if (isBg(px(FRAME_L, midY)) || isBg(px(FRAME_R, midY)))
      issues.push("frame missing");

    // 2. ink bbox excluding the 6px frame band, sampled
    let minX = W,
      maxX = 0;
    for (let y = 0; y < H; y += 2) {
      for (let x = 0; x < W; x += 2) {
        if (x <= FRAME_L + 2 || x >= FRAME_R - 2) continue;
        if (!isBg(px(x, y))) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
    }
    if (minX > 90)
      issues.push(`content too far right of left frame: starts ${minX}`);
    if (maxX < 1120)
      issues.push(`content too far left of right frame: ends ${maxX}`);

    // 3. footer zone (y 540–595), inside frame, excluding bottom-right corner
    //    bracket (48×48 amber stroke anchored at frame corner)
    const bracketInset = 56; // bracket arm reaches ~44+4 inward from frame
    let lf = -1,
      ll = -1,
      rf = -1,
      rl = -1;
    for (let y = 540; y <= 595; y += 2) {
      for (let x = FRAME_L + 6; x <= FRAME_R - 6; x += 2) {
        // skip the bottom-right bracket zone (y >= 630-44-52 …)
        if (x >= FRAME_R - bracketInset && y >= H - 44 - 44) continue;
        const p = px(x, y);
        if (!isBg(p) && (isAmberText(p) || isChalk(p) || p[0] > 100)) {
          if (x < 600) {
            if (lf === -1) lf = x;
            ll = Math.max(ll, x);
          } else {
            if (rf === -1) rf = x;
            rl = Math.max(rl, x);
          }
        }
      }
    }
    if (lf === -1) issues.push("footer left text missing");
    if (rf === -1) issues.push("footer right text missing");
    if (lf !== -1 && (lf < 56 || lf > 72))
      issues.push(`footer left start ${lf} ≠ ~62`);
    if (rl !== -1 && (rl < 1075 || rl > 1112))
      issues.push(`footer right end ${rl} not in 1075–1112`);

    // 4. title zone (y 180–470): find the row with the most chalk ink (the title
    //    baseline), then measure its left start — avoids catching stray marks
    let bestRow = -1,
      bestCount = 0,
      tf = -1,
      tl = 0;
    for (let y = 180; y <= 470; y += 2) {
      let rowFirst = -1,
        rowLast = 0,
        rowCount = 0;
      for (let x = FRAME_L + 6; x <= FRAME_R - 6; x += 2) {
        if (isChalk(px(x, y))) {
          rowCount++;
          if (rowFirst === -1) rowFirst = x;
          rowLast = Math.max(rowLast, x);
        }
      }
      if (rowCount > bestCount) {
        bestCount = rowCount;
        bestRow = y;
        tf = rowFirst;
        tl = rowLast;
      }
    }
    if (tf === -1) issues.push("title text missing");
    if (tf !== -1 && (tf < 88 || tf > 112))
      issues.push(`title left start ${tf} not near 100 (row ${bestRow})`);
    if (tl > FRAME_R - 60) issues.push(`title crowds right frame: ${tl}`);

    const status = issues.length === 0 ? "PASS" : `FAIL(${issues.length})`;
    console.log(
      `${status.padEnd(8)} ${name.padEnd(15)} footer ${lf}–${rl}  title ${tf}–${tl}  inkExtent ${minX}–${maxX}`,
    );
    if (issues.length) {
      console.log("         → " + issues.join(" | "));
      failures += issues.length;
    }
  })();
}

(async () => {
  for (const c of CASES) {
    const res = await generateOgImage(c);
    const buf = Buffer.from(await res.arrayBuffer());
    await analyze(c.key, buf);
  }
  console.log(
    failures === 0
      ? "\n=== ALL OG LAYOUT CHECKS PASS ==="
      : `\n=== ${failures} ISSUES ===`,
  );
  process.exit(failures === 0 ? 0 : 1);
})();
