import Link from "next/link";
import { Facebook, Instagram, Twitter, HardHat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { SITE_LICENSE } from "@/lib/seo";
import type { SiteSetting } from "@/payload-types";

const FOOTER_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/custom-homes", label: "Custom Homes" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
] as const;

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.28em] text-amber uppercase">
        {children}
      </p>
      <span aria-hidden className="mt-4 block h-px w-8 bg-amber/40" />
    </div>
  );
}

export default function Footer({ settings }: { settings: SiteSetting }) {
  const social = [
    { href: settings.instagram, label: "Instagram", icon: Instagram },
    { href: settings.facebook, label: "Facebook", icon: Facebook },
    { href: settings.twitter, label: "X", icon: Twitter },
  ].filter((item): item is { href: string; label: string; icon: LucideIcon } =>
    Boolean(item.href),
  );

  return (
    <footer className="relative overflow-hidden bg-graphite text-chalk">
      <div
        aria-hidden
        className="h-px bg-linear-to-r from-transparent via-amber/50 to-transparent"
      />
      <div aria-hidden className="blueprint-grid absolute inset-0 opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[48rem] -translate-x-1/2 rounded-full bg-amber/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[30%] text-center font-serif text-[50vw] font-bold leading-none text-chalk/4 opacity-40 select-none whitespace-nowrap md:text-[35vw]"
      >
        APEX
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-2 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Logo className="text-2xl tracking-[0.22em] text-chalk" />
            <p className="mt-7 max-w-xs text-base leading-relaxed text-chalk/70">
              {settings.tagline}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.24em] text-chalk/40 uppercase">
              Est. 2001 · Austin, TX
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex size-10 items-center justify-center border border-chalk/15 text-chalk/70 transition-colors duration-500 hover:border-amber/60 hover:text-amber"
                >
                  <item.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <FooterHeading>Build</FooterHeading>
            <ul className="mt-6 space-y-3.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group relative inline-block font-mono text-[11px] tracking-[0.18em] text-chalk/75 uppercase transition-colors duration-500 hover:text-amber"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <FooterHeading>Office</FooterHeading>
            <address className="mt-6 not-italic">
              <ul className="list-none space-y-3.5 px-0">
                <li>
                  <p className="text-sm leading-relaxed text-chalk/75 whitespace-pre-line">
                    {settings.address}
                  </p>
                </li>
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="group relative inline-block text-sm text-chalk/75 transition-colors duration-500 hover:text-amber"
                  >
                    {settings.phone}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="group relative inline-block text-sm text-chalk/75 transition-colors duration-500 hover:text-amber"
                  >
                    {settings.email}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-amber transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </a>
                </li>
                <li className="flex items-center gap-2 pt-1 text-chalk/60">
                  <HardHat className="size-3.5 text-amber/70" />
                  <span className="font-mono text-[11px] tracking-[0.14em]">
                    {SITE_LICENSE} · Licensed & insured
                  </span>
                </li>
              </ul>
            </address>
          </div>
        </div>
      </div>

      <div className="relative border-t border-chalk/10">
        <span
          aria-hidden
          className="absolute top-[-2.5px] left-1/2 size-1.5 -translate-x-1/2 bg-amber/80"
        />
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-3 px-5 py-7 text-xs text-chalk/50 md:flex-row text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} Apex Construction. All rights reserved.
            <Link
              href="/privacy"
              className="ml-3 text-chalk/60 transition-colors duration-500 hover:text-amber"
            >
              Privacy
            </Link>
          </p>

          <a
            href="https://nexuste.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-white/35 transition-colors hover:text-white/70"
          >
            <span>Powered by</span>
            <img
              src="/nexus-technologies.svg"
              alt=""
              width={16}
              height={16}
              className="size-4 shrink-0"
            />
            <span className="font-medium text-white/55">
              Nexus Technologies
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
