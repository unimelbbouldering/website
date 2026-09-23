import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import type { EventImage } from "@/content/site"
import { cn } from "@/lib/utils"
import { ImageSlot } from "./ImageSlot"

// Instagram-style image carousel for an event post. Swipe on touch, arrows on hover.
export function EventCarousel({
  images,
  className,
  slideClassName = "aspect-[4/5]",
  dotClassName,
}: {
  images: EventImage[]
  className?: string
  slideClassName?: string
  dotClassName?: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const update = () => setCurrent(api.selectedScrollSnap())
    update()
    api.on("select", update)
    api.on("reInit", update)
    return () => {
      api.off("select", update)
      api.off("reInit", update)
    }
  }, [api])

  const multiple = images.length > 1

  return (
    <div>
      <Carousel setApi={setApi} className={cn("group/carousel overflow-hidden", className)}>
        <CarouselContent className="-ml-0">
          {images.map((img, i) => (
            <CarouselItem key={i} className="pl-0">
              {img.src ? (
                <img src={img.src} alt={img.alt} loading="lazy" className={cn("w-full object-cover", slideClassName)} />
              ) : (
                <ImageSlot label={img.alt.replace(/^.*, /, "")} className={slideClassName} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        {multiple && (
          <>
            <span className="pointer-events-none absolute top-2.5 right-2.5 rounded-full bg-black/55 px-2 py-0.5 text-xs text-white tabular-nums">
              {current + 1}/{images.length}
            </span>
            <CarouselPrevious
              variant="secondary"
              className="left-2 size-7 border-0 bg-white/90 text-neutral-900 opacity-0 shadow-sm transition-opacity group-hover/carousel:opacity-100 hover:bg-white focus-visible:opacity-100 disabled:opacity-0!"
            />
            <CarouselNext
              variant="secondary"
              className="right-2 size-7 border-0 bg-white/90 text-neutral-900 opacity-0 shadow-sm transition-opacity group-hover/carousel:opacity-100 hover:bg-white focus-visible:opacity-100 disabled:opacity-0!"
            />
          </>
        )}
      </Carousel>
      {/* Dots sit under the image, like an Instagram post. */}
      {multiple && (
        <div aria-hidden className="mt-2.5 flex justify-center gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "size-1.5 rounded-full bg-foreground/20 transition-[background-color,scale] duration-200",
                i === current && cn("scale-125 bg-foreground/80", dotClassName),
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
