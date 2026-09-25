import { useMemo, useState } from "react"
import { events, type ClubEvent, type EventType } from "@/content/site"

export type EventFilter = EventType | "All"

export function useEventFilter() {
  const [filter, setFilter] = useState<EventFilter>("All")
  const visible = useMemo(
    () => (filter === "All" ? events : events.filter((e) => e.type === filter)),
    [filter],
  )
  return { filter, setFilter, visible }
}

// Compares ISO dates as strings, against today's date in the visitor's timezone.
const today = () => new Date().toLocaleDateString("en-CA")

export function isPast(event: ClubEvent) {
  return event.date < today()
}

export function upcoming(n: number) {
  return events.filter((e) => !isPast(e)).sort((a, b) => a.date.localeCompare(b.date)).slice(0, n)
}
