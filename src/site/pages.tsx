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
  about, club, committee, eventTypes, faqs, formatDate, heroImage, joinSteps, memberPerks, sponsors, teams,
  type ClubEvent, type CommitteeMember, type Team,
} from "@/content/site"
import { pagePath } from "./routes"
import { cn } from "@/lib/utils"
import { eventTape, Hold, TapeStrip, TypedHold } from "./Tape"

const to = pagePath
const heading = "font-heading font-extrabold tracking-[-0.035em]"

function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="pt-10 pb-10 md:pt-14">
      <h1 className={cn(heading, "text-5xl leading-[1] md:text-7xl")}>{title}</h1>
      {children && <div className="mt-5 max-w-xl text-lg text-muted-foreground">{children}</div>}
    </header>
  )
}

function EventCard({ event }: { event: ClubEvent }) {
  const color = eventTape[event.type]
  return (
    <article className="relative flex h-full flex-col rounded-3xl border border-border bg-card p-3 pb-6 transition-shadow hover:shadow-[0_8px_30px_-12px_rgba(26,26,46,0.25)]">
      <span aria-hidden className="absolute -top-1.5 left-8 z-10 h-3 w-16 -rotate-3 rounded-[2px]" style={{ background: color }} />
      <EventCarousel images={event.images} className="rounded-2xl" slideClassName="aspect-square" />
      <div className="flex flex-1 flex-col px-3">
        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold">{formatDate(event.date)}</span>
          <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ background: `color-mix(in oklch, ${color} 22%, white)` }}>
            {event.type}
          </span>
        </div>
        <h3 className={cn(heading, "mt-3 text-2xl leading-tight")}>{event.title}</h3>
        <p className="mt-2 flex-1 text-muted-foreground">{event.blurb}</p>
        <div className="mt-5 text-sm">
          <p className="font-semibold">{event.time}</p>
          <p className="text-muted-foreground">{event.venue}, {event.suburb}</p>
        </div>
        {event.membersOnly && <p className="mt-2 text-sm font-semibold">Members only</p>}
      </div>
    </article>
  )
}

/* ---------------------------------- Home --------------------------------- */

export function Home() {
  return (
    <>
      {/* Full-bleed: breaks out of the page container to the window edges. */}
      <section className="relative mx-[calc(50%-50vw)] h-[max(34rem,min(42vw,calc(100svh-7.5rem)))] overflow-hidden rounded-b-[2.5rem] md:rounded-b-[4rem]">
        <ImageSlot label={heroImage.alt} src={heroImage.src} contain className="absolute inset-0 size-full" />
        <div aria-hidden className="absolute inset-0 bg-[#1A1A2E]/55" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-16 text-center md:pb-24">
          <h1 className={cn(heading, "max-w-3xl text-[clamp(2rem,4.5vw,4rem)] leading-[0.95] text-balance text-white")}>
            {club.fullName}
          </h1>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[var(--tape-yellow)] px-6 text-base font-semibold text-[#1A1A2E] hover:bg-[var(--tape-yellow)]/85"
            >
              <Link to={to("join")}>Join us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="h-12 rounded-full bg-white px-6 text-base font-semibold text-[#1A1A2E] hover:bg-white/85"
            >
              <Link to={to("events")}>See events</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className={cn(heading, "text-4xl")}>Coming up</h2>
          <Button asChild variant="ghost" className="rounded-full font-semibold">
            <Link to={to("events")}>All events</Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {upcoming(3).map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      </section>

      <section className="mt-24 grid gap-5 md:grid-cols-3">
        {[
          { color: "var(--tape-green)", title: "New to climbing?", body: "First-timers nights include shoe hire and someone to show you the ropes (there are no ropes).", link: "events", cta: "Find a first-timers night" },
          { color: "var(--tape-orange)", title: "Want real rock?", body: "We run trips to the Grampians and other crags, with crash pads and carpooling sorted.", link: "events", cta: "See upcoming trips" },
          { color: "var(--tape-purple)", title: "Got a question?", body: "What to wear, what it costs, whether you're strong enough. You are.", link: "faq", cta: "Read the FAQ" },
        ].map((c) => (
          <Link key={c.title} to={to(c.link)} className="group rounded-3xl p-7 transition-transform duration-300 hover:-rotate-1" style={{ background: `color-mix(in oklch, ${c.color} 16%, white)` }}>
            <h3 className={cn(heading, "text-2xl")}>{c.title}</h3>
            <p className="mt-2 text-muted-foreground">{c.body}</p>
            <span className="mt-6 inline-block font-semibold underline decoration-2 underline-offset-4" style={{ textDecorationColor: c.color }}>{c.cta}</span>
          </Link>
        ))}
      </section>
    </>
  )
}

/* ---------------------------------- About -------------------------------- */

export function About() {
  return (
    <>
      <PageHeader title="About us" />
      <section className="grid gap-12 md:grid-cols-2 md:items-start">
        <div className="space-y-5 text-xl leading-relaxed">
          {about.story.map((p) => <p key={p.slice(0, 16)}>{p}</p>)}
        </div>
        <ImageSlot label="The club together" className="aspect-[4/3] rotate-2 rounded-3xl" />
      </section>
      <section className="mt-24 grid gap-5 md:grid-cols-3">
        {about.values.map((v, i) => {
          const color = ["var(--tape-pink)", "var(--tape-green)", "var(--tape-orange)"][i]
          return (
            <div key={v.title} className="rounded-3xl border border-border p-7">
              <Hold color={color} variant={i} className="size-10" />
              <h3 className={cn(heading, "mt-5 text-2xl")}>{v.title}</h3>
              <p className="mt-2 text-muted-foreground">{v.body}</p>
            </div>
          )
        })}
      </section>
    </>
  )
}

/* --------------------------------- Events -------------------------------- */

export function Events() {
  const { filter, setFilter, visible } = useEventFilter()
  return (
    <>
      <PageHeader title="Events">Send them all</PageHeader>
      <div role="group" aria-label="Filter events" className="mb-10 flex flex-wrap gap-2">
        {(["All", ...eventTypes] as const).map((o) => {
          const active = filter === o
          const color = o === "All" ? "var(--foreground)" : eventTape[o]
          return (
            <button
              key={o}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(o)}
              className={cn(
                "flex items-center gap-2 rounded-full border-2 px-4 py-2 font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40",
              )}
            >
              <span className="size-2.5 rounded-full" style={{ background: o === "All" && active ? "var(--background)" : color }} />
              {o}
            </button>
          )
        })}
      </div>
      {/* Swap the whole grid on filter change; shuffling cards in place looked jumpy. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((e) => <EventCard key={e.id} event={e} />)}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

/* -------------------------------- Committee ------------------------------ */

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "rotate-[-1.5deg]"]
const tapeColors = ["var(--tape-yellow)", "var(--tape-blue)", "var(--tape-pink)", "var(--tape-green)", "var(--tape-purple)", "var(--tape-orange)"]

const teamColor: Record<Team, string> = {
  Executives: "var(--tape-yellow)",
  Events: "var(--tape-pink)",
  Marketing: "var(--tape-blue)",
  Partnerships: "var(--tape-purple)",
}

// Small tilts for the pinning hold, so repeated holds don't look stamped.
const holdTilts = [-14, 9, -5, 16, -10, 4, 12, -17, 7, -2, 18, -8]

function holdTilt(name: string) {
  let hash = 0
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return holdTilts[hash % holdTilts.length]
}

function MemberCard({ member, index, big }: { member: CommitteeMember; index: number; big: boolean }) {
  const color = member.lead ? teamColor[member.team] : tapeColors[(index + 1) % tapeColors.length]
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border bg-card p-3 transition-transform duration-300 hover:rotate-0",
        tilts[index % tilts.length],
        member.lead ? "border-2 border-foreground" : "border-border",
        big ? "pb-6" : "pb-5",
      )}
    >
      {/* Their favourite hold pins the photo to the wall. */}
      <TypedHold
        type={member.hold}
        color={color}
        style={{ rotate: `${holdTilt(member.name)}deg` }}
        className={cn(
          "absolute left-1/2 z-10 -translate-x-1/2 drop-shadow-[0_2px_2px_rgba(26,26,46,0.3)]",
          big ? "-top-8 size-16" : "-top-6 size-11",
        )}
      />
      <ImageSlot label={member.name} className={cn("aspect-square", big ? "rounded-xl" : "rounded-lg")} />
      <div className="mt-4 px-1">
        <h3 className={cn("font-bold", big ? "text-2xl" : "text-lg")}>{member.name}</h3>
        <p className={cn("text-sm", member.lead ? "font-semibold" : "text-muted-foreground")}>{member.role}</p>
        <p className="mt-2 text-sm">
          <span className="text-muted-foreground">Favourite hold:</span> {member.hold}
        </p>
      </div>
    </article>
  )
}

export function Committee() {
  return (
    <>
      <PageHeader title="Our team">Ask them for beta (T&C Applies)</PageHeader>
      <div className="space-y-24">
        {teams.map((t, ti) => {
          const members = committee.filter((m) => m.team === t.name)
          const execs = t.name === "Executives"
          return (
            <section key={t.name}>
              <div className="mb-12 flex flex-wrap items-center gap-x-4 gap-y-1">
                <Hold color={teamColor[t.name]} variant={ti} className="size-9" />
                <h2 className={cn(heading, "text-3xl")}>{t.name}</h2>
              </div>
              {/* Directors (and the president) take a 2×2 cell; every exec gets a bigger card. */}
              <div className={cn("grid grid-cols-2 gap-x-6 gap-y-14", execs ? "md:grid-cols-4" : "sm:grid-cols-3 md:grid-cols-5")}>
                {members.map((m, i) => (
                  <div key={m.name} className={cn(m.lead && "col-span-2 row-span-2")}>
                    <MemberCard member={m} index={i} big={execs || !!m.lead} />
                  </div>
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

export function Sponsors() {
  return (
    <>
      <PageHeader title="Partners">Flash your membership, get the perks.</PageHeader>
      <div className="grid gap-5 md:grid-cols-3">
        {sponsors.map((s, i) => (
          <a key={s.name} href={s.url} className={cn("group rounded-3xl border border-border p-5 transition-colors hover:border-foreground/30", i === 0 && "md:col-span-2 md:row-span-2")}>
            <ImageSlot label={`${s.name} logo`} className={cn("rounded-2xl", i === 0 ? "aspect-[16/9]" : "aspect-[5/3]")} />
            <p className="mt-5 text-sm font-semibold" style={{ color: i === 0 ? "var(--tape-purple)" : undefined }}>{s.tier}</p>
            <h3 className={cn(heading, i === 0 ? "text-3xl" : "text-xl")}>{s.name}</h3>
            <p className="mt-1 text-muted-foreground">{s.perk}</p>
          </a>
        ))}
      </div>
      <div className="mt-16 flex flex-col items-start gap-4 rounded-3xl p-8 md:flex-row md:items-center md:justify-between" style={{ background: "color-mix(in oklch, var(--tape-purple) 12%, white)" }}>
        <p className={cn(heading, "text-2xl")}>Want to support student climbers?</p>
        <Button asChild size="lg" className="h-12 rounded-full px-6 font-semibold">
          <a href={`mailto:${club.email}?subject=Partnership`}>Become a partner</a>
        </Button>
      </div>
    </>
  )
}

/* ----------------------------------- FAQ --------------------------------- */

export function Faq() {
  return (
    <>
      <PageHeader title="FAQ">Asked by nervous first-timers everywhere.</PageHeader>
      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="grid gap-3">
          {faqs.map((f) => (
            <AccordionItem
              key={f.q}
              value={f.q}
              className="rounded-3xl border-2 border-border! px-6 transition-colors data-[state=open]:border-[var(--tape-orange)]!"
            >
              <AccordionTrigger className="py-5 text-lg font-bold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-10 text-center text-muted-foreground">
          Still stuck?{" "}
          <Link to={to("contact")} className="font-semibold text-foreground underline decoration-[var(--tape-orange)] decoration-2 underline-offset-4">
            Ask us directly
          </Link>
        </p>
      </div>
    </>
  )
}

/* --------------------------------- Contact ------------------------------- */

export function Contact() {
  return (
    <>
      <PageHeader title="Contact" />
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-3">
          {[
            { label: "Email", value: club.email, href: `mailto:${club.email}`, color: "var(--tape-blue)" },
            { label: "Instagram", value: club.instagram, href: club.instagramUrl, color: "var(--tape-pink)" },
            { label: "Discord", value: "Join the server", href: club.discordUrl, color: "var(--tape-purple)" },
          ].map((d) => (
            <a key={d.label} href={d.href} className="flex items-center gap-4 rounded-2xl border border-border p-4 transition-colors hover:bg-muted">
              <span className="h-9 w-2 -rotate-6 rounded-[2px]" style={{ background: d.color }} />
              <span>
                <span className="block text-sm text-muted-foreground">{d.label}</span>
                <span className="font-semibold">{d.value}</span>
              </span>
            </a>
          ))}
          <p className="mt-3 px-1 text-muted-foreground">Or find us at {club.meetingPoint}.</p>
        </div>
        <ContactForm className="rounded-[2rem] bg-muted p-6 md:p-10" fieldClassName="h-12 rounded-2xl bg-background" buttonClassName="h-12 rounded-full px-6 font-semibold" />
      </div>
    </>
  )
}

/* ---------------------------------- Join --------------------------------- */

export function Join() {
  const stepColors = ["var(--tape-yellow)", "var(--tape-blue)", "var(--tape-green)"]
  return (
    <>
      <PageHeader title="Join the club">$10. Three steps. Then you're on the wall.</PageHeader>
      <ol className="grid gap-5 md:grid-cols-3">
        {joinSteps.map((s, i) => (
          <li key={s.title} className="relative rounded-3xl border border-border p-7">
            <span className={cn(heading, "flex size-12 items-center justify-center rounded-full text-xl")} style={{ background: stepColors[i] }}>
              {i + 1}
            </span>
            <h2 className={cn(heading, "mt-5 text-2xl")}>{s.title}</h2>
            <p className="mt-2 text-muted-foreground">{s.body}</p>
          </li>
        ))}
      </ol>
      <section className="relative mt-10 overflow-hidden rounded-[2rem] bg-foreground p-8 text-background md:p-12">
        <TapeStrip color="var(--tape-yellow)" className="-top-2 right-10 h-6 w-32" delay={0.4} />
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className={cn(heading, "text-6xl")}>$10 a year</p>
            <ul className="mt-6 space-y-2">
              {memberPerks.map((p, i) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="size-2.5 rounded-full" style={{ background: tapeColors[i % tapeColors.length] }} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:text-right">
            <Button asChild size="lg" className="h-14 rounded-full bg-[var(--tape-yellow)] px-8 text-lg font-bold text-foreground hover:bg-[var(--tape-yellow)]/85">
              <a href={club.joinUrl} target="_blank" rel="noreferrer">Buy membership on UMSU</a>
            </Button>
            <p className="mt-3 text-sm text-background/70">You'll need your student login.</p>
          </div>
        </div>
      </section>
    </>
  )
}
