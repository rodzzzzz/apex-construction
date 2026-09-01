import { withPayload } from "@payloadcms/next/withPayload";

const r2Account = process.env.CLOUDFLARE_R2_ACCOUNT_ID || "";
const r2Bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(r2Account && r2Bucket
        ? [
            {
              protocol: "https",
              hostname: `${r2Account}.r2.cloudflarestorage.com`,
              pathname: `/${r2Bucket}/**`,
            },
          ]
        : []),
    ],
    qualities: [75, 100],
  },
};

export default withPayload(nextConfig);
