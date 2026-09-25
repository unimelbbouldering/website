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

// Everything except Join, which the header renders as its own call to action.
export const navPages = pageOrder.filter((p) => p.key !== "join")

export function pagePath(path: string) {
  return `/${path}`
}
