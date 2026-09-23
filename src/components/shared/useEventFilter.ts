import { useMemo, useState } from "react"
import { events, type EventType } from "@/content/site"

export type EventFilter = EventType | "All"

export function useEventFilter() {
  const [filter, setFilter] = useState<EventFilter>("All")
  const visible = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.type === filter)),
    [filter],
  )
  return { filter, setFilter, visible }
}

export function upcoming(n: number) {
  return events.slice(0, n)
}
