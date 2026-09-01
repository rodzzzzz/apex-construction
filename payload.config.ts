import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";
import { S3ClientConfig } from "@aws-sdk/client-s3";

import { Consultations } from "./collections/Consultations";
import { ContactMessages } from "./collections/ContactMessages";
import { Media } from "./collections/Media";
import { ProjectInquiries } from "./collections/ProjectInquiries";
import { Projects } from "./collections/Projects";
import { QuoteRequests } from "./collections/QuoteRequests";
import { ServiceCategories } from "./collections/ServiceCategories";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { CustomHomes } from "./globals/CustomHomes";
import { SiteSettings } from "./globals/SiteSettings";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required (Postgres connection string).");
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is required.");
}

if (!process.env.CLOUDFLARE_R2_ACCOUNT_ID) {
  throw new Error("CLOUDFLARE_R2_ACCOUNT_ID is required.");
}

if (!process.env.CLOUDFLARE_R2_BUCKET_NAME) {
  throw new Error("CLOUDFLARE_R2_BUCKET_NAME is required.");
}

if (!process.env.CLOUDFLARE_R2_ACCESS_KEY_ID) {
  throw new Error("CLOUDFLARE_R2_ACCESS_KEY_ID is required.");
}

if (!process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY) {
  throw new Error("CLOUDFLARE_R2_SECRET_ACCESS_KEY is required.");
}

function getDatabaseUrl() {
  const url = new URL(process.env.DATABASE_URL!);
  const sslMode = url.searchParams.get("sslmode");

  if (sslMode === "require" || sslMode === "prefer" || sslMode === "verify-ca") {
    url.searchParams.set("sslmode", "verify-full");
  }

  url.searchParams.delete("uselibpqcompat");
  return url.toString();
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: "EEE d MMM yyyy",
    meta: {
      titleSuffix: " — Apex Construction",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/icon.svg",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/components/admin/logo#AdminLogo",
        Icon: "/components/admin/icon#AdminIcon",
      },
      Nav: "/components/admin/nav#StaffNav",
      actions: ["/components/admin/view-site#ViewSiteAction"],
      beforeLogin: ["/components/admin/before-login#BeforeLogin"],
      afterLogin: ["/components/admin/after-login#AfterLogin"],
      views: {
        dashboard: {
          Component: "/components/admin/home#StaffHome",
          meta: {
            title: "Home",
          },
        },
      },
    },
  },
  i18n: {
    translations: {
      en: {
        general: {
          dashboard: "Home",
        },
        authentication: {
          login: "Sign in",
          logOut: "Sign out",
          logout: "Sign out",
        },
      } as never,
    },
  },
  collections: [
    Consultations,
    QuoteRequests,
    ContactMessages,
    ProjectInquiries,
    Services,
    ServiceCategories,
    Projects,
    Users,
    Media,
  ],
  globals: [CustomHomes, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  plugins: [
    s3Storage({
      bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      acl: "public-read",
      config: {
        endpoint: `https://${process.env.CLOUDFLARE_R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        region: "auto",
        credentials: {
          accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        },
        forcePathStyle: true,
      } as S3ClientConfig,
      collections: { media: true },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseUrl(),
    },
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
});
