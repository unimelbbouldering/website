import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

// Empty image placeholder. Swap for an <img> once photos are ready.
export function ImageSlot({ label, className }: { label: string; className?: string }) {
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
