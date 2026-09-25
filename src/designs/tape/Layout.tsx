import { motion } from "motion/react"
import { Link, NavLink } from "react-router"
import { Button } from "@/components/ui/button"
import { AnimatedOutlet, useDesignRoot } from "@/components/shared/AnimatedOutlet"
import { DesignSwitcher } from "@/components/shared/DesignSwitcher"
import { MobileNav } from "@/components/shared/MobileNav"
import { club } from "@/content/site"
import { navPages, pagePath } from "../registry"
import { cn } from "@/lib/utils"
import { Hold } from "./Tape"

const to = (path: string) => pagePath("tape", path)

const pageVariants = {
  initial: { opacity: 0, scale: 0.985 },
  enter: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 30 } },
  exit: { opacity: 0, scale: 0.99, transition: { duration: 0.15 } },
}

function Wordmark() {
  return (
    <Link to={to("")} className="flex items-center gap-2 text-base font-extrabold tracking-tight whitespace-nowrap sm:text-lg">
      <Hold color="var(--tape-yellow)" className="size-7" />
      UniMelb Bouldering
    </Link>
  )
}

export default function TapeLayout() {
  useDesignRoot("tape")

  return (
    <div className="min-h-svh overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:rounded-lg focus:bg-muted focus:p-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5">
          <Wordmark />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navPages.map((p) => (
              <NavLink key={p.key} to={to(p.path)} className="relative px-3 py-2 text-[15px] font-medium">
                {({ isActive }) => (
                  <>
                    <span className={cn("transition-colors", isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                      {p.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="tape-nav"
                        className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-foreground"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="lg" className="h-10 rounded-full px-5 font-semibold">
              <Link to={to("join")}>Join us</Link>
            </Button>
            <MobileNav
              design="tape"
              contentClassName="rounded-l-3xl"
              linkClassName={(a) => cn("font-semibold", a ? "bg-muted" : "text-muted-foreground")}
            />
          </div>
        </div>
      </header>

      <AnimatedOutlet variants={pageVariants} className="mx-auto max-w-6xl origin-top px-5" />

      <footer className="mt-24 border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1.5">
            <Wordmark />
          </div>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {navPages.map((p) => (
              <Link key={p.key} to={to(p.path)} className="text-muted-foreground hover:text-foreground">
                {p.label}
              </Link>
            ))}
            <a href={`mailto:${club.email}`} className="text-muted-foreground hover:text-foreground">Email</a>
            <a href={club.instagramUrl} aria-label="Instagram" className="-my-3 inline-flex size-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </nav>
        </div>
      </footer>
      <DesignSwitcher />
    </div>
  )
}
