import { useState, type ReactNode } from "react"
import { NavLink } from "react-router"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { club } from "@/content/site"
import { navPages, pagePath } from "@/site/routes"
import { cn } from "@/lib/utils"

export function MobileNav({
  className,
  contentClassName,
  linkClassName,
  footer,
}: {
  className?: string
  contentClassName?: string
  linkClassName?: (active: boolean) => string
  footer?: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className={cn("lg:hidden", className)} aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className={cn("gap-0 p-6 pt-14", contentClassName)}>
        <SheetTitle className="sr-only">{club.name} menu</SheetTitle>
        <nav className="flex flex-col gap-1" aria-label="Main">
          {navPages.map((l) => (
            <NavLink
              key={l.key}
              to={pagePath(l.path)}
              end={l.path === ""}
              onClick={() => setOpen(false)}
              className={({ isActive }) => cn("rounded-md px-3 py-2.5 text-lg", linkClassName?.(isActive))}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        {footer && <div className="mt-8" onClick={() => setOpen(false)}>{footer}</div>}
      </SheetContent>
    </Sheet>
  )
}
