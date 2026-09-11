/**
 * Ahumma Creator Partner Network — public-facing content.
 *
 * Drawn from the Partner Network playbook. Two of its sections are
 * deliberately absent: the open policy items awaiting founder sign-off (payout
 * method, content usage rights, exclusivity, exit policy) and the August launch
 * timeline. Both are internal — publishing unresolved questions about how and
 * when partners get paid would undermine the offer rather than explain it.
 */

export const PARTNER_FORM_URL =
  "https://store.ahumma.net/forms/ahumma-creator-partner-network";

export const PARTNER_GOALS = [
  {
    title: "Content at scale",
    body: "Authentic, consistent content across beauty, UGC, motherhood, lifestyle and men's skincare — in Nigeria and the United States.",
  },
  {
    title: "Real earning opportunity",
    body: "A low-risk way to earn from work you are already making, paid on what your audience actually buys.",
  },
  {
    title: "Growing with the brand",
    body: "As Ahumma scales, its most visible advocates should be the people who were here from the beginning.",
  },
];

export type PartnerTier = {
  name: string;
  commission: string;
  status: string;
  content: string;
  sales: string;
  includes: string[];
  progression: string | null;
};

export const PARTNER_TIERS: PartnerTier[] = [
  {
    name: "Founding Partner",
    commission: "3%",
    status: "Where every new partner starts",
    content: "3 quality pieces a month",
    sales: "No minimum — this is your onboarding tier",
    includes: [
      "Welcome kit and community access",
      "Your personal discount code",
      "Product seeding for your first campaign",
      "Monthly engagement session",
    ],
    progression:
      "Hold 3+ quality pieces a month and ₦500,000 ($368) in sales through your code, across two consecutive months.",
  },
  {
    name: "Standard Partner",
    commission: "5%",
    status: "Earned through consistent content and sales",
    content: "4–5 quality pieces a month, sustained",
    sales: "₦500,000 ($368) a month through your code",
    includes: [
      "Everything in Founding",
      "Increased product seeding",
      "Priority campaign briefs",
      "Eligible for brand features",
    ],
    progression:
      "Hold 6+ quality pieces a month and ₦1,000,000 ($735) in sales through your code, across two consecutive months.",
  },
  {
    name: "Elite Partner",
    commission: "7%",
    status: "Our most consistent, highest-performing partners",
    content: "6+ quality pieces a month, sustained",
    sales: "₦1,000,000 ($735) a month through your code",
    includes: [
      "Everything in Standard",
      "First pick of new product drops",
      "Featured placement on Ahumma's own page",
      "Priority for paid ambassador deals as we grow",
    ],
    progression: null,
  },
];

export const QUALITY_CONTENT = [
  "Follows the campaign brief and Ahumma's content pillars.",
  "Clear audio and visuals — nothing rushed or low-effort.",
  "Carries your discount code or tag, posted inside the campaign window.",
  "Sounds like you, not a copy-paste script.",
];

export const ONBOARDING_STEPS = [
  {
    title: "Welcome",
    body: "You apply or are invited, and the Partner Network Manager sends a short video explaining the vision and answering questions.",
  },
  {
    title: "Your kit",
    body: "A digital welcome kit: brand guidelines, content pillars, do's and don'ts, the code of conduct, and how the community works.",
  },
  {
    title: "Community access",
    body: "You join the private Telegram community and receive your personal discount code.",
  },
  {
    title: "First content",
    body: "You submit your first piece within the first week, with feedback from the Partner Network Manager.",
  },
  {
    title: "Full integration",
    body: "You join the monthly content calendar, prompts and engagement sessions.",
  },
];

export const PARTNER_BENEFITS = [
  {
    title: "Branding & growth sessions",
    body: "Regular sessions to sharpen your personal brand, content strategy and on-camera confidence.",
  },
  {
    title: "Brand visibility",
    body: "Your content reposted on Ahumma's official channels, reaching beyond your own following.",
  },
  {
    title: "Community & network",
    body: "A real support system of creators across Nigeria and the United States to collaborate with.",
  },
  {
    title: "Ongoing access",
    body: "Consistent product, monthly sessions, and a direct line to the brand rather than a faceless program.",
  },
  {
    title: "Long-term opportunity",
    body: "Early, high-performing partners are best placed for larger campaigns and paid ambassador roles as Ahumma grows.",
  },
];
