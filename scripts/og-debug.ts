import { generateOgImage } from "../lib/og";
import sharp from "sharp";

const c = {
  title: "Built right.\nBuilt to last.",
  eyebrow: "Austin, TX · Est. 2001",
};
const res = await generateOgImage(c);
const { data, info } = await sharp(Buffer.from(await res.arrayBuffer()))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const px = (x: number, y: number) => {
  const i = (y * info.width + x) * info.channels;
  return [data[i], data[i + 1], data[i + 2]];
};

// what is at x 1130-1156 in footer rows?
for (const y of [548, 556, 564, 572, 580, 588]) {
  const samples = [];
  for (const x of [
    1120, 1130, 1136, 1140, 1144, 1148, 1150, 1152, 1155, 1158,
  ]) {
    samples.push(`${x}:${px(x, y).join(",")}`);
  }
  console.log(`y=${y}:`, samples.join(" | "));
}
