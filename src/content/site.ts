// Placeholder content shared by every design. Replace with real club details
// before launch — names, dates and links below are stand-ins.

export const club = {
  name: "UniMelb Bouldering",
  fullName: "University of Melbourne Bouldering Society",
  shortName: "UMB",
  tagline: "Climb with us, every week, whatever your grade.",
  intro:
    "We're the University of Melbourne's bouldering club. We run weekly social sessions, beginner nights, workshops and trips to real rock — open to every student, from first-timers to V8 crushers.",
  email: "unimelbbouldering@gmail.com",
  instagram: "@unimelbbouldering",
  instagramUrl: "https://www.instagram.com/unimelbbouldering/",
  // Point this at the UMSU club membership page once it exists.
  joinUrl: "https://umsu.unimelb.edu.au/buddy-up/clubs/",
  meetingPoint: "Parkville campus, Union House foyer",
}

// Home page hero. The photo lives in public/; replace hero.png to change it.
export const heroImage = {
  src: "/hero.png",
  alt: "Club members together at the bouldering gym",
}

export type EventType = "Social" | "Beginners" | "Workshop" | "Outdoor" | "Comp"

export const eventTypes: EventType[] = ["Social", "Comp", "Workshop"]

// Events are expected to come from Instagram posts: a carousel of images plus
// the caption details. `src` is left empty until real posts are imported.
export type EventImage = { src?: string; alt: string }

export type ClubEvent = {
  id: string
  title: string
  type: EventType
  date: string // ISO date
  time: string
  venue: string
  suburb: string
  blurb: string
  images: EventImage[]
  instagramUrl?: string
  membersOnly?: boolean
}

function slides(title: string, count: number): EventImage[] {
  return Array.from({ length: count }, (_, i) => ({ alt: `${title}, photo ${i + 1} of ${count}` }))
}

export const events: ClubEvent[] = [
  // Real events, from the club's Instagram posts.
  {
    id: "first-social-climb",
    title: "First social climb",
    type: "Social",
    date: "2026-08-20",
    time: "From 5:00 pm",
    venue: "BlocHaus Bouldering",
    suburb: "Port Melbourne",
    blurb: "UMBS's first ever social climb. Meet new climbing friends, learn about the club and register interest in joining the committee. $17 entry for members (usually $24); shoe hire is $7 extra.",
    images: [{ src: "/events/first-social-climb.jpg", alt: "Poster: UMBS's first ever social climb at BlocHaus Bouldering, Port Melbourne, Thursday 20 August, 5pm" }],
    instagramUrl: "https://www.instagram.com/p/Db9bxYCS04A/",
    membersOnly: true,
  },
  {
    id: "week-8-social-climb",
    title: "Week 8 social climb",
    type: "Social",
    date: "2026-09-18",
    time: "From 7:00 pm",
    venue: "UP Climbing",
    suburb: "Balaclava",
    blurb: "The whole gym to ourselves for a night of games, prizes and sends. No experience needed. $20 for members ($25 otherwise), with free chalk and shoe hire.",
    images: [{ src: "/events/week-8-social-climb.jpg", alt: "Poster: UMBS week 8 social climb at UP Climbing, 24 William St, Balaclava, Friday 18 September, 7pm" }],
    instagramUrl: "https://www.instagram.com/p/Dc-d2hpysz9/",
  },

  // Placeholder events.
  {
    id: "wednesday-social-1",
    title: "Wednesday social climb",
    type: "Social",
    date: "2026-09-30",
    time: "6:00 – 9:00 pm",
    venue: "Urban Climb",
    suburb: "Collingwood",
    blurb: "Our regular midweek session. Turn up, find the club table, and climb with whoever's there.",
    images: slides("Wednesday social climb", 3),
  },
  {
    id: "footwork-workshop",
    title: "Footwork fundamentals",
    type: "Workshop",
    date: "2026-10-08",
    time: "6:30 – 8:00 pm",
    venue: "Urban Climb",
    suburb: "Collingwood",
    blurb: "Quiet feet, edging and smearing. Small groups, coached by experienced members.",
    images: slides("Footwork fundamentals", 2),
    membersOnly: true,
  },
  {
    id: "spring-comp",
    title: "Spring bouldering comp",
    type: "Comp",
    date: "2026-11-07",
    time: "12:00 – 5:00 pm",
    venue: "Boulderlab",
    suburb: "Brunswick",
    blurb: "A friendly in-house comp with beginner, intermediate and open categories. Prizes from our partners.",
    images: slides("Spring bouldering comp", 4),
  },
]

export type Team = "Executives" | "Events" | "Marketing" | "Partnerships"

export const teams: { name: Team }[] = [
  { name: "Executives" },
  { name: "Events" },
  { name: "Marketing" },
  { name: "Partnerships" },
]

export type HoldType = "Jug" | "Crimp" | "Sloper" | "Pinch" | "Pocket"

export type CommitteeMember = {
  name: string
  role: string
  team: Team
  hold: HoldType // favourite hold (placeholder until members pick their own)
  lead?: boolean // directors and the president
}

const officers = (team: Team, members: [string, HoldType][]): CommitteeMember[] =>
  members.map(([name, hold]) => ({ name, role: `${team} Officer`, team, hold }))

export const committee: CommitteeMember[] = [
  { name: "Shaunah", role: "President", team: "Executives", hold: "Jug", lead: true },
  { name: "Pat", role: "Vice President", team: "Executives", hold: "Crimp" },
  { name: "Owen", role: "Vice President", team: "Executives", hold: "Jug" },
  { name: "Lee", role: "Secretary", team: "Executives", hold: "Sloper" },
  { name: "Sam", role: "Treasurer", team: "Executives", hold: "Jug" },

  { name: "Aaron", role: "Events Director", team: "Events", hold: "Jug", lead: true },
  ...officers("Events", [
    ["Justin", "Jug"], ["Vy", "Pinch"], ["Lachlan", "Jug"], ["Aryan", "Crimp"],
    ["Otto", "Jug"], ["Matthew", "Sloper"], ["Elisa", "Jug"], ["Adam", "Pocket"],
  ]),

  { name: "Gwen", role: "Marketing Director", team: "Marketing", hold: "Pinch", lead: true },
  ...officers("Marketing", [["Dennis", "Jug"], ["Angela", "Jug"], ["Dafflyn", "Crimp"]]),
  { name: "Jorvan", role: "IT Officer", team: "Marketing", hold: "Sloper" },

  { name: "Teresa", role: "Partnerships Director", team: "Partnerships", hold: "Jug", lead: true },
  ...officers("Partnerships", [["Kit", "Pocket"], ["Bill", "Jug"], ["Bradley", "Sloper"]]),
]

export type SponsorTier = "Major partner" | "Partner" | "Supporter"

export type Sponsor = {
  name: string
  tier: SponsorTier
  perk: string
  perks?: string[] // listed as bullet points under `perk`
  image?: string
  url: string
}

export const sponsors: Sponsor[] = [
  {
    name: "BlocHaus Bouldering",
    tier: "Major partner",
    perk: "Show your UMBS member code and student ID:",
    perks: ["$17 entry ($7 off concession)", "20% off BlocHaus memberships"],
    image: "/partners/blochaus.jpg",
    url: "https://blochaus.com.au/",
  },
  { name: "Climbing gear store", tier: "Partner", perk: "10% off shoes and chalk with your membership.", url: "#" },
  { name: "Physio clinic", tier: "Partner", perk: "Free finger and shoulder injury screening for members.", url: "#" },
  { name: "Local café", tier: "Supporter", perk: "Coffee discount after morning sessions.", url: "#" },
  { name: "Outdoor co-op", tier: "Supporter", perk: "Crash pad hire for club trips.", url: "#" },
]

export const faqs = [
  {
    q: "Do I need any experience?",
    a: "No. Most of our members started with us. Come to a first-timers night and we'll show you everything, from how to fall safely to how to read a problem.",
  },
  {
    q: "What do I need to bring?",
    a: "Comfortable clothes you can move in. Shoes and chalk can be hired at every partner gym, and first-timers nights include shoe hire.",
  },
  {
    q: "How much does membership cost?",
    a: "Membership is $10 for the year through UMSU. It gets you member pricing at partner gyms, access to trips and workshops, and discounts from our sponsors.",
  },
  {
    q: "Do I have to be a UniMelb student?",
    a: "Full membership is for current University of Melbourne students. Alumni and students from other universities can join as associate members.",
  },
  {
    q: "Is bouldering safe?",
    a: "Bouldering is done on short walls over thick padding, without ropes. Injuries are uncommon when you warm up and learn to fall — we cover both at beginner sessions.",
  },
  {
    q: "How do outdoor trips work?",
    a: "We run a few trips a year to places like the Grampians. The club organises transport, crash pads and campsites; you pay a share of the costs. Spots go to members first.",
  },
  {
    q: "Can I come to just one session to try it?",
    a: "Yes. Social sessions are open to anyone curious. You'll need to join before signing up for workshops or trips.",
  },
]

export const about = {
  story: [
    "Unimelb BoulderSoc is the newly founded bouldering club at the University of Melbourne, established in 2026. Whether you're a complete beginner or a seasoned climber, we're building a community where students can climb, connect and challenge themselves together.",
    "Our mission is to cultivate a supportive and inclusive community where students can build life-long connections and share their passion for bouldering. From casual social sessions to outdoor trips, comps and everything in between, this is your home for all things bouldering.",
    "Memberships opened in August 2026, our first social climb was at BlocHaus Port Melbourne that same month, and BlocHaus became our first official partner in September. Non-UniMelb students are welcome too.",
  ],
  values: [
    { title: "Everyone starts somewhere", body: "Beginners are the heart of the club. Nobody is made to feel slow, weak or out of place." },
    { title: "Climb together", body: "Bouldering is better with people spotting, cheering and working out beta with you." },
    { title: "Respect the rock", body: "Outdoors we follow Leave No Trace and local access agreements, and we look after the crags we visit." },
  ],
}

export const joinSteps = [
  { title: "Sign up through UMSU", body: "Buy a membership on the UMSU clubs page using your student login." },
  { title: "Follow us on Instagram", body: "Social climbs, events and sign-up forms are announced on @unimelbbouldering first." },
  { title: "Come climbing", body: "Show your membership at any partner gym to get member pricing." },
]

export const memberPerks = [
  "Member pricing at partner gyms",
  "Priority spots on outdoor trips",
  "Coached workshops and technique nights",
  "Discounts from club sponsors",
  "Socials, comps and end-of-semester events",
]

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" }) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-AU", opts)
}
