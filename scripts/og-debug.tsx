import { generateOgImage } from "../lib/og";

const cases = [
  {
    key: "home",
    title: "Built right. Built to last.",
    footer: "Austin, TX · General Contractor",
  },
  {
    key: "services",
    title: "Every scope, priced straight",
    eyebrow: "Services",
    footer: "Austin, TX · General Contractor",
  },
  {
    key: "privacy",
    title: "How we look after your details",
    eyebrow: "Privacy",
    footer: "Austin, TX · General Contractor",
  },
  {
    key: "process",
    title: "How an Apex build runs",
    eyebrow: "Process",
    footer: "Austin, TX · General Contractor",
  },
];

for (const c of cases) {
  const r = await generateOgImage({
    title: c.title,
    eyebrow: c.eyebrow,
    footer: c.footer,
  });
  const buf = Buffer.from(await r.arrayBuffer());
  const magic = buf.subarray(0, 8).toString("hex");
  const ok = magic === "89504e470d0a1a0a".slice(0, 16);
  console.log(
    `${c.key}: ${buf.byteLength} bytes, magic=${magic} ${ok ? "(valid PNG header)" : "(INVALID!)"}`,
  );
  const sharp = (await import("sharp")).default;
  try {
    const meta = await sharp(buf).metadata();
    console.log(`  sharp OK: ${meta.width}x${meta.height} ${meta.format}`);
  } catch (e) {
    console.log(`  sharp FAILED: ${(e as Error).message}`);
  }
}
