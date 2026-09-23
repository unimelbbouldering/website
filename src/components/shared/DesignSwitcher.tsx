import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Link, useLocation } from "react-router"
import { Layers, X } from "lucide-react"
import { designs } from "@/designs/registry"
import { cn } from "@/lib/utils"

// Preview-only control for comparing the four directions on the same page.
export function DesignSwitcher() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [, current, ...rest] = pathname.split("/")
  const sub = rest.join("/")

  return (
    <div className="fixed bottom-4 left-4 z-50 font-[system-ui] text-sm">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="mb-2 w-56 origin-bottom-left rounded-xl border border-black/10 bg-white p-1.5 text-neutral-900 shadow-lg"
          >
            <Link to="/" className="block rounded-lg px-3 py-2 text-neutral-500 hover:bg-neutral-100">
              All designs
            </Link>
            {designs.map((d) => (
              <Link
                key={d.id}
                to={sub ? `/${d.id}/${sub}` : `/${d.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 hover:bg-neutral-100",
                  d.id === current && "bg-neutral-100 font-medium",
                )}
              >
                {d.name}
                <span className="flex -space-x-1">
                  {d.swatches.slice(0, 3).map((s) => (
                    <span key={s} className="size-3 rounded-full ring-1 ring-black/10" style={{ background: s }} />
                  ))}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white p-2.5 sm:px-3.5 sm:py-2 text-neutral-900 shadow-md transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
      >
        {open ? <X className="size-4" /> : <Layers className="size-4" />}
        <span className="sr-only sm:not-sr-only">Switch design</span>
      </button>
    </div>
  )
}
