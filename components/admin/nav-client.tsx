"use client";

import { Link, useConfig } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import { usePathname } from "next/navigation";
import {
  ACCOUNT_LINKS,
  LEAD_LINKS,
  WEBSITE_LINKS,
  type LeadCounts,
} from "@/lib/staff";

type StaffNavClientProps = {
  counts: LeadCounts;
};

function stripSlash(path: string) {
  if (path === "/") return path;
  return path.replace(/\/$/, "") || "/";
}

function isActivePath(pathname: string, href: string, exact = false) {
  const current = stripSlash(pathname);
  const target = stripSlash(href);
  if (current === target) return true;
  if (exact) return false;
  return current.startsWith(`${target}/`);
}

export function StaffNavClient({ counts }: StaffNavClientProps) {
  const pathname = usePathname();
  const { config } = useConfig();
  const adminRoute = config.routes.admin;

  const hrefFor = (path: `/${string}`) =>
    stripSlash(
      formatAdminURL({
        adminRoute,
        path,
      }),
    );

  const homeHref = stripSlash(formatAdminURL({ adminRoute, path: "" }));
  const accountHref = stripSlash(
    formatAdminURL({
      adminRoute,
      path: config.admin.routes.account,
    }),
  );
  const logoutHref = stripSlash(
    formatAdminURL({
      adminRoute,
      path: config.admin.routes.logout,
    }),
  );

  return (
    <>
      <div className="apex-nav__body">
        <NavItem
          href={homeHref}
          label="Home"
          letter="H"
          pathname={pathname}
          exact
        />

        <p className="apex-nav__section">Leads</p>
        {LEAD_LINKS.map((item) => (
          <NavItem
            key={item.slug}
            href={hrefFor(item.path)}
            label={item.label}
            letter={item.letter}
            pathname={pathname}
            badge={counts[item.slug]}
          />
        ))}

        <p className="apex-nav__section">Website</p>
        {WEBSITE_LINKS.map((item) => (
          <NavItem
            key={item.path}
            href={hrefFor(item.path)}
            label={item.label}
            letter={item.letter}
            pathname={pathname}
          />
        ))}

        <p className="apex-nav__section">Account</p>
        {ACCOUNT_LINKS.map((item) => (
          <NavItem
            key={item.path}
            href={hrefFor(item.path)}
            label={item.label}
            letter={item.letter}
            pathname={pathname}
          />
        ))}
      </div>

      <div className="apex-nav__footer">
        <a
          className="apex-nav__footer-link"
          href="/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="apex-nav__letter" aria-hidden>
            W
          </span>
          <span className="apex-nav__footer-label">View website</span>
        </a>
        <NavItem
          href={accountHref}
          label="Account"
          letter="U"
          pathname={pathname}
        />
        <a className="apex-nav__footer-link" href={logoutHref}>
          <span className="apex-nav__letter" aria-hidden>
            S
          </span>
          <span className="apex-nav__footer-label">Sign out</span>
        </a>
      </div>
    </>
  );
}

function NavItem({
  href,
  label,
  letter,
  pathname,
  badge = 0,
  exact = false,
}: {
  href: string;
  label: string;
  letter: string;
  pathname: string;
  badge?: number;
  exact?: boolean;
}) {
  const active = isActivePath(pathname, href, exact);

  return (
    <Link
      className={`nav__link apex-nav__link${active ? " is-active" : ""}`}
      href={href}
      prefetch={false}
    >
      {active ? <div className="nav__link-indicator" /> : null}
      <span className="apex-nav__letter" aria-hidden>
        {letter}
      </span>
      <span className="nav__link-label">{label}</span>
      {badge > 0 ? <span className="apex-nav__badge">{badge}</span> : null}
    </Link>
  );
}
