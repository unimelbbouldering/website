import { motion } from "motion/react"
import { Link } from "react-router"
import { designs } from "@/designs/registry"
import { club } from "@/content/site"

// Internal page for comparing the four design directions side by side.
export default function Picker() {
  return (
    <main className="mx-auto min-h-svh max-w-5xl px-5 py-16 md:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight [font-stretch:115%] md:text-5xl">{club.name}</h1>
      <p className="mt-3 max-w-xl text-lg text-muted-foreground">
        Two design directions for the new club website. Each has every page; use the switcher in the corner to compare them on the same page.
      </p>
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {designs.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/${d.id}`}
              className="group block rounded-xl border border-border p-6 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <div className="flex gap-1.5">
                {d.swatches.map((s) => (
                  <span key={s} className="h-8 flex-1 rounded-md ring-1 ring-black/10" style={{ background: s }} />
                ))}
              </div>
              <h2 className="mt-6 text-3xl" style={{ fontFamily: d.font, ...d.titleStyle }}>
                {d.name}
              </h2>
              <p className="mt-2 text-muted-foreground">{d.summary}</p>
              <span className="mt-5 inline-block text-sm font-medium underline-offset-4 group-hover:underline">Open {d.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  )
}
