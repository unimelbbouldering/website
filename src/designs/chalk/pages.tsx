import type { ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Link } from "react-router"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/shared/ContactForm"
import { EventCarousel } from "@/components/shared/EventCarousel"
import { ImageSlot } from "@/components/shared/ImageSlot"
import { upcoming, useEventFilter } from "@/components/shared/useEventFilter"
import {
  about, club, committee, eventTypes, faqs, formatDate, heroImage, joinSteps, memberPerks, sponsors, stats, teams,
  type ClubEvent, type EventType, type SponsorTier, type Team,
} from "@/content/site"
import { pagePath } from "../registry"
import { cn } from "@/lib/utils"

const to = (path: string) => pagePath("chalk", path)
const ease = [0.22, 1, 0.36, 1] as const

const display = "font-heading font-extrabold tracking-[-0.03em] [font-stretch:125%]"

// Route colours: one per category, used for dots, rules and tints.
const typeColor: Record<EventType, string> = {
  Social: "var(--hold)",
  Beginners: "var(--route-teal)",
  Workshop: "var(--route-blue)",
  Outdoor: "var(--route-amber)",
  Comp: "var(--foreground)",
}

const teamColor: Record<Team, { solid: string; tint: string }> = {
  Executives: { solid: "var(--hold)", tint: "var(--tint-pink)" },
  Events: { solid: "var(--route-blue)", tint: "var(--tint-blue)" },
  Marketing: { solid: "var(--route-amber)", tint: "var(--tint-amber)" },
  Partnerships: { solid: "var(--route-teal)", tint: "var(--tint-teal)" },
}

function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="pt-10 pb-10 md:pt-14 md:pb-12">
      <h1 className={cn(display, "max-w-4xl text-5xl leading-[0.95] text-balance md:text-7xl")}>{title}</h1>
      {children && <div className="mt-5 max-w-xl text-lg text-muted-foreground">{children}</div>}
    </header>
  )
}

function TypeTag({ type }: { type: EventType }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span className="size-2 rounded-full" style={{ background: typeColor[type] }} />
      {type}
    </span>
  )
}

function EventMeta({ event }: { event: ClubEvent }) {
  return (
    <div className="text-sm text-muted-foreground">
      <div>{event.time}</div>
      <div>{event.venue}, {event.suburb}</div>
    </div>
  )
}

function EventCard({ event }: { event: ClubEvent }) {
  return (
    <article className="flex flex-col">
      <EventCarousel images={event.images} className="rounded-sm" slideClassName="aspect-square" />
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">{formatDate(event.date)}</span>
        <TypeTag type={event.type} />
      </div>
      <h3 className="mt-1.5 text-lg font-semibold">{event.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{event.blurb}</p>
      <div className="mt-3"><EventMeta event={event} /></div>
    </article>
  )
}

function EventListing({ event }: { event: ClubEvent }) {
  return (
    <article className="grid gap-6 border-t border-border py-8 sm:grid-cols-[13rem_1fr] md:grid-cols-[15rem_1fr]">
      <EventCarousel images={event.images} className="rounded-sm" />
      <div className="flex flex-col">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className={cn(display, "text-3xl leading-none")}>{formatDate(event.date, { day: "numeric" })}</span>
          <span className="text-muted-foreground">
            {formatDate(event.date, { weekday: "long" })}, {formatDate(event.date, { month: "long" })}
          </span>
        </div>
        <h3 className="mt-4 text-2xl font-semibold">{event.title}</h3>
        <p className="mt-2 max-w-lg text-muted-foreground">{event.blurb}</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <EventMeta event={event} />
          <div className="flex items-center gap-4">
            {event.membersOnly && <span className="text-sm font-medium text-[var(--hold)]">Members only</span>}
            <TypeTag type={event.type} />
          </div>
        </div>
      </div>
    </article>
  )
}

/* ---------------------------------- Home --------------------------------- */

export function Home() {
  return (
    <>
      {/* Full-bleed: breaks out of the page container to the window edges. */}
      <section className="relative mx-[calc(50%-50vw)] mb-12 h-[max(34rem,min(42vw,calc(100svh-7rem)))] overflow-hidden">
        <ImageSlot label={heroImage.alt} src={heroImage.src} contain className="absolute inset-0 size-full" />
        <div aria-hidden className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-16 text-center md:pb-24">
          <h1 className={cn(display, "max-w-4xl text-[clamp(1.75rem,4vw,3.5rem)] leading-[0.95] text-balance text-white")} aria-label={club.fullName}>
            {club.fullName.split(" ").map((w, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="mx-[0.11em] inline-block"
                initial={{ opacity: 0, filter: "blur(14px)", y: "0.25em" }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, transitionEnd: { filter: "none" } }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.8, ease }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg" className="h-11 rounded-sm px-5 text-base">
              <Link to={to("join")}>Join the club</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-sm border-white/70 bg-transparent px-5 text-base text-white hover:bg-white hover:text-black"
            >
              <Link to={to("events")}>See events</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-[2fr_1fr] md:grid-rows-2">
        <ImageSlot label="Club members at a Wednesday session" className="aspect-[4/3] rounded-sm md:row-span-2 md:aspect-auto" />
        <ImageSlot label="Working out beta on a problem" className="aspect-[16/10] rounded-sm" />
        <ImageSlot label="Outdoor trip to the Grampians" className="aspect-[16/10] rounded-sm" />
      </section>

      <section className="mt-16 grid gap-3 md:grid-cols-3">
        {stats.map((s, i) => (
          <div key={s.label} className="rounded-sm p-6" style={{ background: ["var(--tint-pink)", "var(--tint-blue)", "var(--tint-amber)"][i] }}>
            <div className={cn(display, "text-4xl")}>{s.value}</div>
            <div className="mt-1 text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className={cn(display, "text-3xl md:text-4xl")}>Coming up</h2>
          <Link to={to("events")} className="text-sm underline underline-offset-4 hover:text-[var(--hold)]">
            All events
          </Link>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {upcoming(3).map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      <section className="mt-24 grid gap-10 md:grid-cols-2 md:items-center">
        <ImageSlot label="A first-timer on their first climb" className="aspect-[4/3] rounded-sm" />
        <div>
          <h2 className={cn(display, "text-3xl md:text-4xl")}>Never climbed before?</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Most of our members hadn't either. First-timers nights include shoe hire, and a committee member will show you how to fall safely and read a problem.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-6 h-11 rounded-sm bg-transparent px-5">
            <Link to={to("faq")}>Read the FAQ</Link>
          </Button>
        </div>
      </section>

      <section className="mt-24 grid gap-6 rounded-sm bg-foreground p-8 text-background md:grid-cols-[1fr_auto] md:items-center md:p-14">
        <div>
          <h2 className={cn(display, "text-3xl md:text-5xl")}>$10 gets you a year of climbing.</h2>
          <p className="mt-3 max-w-lg text-background/70">Member pricing at partner gyms, trips, workshops and a lot of new friends.</p>
        </div>
        <Button asChild size="lg" className="h-12 rounded-sm px-6 text-base">
          <Link to={to("join")}>Join the club</Link>
        </Button>
      </section>
    </>
  )
}

/* ---------------------------------- About -------------------------------- */

export function About() {
  return (
    <>
      <PageHeader title="A club that grew out of Wednesday nights." />
      <section className="grid gap-12 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5 text-lg leading-relaxed">
          {about.story.map((p) => <p key={p.slice(0, 16)}>{p}</p>)}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <ImageSlot label="The club at an early session" className="col-span-2 aspect-[16/10] rounded-sm" />
          <ImageSlot label="Club social" className="aspect-square rounded-sm" />
          <ImageSlot label="Comp day" className="aspect-square rounded-sm" />
        </div>
      </section>
      <section className="mt-24">
        <h2 className={cn(display, "mb-10 text-3xl md:text-4xl")}>What we care about</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {about.values.map((v, i) => (
            <div key={v.title} className="border-t-2 pt-5" style={{ borderColor: ["var(--hold)", "var(--route-blue)", "var(--route-amber)"][i] }}>
              <h3 className="text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-24 grid grid-cols-2 gap-3 md:grid-cols-4">
        {["Gym session", "Outdoor bouldering", "Workshop", "End of semester dinner"].map((label) => (
          <ImageSlot key={label} label={label} className="aspect-[4/5] rounded-sm" />
        ))}
      </section>
    </>
  )
}

/* --------------------------------- Events -------------------------------- */

export function Events() {
  const { filter, setFilter, visible } = useEventFilter()
  const options = ["All", ...eventTypes] as const

  return (
    <>
      <PageHeader title="Events">Upcoming sessions, workshops and trips.</PageHeader>
      <div role="group" aria-label="Filter events" className="mb-4 flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={filter === o}
            onClick={() => setFilter(o)}
            className={cn(
              "relative flex items-center gap-2 rounded-sm px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring",
              filter === o ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {filter === o && (
              <motion.span layoutId="chalk-filter" className="absolute inset-0 rounded-sm bg-foreground" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
            )}
            {o !== "All" && <span className="relative size-2 rounded-full" style={{ background: filter === o && o === "Comp" ? "var(--background)" : typeColor[o] }} />}
            <span className="relative">{o}</span>
          </button>
        ))}
      </div>
      {/* Swap the whole list on filter change; shuffling cards in place looked jumpy. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.3, ease }}
          className="border-b border-border"
        >
          {visible.map((e) => <EventListing key={e.id} event={e} />)}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

/* -------------------------------- Committee ------------------------------ */

export function Committee() {
  return (
    <>
      <PageHeader title="Our team">The 2026 committee.</PageHeader>
      <nav aria-label="Teams" className="mb-14 flex flex-wrap gap-2">
        {teams.map((t) => (
          <a key={t.name} href={`#team-${t.name.toLowerCase()}`} className="rounded-sm px-3.5 py-1.5 text-sm transition-opacity hover:opacity-80" style={{ background: teamColor[t.name].tint }}>
            {t.name}
          </a>
        ))}
      </nav>
      <div className="space-y-20">
        {teams.map((t) => {
          const members = committee.filter((m) => m.team === t.name)
          const color = teamColor[t.name]
          return (
            <section key={t.name} id={`team-${t.name.toLowerCase()}`} className="scroll-mt-24">
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-t-2 pt-4" style={{ borderColor: color.solid }}>
                <h2 className={cn(display, "text-3xl")}>{t.name}</h2>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
                {members.map((m) => (
                  <article key={m.name} className={cn(m.lead && "col-span-2 row-span-2")}>
                    <ImageSlot label={m.name} className="aspect-[4/5] rounded-sm" />
                    <h3 className={cn("mt-3 font-semibold", m.lead && "text-xl")}>{m.name}</h3>
                    <p className="text-sm" style={{ color: m.lead ? color.solid : undefined }}>
                      <span className={cn(!m.lead && "text-muted-foreground")}>{m.role}</span>
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </>
  )
}

/* -------------------------------- Sponsors ------------------------------- */

const tiers: SponsorTier[] = ["Major partner", "Partner", "Supporter"]

export function Sponsors() {
  return (
    <>
      <PageHeader title="Partners">Show your membership to get these discounts.</PageHeader>
      <div className="space-y-16">
        {tiers.map((tier) => (
          <section key={tier}>
            <h2 className="mb-6 border-b border-foreground pb-3 text-sm font-semibold">{tier}s</h2>
            <div className={cn("grid gap-8", tier === "Major partner" ? "md:grid-cols-1" : "md:grid-cols-3")}>
              {sponsors.filter((s) => s.tier === tier).map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  className={cn("group grid gap-5", tier === "Major partner" && "rounded-sm bg-[var(--tint-blue)] p-5 md:grid-cols-[1.4fr_1fr] md:items-center md:p-8")}
                >
                  <ImageSlot label={`${s.name} logo`} className={cn("rounded-sm", tier === "Major partner" ? "aspect-[21/9] bg-background/70" : "aspect-[3/2]")} />
                  <div>
                    <h3 className={cn(tier === "Major partner" ? cn(display, "text-3xl") : "text-lg font-semibold")}>{s.name}</h3>
                    <p className="mt-1 text-muted-foreground">{s.perk}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
      <section className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 md:flex-row md:items-center">
        <p className="max-w-lg text-lg">Want to reach a few hundred active students? We'd love to work with you.</p>
        <Button asChild variant="outline" size="lg" className="h-11 rounded-sm bg-transparent px-5">
          <a href={`mailto:${club.email}?subject=Partnership`}>Talk to us about partnering</a>
        </Button>
      </section>
    </>
  )
}

/* ----------------------------------- FAQ --------------------------------- */

export function Faq() {
  return (
    <>
      <PageHeader title="Questions, answered.">Common questions from new members.</PageHeader>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="border-t border-foreground">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-border">
              <AccordionTrigger className="py-6 text-lg font-semibold hover:no-underline data-[state=open]:text-[var(--hold)] [&>svg]:size-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-14 rounded-sm bg-[var(--tint-pink)] p-8 text-center">
          <p className="text-lg font-semibold">Still unsure?</p>
          <p className="mt-1 text-muted-foreground">We're happy to answer anything.</p>
          <Button asChild size="lg" className="mt-5 h-11 rounded-sm px-5">
            <Link to={to("contact")}>Send us a message</Link>
          </Button>
        </div>
      </div>
    </>
  )
}

/* --------------------------------- Contact ------------------------------- */

export function Contact() {
  const details = [
    { label: "Email", value: club.email, href: `mailto:${club.email}` },
    { label: "Instagram", value: club.instagram, href: club.instagramUrl },
    { label: "Discord", value: "Join the server", href: club.discordUrl },
    { label: "Find us", value: club.meetingPoint },
  ]
  return (
    <>
      <PageHeader title="Get in touch">We reply within two days.</PageHeader>
      <div className="grid gap-16 md:grid-cols-[1fr_1.3fr]">
        <div>
          <dl className="space-y-6">
            {details.map((d) => (
              <div key={d.label} className="border-t border-border pt-4">
                <dt className="text-sm text-muted-foreground">{d.label}</dt>
                <dd className="mt-1 text-lg">
                  {d.href ? <a href={d.href} className="hover:text-[var(--hold)]">{d.value}</a> : d.value}
                </dd>
              </div>
            ))}
          </dl>
          <ImageSlot label="Map of Union House, Parkville" className="mt-8 aspect-[4/3] rounded-sm" />
        </div>
        <ContactForm fieldClassName="rounded-sm bg-card h-11" buttonClassName="h-11 rounded-sm px-5" />
      </div>
    </>
  )
}

/* ---------------------------------- Join --------------------------------- */

export function Join() {
  const stepColors = ["var(--hold)", "var(--route-blue)", "var(--route-amber)"]
  return (
    <>
      <PageHeader title="Join the club">$10 for the year. Takes two minutes.</PageHeader>
      <section className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <ol className="space-y-8">
            {joinSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4">
                <span className={cn(display, "text-4xl leading-none")} style={{ color: stepColors[i] }}>{i + 1}</span>
                <div>
                  <h2 className="text-xl font-semibold">{s.title}</h2>
                  <p className="mt-1 text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <ImageSlot label="Members at the club table" className="mt-12 aspect-[16/9] rounded-sm" />
        </div>
        <aside className="self-start rounded-sm bg-card p-8">
          <div className={cn(display, "text-6xl")}>$10</div>
          <p className="text-muted-foreground">per year, through UMSU</p>
          <ul className="mt-6 space-y-2.5">
            {memberPerks.map((p) => (
              <li key={p} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[var(--hold)]" />
                {p}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 h-12 w-full rounded-sm text-base">
            <a href={club.joinUrl} target="_blank" rel="noreferrer">Buy membership on UMSU</a>
          </Button>
        </aside>
      </section>
    </>
  )
}
