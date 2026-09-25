import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Renders the photo when `src` is set, otherwise an empty placeholder.
// `contain` shows the whole photo uncropped, with a blurred copy filling the gaps.
export function ImageSlot({ label, src, contain, className }: { label: string; src?: string; contain?: boolean; className?: string }) {
  if (src && contain) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <img src={src} alt="" aria-hidden className="absolute inset-0 size-full scale-110 object-cover blur-2xl" />
        <img src={src} alt={label} className="relative size-full object-contain" />
      </div>
    )
  }
  if (src) return <img src={src} alt={label} className={cn("object-cover", className)} />

  return (
    <div
      role="img"
      aria-label={`${label} (image coming soon)`}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[var(--slot-bg)] text-[var(--slot-fg)]",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1.5 px-3 text-center">
        <ImageIcon className="size-5" strokeWidth={1.5} />
        <span className="text-xs">{label}</span>
      </div>
    </div>
  )
}
