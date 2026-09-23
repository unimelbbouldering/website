import { motion } from "motion/react"
import { Link, NavLink } from "react-router"
import { Button } from "@/components/ui/button"
import { AnimatedOutlet, useDesignRoot } from "@/components/shared/AnimatedOutlet"
import { DesignSwitcher } from "@/components/shared/DesignSwitcher"
import { MobileNav } from "@/components/shared/MobileNav"
import { club } from "@/content/site"
import { navPages, pagePath } from "../registry"
import { cn } from "@/lib/utils"

const to = (path: string) => pagePath("chalk", path)

// Pages arrive the way chalk dust settles: out of a soft blur.
const pageVariants = {
  initial: { opacity: 0, filter: "blur(8px)" },
  // Clear the filter afterwards: a leftover blur(0px) keeps text on a separate
  // compositing layer, which renders it slightly soft.
  enter: { opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, filter: "blur(8px)", transition: { duration: 0.2 } },
}

export function Wordmark() {
  return (
    <Link to={to("")} className="font-heading text-lg leading-none font-extrabold tracking-tight [font-stretch:125%]">
      UniMelb<span className="text-[var(--hold)]">.</span>Bouldering
    </Link>
  )
}

export default function ChalkLayout() {
  useDesignRoot("chalk")

  return (
    <div className="min-h-svh">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:bg-card focus:p-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
          <Wordmark />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navPages.map((p) => (
              <NavLink key={p.key} to={to(p.path)} className="relative px-3 py-2 text-sm">
                {({ isActive }) => (
                  <>
                    <span className={cn("transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                      {p.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="chalk-nav"
                        className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-[var(--hold)]"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="lg" className="rounded-sm px-4">
              <Link to={to("join")}>Join the club</Link>
            </Button>
            <MobileNav
              design="chalk"
              contentClassName="bg-background"
              linkClassName={(a) => (a ? "font-semibold text-foreground" : "text-muted-foreground")}
            />
          </div>
        </div>
      </header>

      <AnimatedOutlet variants={pageVariants} className="mx-auto max-w-6xl px-5" />

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <Wordmark />
            <p className="text-sm text-muted-foreground">An affiliated club of the University of Melbourne Student Union.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {navPages.map((p) => (
              <Link key={p.key} to={to(p.path)} className="text-muted-foreground hover:text-foreground">
                {p.label}
              </Link>
            ))}
            <a href={`mailto:${club.email}`} className="text-muted-foreground hover:text-foreground">Email</a>
            <a href={club.instagramUrl} className="text-muted-foreground hover:text-foreground">Instagram</a>
            <a href={club.discordUrl} className="text-muted-foreground hover:text-foreground">Discord</a>
          </nav>
        </div>
      </footer>
      <DesignSwitcher />
    </div>
  )
}
