import type { CSSProperties, ReactNode } from "react"
import { motion } from "motion/react"
import type { EventType, HoldType } from "@/content/site"
import { cn } from "@/lib/utils"

export const eventTape: Record<EventType, string> = {
  Social: "var(--tape-pink)",
  Beginners: "var(--tape-green)",
  Workshop: "var(--tape-blue)",
  Outdoor: "var(--tape-orange)",
  Comp: "var(--tape-purple)",
}

// Torn ends on both sides of a strip of tape.
const torn = "polygon(0 8%, 2% 0, 98% 6%, 100% 0, 99% 50%, 100% 100%, 97% 94%, 1% 100%, 0 92%, 1.5% 50%)"

export function TapeStrip({ color, className, delay = 0.15 }: { color: string; className?: string; delay?: number }) {
  return (
    <motion.span
      aria-hidden
      className={cn("absolute block origin-left", className)}
      style={{ background: color, clipPath: torn }}
      initial={{ scaleX: 0, rotate: -4 }}
      animate={{ scaleX: 1, rotate: -1.5 }}
      transition={{ delay, duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
    />
  )
}

const holdPaths = [
  "M22 4c10-3 22 2 26 12s-1 24-12 29S10 47 5 37 12 7 22 4z",
  "M8 14C14 3 34 0 44 8s8 24-2 32-30 6-36-4S2 25 8 14z",
  "M16 6c12-6 30 0 32 14 2 12-10 18-20 24S4 44 3 32 4 12 16 6z",
]

// A climbing hold: a blob with a bolt hole.
export function Hold({ color, variant = 0, className }: { color: string; variant?: number; className?: string }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden className={className}>
      <path d={holdPaths[variant % holdPaths.length]} fill={color} />
      <circle cx="26" cy="25" r="3.2" fill="#1A1A2E" opacity="0.35" />
    </svg>
  )
}

const bolt = <circle cx="26" cy="26" r="2.6" fill="#1A1A2E" opacity="0.35" />
const shade = "#1A1A2E"

// One drawing per hold type, so a member's pin shows their favourite hold.
const holdShapes: Record<HoldType, (color: string) => ReactNode> = {
  // Big positive bucket: rounded body with a deep incut along the top.
  Jug: (c) => (
    <>
      <path d="M5 20C5 10 15 6 26 6s21 4 21 14c0 15-10 26-21 26S5 35 5 20z" fill={c} />
      <path d="M11 17c5-5 25-5 30 0c-2 6-8 9-15 9s-13-3-15-9z" fill={shade} opacity="0.4" />
      <circle cx="26" cy="35" r="2.6" fill={shade} opacity="0.35" />
    </>
  ),
  // Thin edge: wide and shallow, with a sharp lip.
  Crimp: (c) => (
    <>
      <path d="M3 21c12-5 34-5 46 0c1.5 4 0.5 8-2 9.5c-13 3-29 3-42 0C2.5 29 1.5 25 3 21z" fill={c} />
      <path d="M4 22c12-4 32-4 44 0" stroke={shade} strokeOpacity="0.45" strokeWidth="2" fill="none" />
      {bolt}
    </>
  ),
  // Smooth dome with nothing to hold except friction.
  Sloper: (c) => (
    <>
      <ellipse cx="26" cy="27" rx="23" ry="19" fill={c} />
      <ellipse cx="18" cy="19" rx="9" ry="5" fill="#fff" opacity="0.35" transform="rotate(-20 18 19)" />
      {bolt}
    </>
  ),
  // Tall fin you squeeze from both sides.
  Pinch: (c) => (
    <>
      <path d="M19 4c5-2 13 0 14 7l2 30c0 6-5 9-10 9s-9-3-9-9l0-29c0-4 1-7 3-8z" fill={c} />
      <path d="M25 8v38" stroke={shade} strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="25" cy="27" r="2.6" fill={shade} opacity="0.35" />
    </>
  ),
  // Blob with a finger pocket drilled into it.
  Pocket: (c) => (
    <>
      <path d="M8 14C14 3 34 1 44 9s8 24-2 32-30 6-36-4S2 25 8 14z" fill={c} />
      <ellipse cx="24" cy="23" rx="8" ry="5.5" fill={shade} opacity="0.5" />
      <circle cx="34" cy="36" r="2.6" fill={shade} opacity="0.35" />
    </>
  ),
}

export function TypedHold({ type, color, className, style }: { type: HoldType; color: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 52 52" aria-hidden className={className} style={style}>
      {holdShapes[type](color)}
    </svg>
  )
}
