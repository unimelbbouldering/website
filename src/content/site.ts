// Placeholder content shared by every design. Replace with real club details
// before launch — names, dates and links below are stand-ins.

export const club = {
  name: "UniMelb Bouldering",
  shortName: "UMB",
  tagline: "Climb with us, every week, whatever your grade.",
  intro:
    "We're the University of Melbourne's bouldering club. We run weekly social sessions, beginner nights, workshops and trips to real rock — open to every student, from first-timers to V8 crushers.",
  email: "hello@unimelbbouldering.club",
  instagram: "@unimelbbouldering",
  instagramUrl: "https://instagram.com/",
  discordUrl: "https://discord.com/",
  // Point this at the UMSU club membership page once it exists.
  joinUrl: "https://umsu.unimelb.edu.au/buddy-up/clubs/",
  meetingPoint: "Parkville campus, Union House foyer",
}

export const stats = [
  { value: "Weekly", label: "social sessions" },
  { value: "V0–V10", label: "every grade welcome" },
  { value: "$10", label: "a year to join" },
]

export type EventType = "Social" | "Beginners" | "Workshop" | "Outdoor" | "Comp"

export const eventTypes: EventType[] = ["Social", "Beginners", "Workshop", "Outdoor", "Comp"]

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
    id: "first-timers-oct",
    title: "First-timers night",
    type: "Beginners",
    date: "2026-10-03",
    time: "5:30 – 7:30 pm",
    venue: "Boulderlab",
    suburb: "Brunswick",
    blurb: "Never bouldered before? Shoes are included and a committee member will show you the basics.",
    images: slides("First-timers night", 4),
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
    id: "wednesday-social-2",
    title: "Wednesday social climb",
    type: "Social",
    date: "2026-10-14",
    time: "6:00 – 9:00 pm",
    venue: "Urban Climb",
    suburb: "Collingwood",
    blurb: "Our regular midweek session. Turn up, find the club table, and climb with whoever's there.",
    images: slides("Wednesday social climb", 3),
  },
  {
    id: "grampians-trip",
    title: "Grampians weekend",
    type: "Outdoor",
    date: "2026-10-24",
    time: "Sat – Sun",
    venue: "Gariwerd",
    suburb: "Grampians National Park",
    blurb: "Two days on sandstone with carpooling, crash pads and camping sorted. Limited spots.",
    images: slides("Grampians weekend", 5),
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
  {
    id: "end-of-sem-social",
    title: "End of semester social",
    type: "Social",
    date: "2026-11-18",
    time: "6:00 pm onwards",
    venue: "Boulderlab",
    suburb: "Brunswick",
    blurb: "One last session before exams wrap up, followed by dinner nearby.",
    images: slides("End of semester social", 3),
  },
]

export type Team = "Executives" | "Events" | "Marketing" | "Partnerships"

export const teams: { name: Team; blurb: string }[] = [
  { name: "Executives", blurb: "Run the club and keep everything on track." },
  { name: "Events", blurb: "Plan the sessions, socials, comps and trips." },
  { name: "Marketing", blurb: "Posts, photos and getting the word out." },
  { name: "Partnerships", blurb: "Look after our sponsors and member perks." },
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

  { name: "Teresa", role: "Partnerships Director", team: "Partnerships", hold: "Jug", lead: true },
  ...officers("Partnerships", [["Kit", "Pocket"], ["Bill", "Jug"], ["Bradley", "Sloper"]]),
]

export type SponsorTier = "Major partner" | "Partner" | "Supporter"

export type Sponsor = {
  name: string
  tier: SponsorTier
  perk: string
  url: string
}

export const sponsors: Sponsor[] = [
  { name: "Partner gym", tier: "Major partner", perk: "Discounted entry for members every day of the week.", url: "#" },
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
    "UniMelb Bouldering started as a handful of students meeting at the same gym on Wednesday nights. It grew into a club because people kept bringing friends.",
    "Today we're a community of students who climb together every week. Some of us train for comps, some of us just want an evening away from the library. Both are the point.",
  ],
  values: [
    { title: "Everyone starts somewhere", body: "Beginners are the heart of the club. Nobody is made to feel slow, weak or out of place." },
    { title: "Climb together", body: "Bouldering is better with people spotting, cheering and working out beta with you." },
    { title: "Respect the rock", body: "Outdoors we follow Leave No Trace and local access agreements, and we look after the crags we visit." },
  ],
}

export const joinSteps = [
  { title: "Sign up through UMSU", body: "Buy a membership on the UMSU clubs page using your student login." },
  { title: "Join the group chat", body: "You'll get an invite to our Discord, where sessions and trips are announced first." },
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
