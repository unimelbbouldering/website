export type PageKey = "home" | "about" | "events" | "committee" | "sponsors" | "faq" | "contact" | "join"

export const pageOrder: { key: PageKey; path: string; label: string }[] = [
  { key: "home", path: "", label: "Home" },
  { key: "about", path: "about", label: "About" },
  { key: "events", path: "events", label: "Events" },
  { key: "committee", path: "committee", label: "Our team" },
  { key: "sponsors", path: "sponsors", label: "Partners" },
  { key: "faq", path: "faq", label: "FAQ" },
  { key: "contact", path: "contact", label: "Contact" },
  { key: "join", path: "join", label: "Join" },
]

// Everything except Join, which each design renders as its own call to action.
export const navPages = pageOrder.filter((p) => p.key !== "join" && p.key !== "home")

export type DesignId = "chalk" | "tape"

export const designs: { id: DesignId; name: string; summary: string; swatches: string[]; font: string; titleStyle: { fontWeight: number; fontStretch?: string } }[] = [
  {
    id: "chalk",
    name: "Chalk",
    summary: "The professional option. Cool grey and graphite with magenta, blue and amber route colours, wide headlines and plenty of photos.",
    swatches: ["#EEF0F1", "#22262A", "#D6336C", "#2F5DA8", "#C98A1B"],
    font: "'Archivo Variable', sans-serif",
    titleStyle: { fontWeight: 800, fontStretch: "125%" },
  },
  {
    id: "tape",
    name: "Tape",
    summary: "The creative option. A bright gym wall where every page is a route with its own tape colour, and holds pin up the team.",
    swatches: ["#FFFFFF", "#1A1A2E", "#FFD23F", "#3A86FF", "#FF4D8D"],
    font: "'Bricolage Grotesque Variable', sans-serif",
    titleStyle: { fontWeight: 800 },
  },
]

// Set VITE_DESIGN at build time to ship a single design at the site root,
// without the picker or switcher. Unset, every design is served under /<id>.
const envDesign = import.meta.env.VITE_DESIGN as string | undefined
export const lockedDesign = designs.find((d) => d.id === envDesign)?.id

export function pagePath(design: DesignId, path: string) {
  const base = lockedDesign ? "" : `/${design}`
  return path ? `${base}/${path}` : base || "/"
}
