import { AnimatePresence, motion, type Variants } from "motion/react"
import { useState } from "react"
import { useLocation, useOutlet } from "react-router"

// Captures the route's element when the page mounts. Without this, the page that
// is animating out re-renders with the *new* route's content during its exit.
function FrozenOutlet() {
  const outlet = useOutlet()
  const [frozen] = useState(outlet)
  return frozen
}

export function AnimatedOutlet({ variants, className }: { variants: Variants; className?: string }) {
  const { pathname } = useLocation()

  return (
    // Note: no initial={false} here. It would also suppress every nested
    // entrance animation (hero, page headers) on the first page load.
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}>
      <motion.main
        id="main"
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        className={className}
      >
        <FrozenOutlet />
      </motion.main>
    </AnimatePresence>
  )
}
