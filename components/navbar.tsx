"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { briefCount, useBrief } from "@/lib/brief";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/custom-homes", label: "Custom Homes" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useBrief((state) => briefCount(state.items));
  const openBrief = useBrief((state) => state.openBrief);
  const isHeroPage =
    pathname === "/" ||
    pathname === "/custom-homes" ||
    pathname === "/services" ||
    pathname === "/projects" ||
    pathname === "/process" ||
    pathname === "/about" ||
    pathname === "/quote" ||
    pathname === "/contact" ||
    pathname === "/brief" ||
    pathname === "/privacy";
  const onHero = isHeroPage && !scrolled && !open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500",
        isHeroPage ? "fixed inset-x-0 top-0" : "sticky top-0",
        onHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-3 px-5 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-6 lg:gap-10">
          <Logo
            className={cn(
              "shrink-0 transition-colors duration-500",
              onHero && "text-chalk [&_.fill-foreground]:fill-chalk",
            )}
          />
          <nav
            className="hidden items-center gap-4 md:flex lg:gap-6"
            aria-label="Main"
          >
            {NAV_LINKS.map((link) => {
              const isActive = linkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-500 lg:text-[12px] lg:tracking-[0.18em]",
                    onHero
                      ? "text-chalk/75 hover:text-chalk"
                      : "text-muted-foreground hover:text-foreground",
                    isActive && (onHero ? "text-amber" : "text-amber"),
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px w-full origin-left bg-amber transition-transform duration-500",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="ml-auto hidden shrink-0 items-center gap-2 md:flex">
          <ThemeToggle
            className={
              onHero
                ? "text-chalk hover:bg-chalk/10 hover:text-chalk"
                : undefined
            }
          />
          <button
            type="button"
            onClick={openBrief}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "relative",
              onHero &&
                "border-chalk/40 text-chalk hover:border-amber hover:text-chalk",
            )}
            aria-label={count > 0 ? `Open brief, ${count} items` : "Open brief"}
          >
            Brief
            {count > 0 ? (
              <span className="ml-1 inline-flex min-w-5 items-center justify-center bg-amber px-1.5 font-mono text-[10px] tracking-normal text-graphite">
                {count}
              </span>
            ) : null}
          </button>
          <Link
            href="/quote"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: onHero ? "amber" : "default",
              }),
            )}
          >
            Get a Quote
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={openBrief}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative",
              onHero && "text-chalk hover:bg-chalk/10 hover:text-chalk",
            )}
            aria-label={count > 0 ? `Open brief, ${count} items` : "Open brief"}
          >
            <span className="font-mono text-[11px] tracking-[0.12em] uppercase">
              Brief
            </span>
            {count > 0 ? (
              <span className="absolute top-1 right-1 size-1.5 bg-amber" />
            ) : null}
          </button>
          <ThemeToggle
            className={
              onHero
                ? "text-chalk hover:bg-chalk/10 hover:text-chalk"
                : undefined
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className={
              onHero
                ? "text-chalk hover:bg-chalk/10 hover:text-chalk"
                : undefined
            }
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      {open ? (
        <div className="animate-in fade-in slide-in-from-top-4 border-t border-border bg-background px-5 py-8 duration-500 md:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "font-serif text-3xl font-bold text-foreground",
                  linkActive(link.href) && "text-amber",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "amber" }), "mt-4")}
            >
              Get a quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
