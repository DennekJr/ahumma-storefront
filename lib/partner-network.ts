/**
 * Ahumma Creator Partner Network — public-facing content.
 *
 * Drawn from the Partner Network playbook. Two of its sections are
 * deliberately absent: the open policy items awaiting founder sign-off (payout
 * method, content usage rights, exclusivity, exit policy) and the August launch
 * timeline. Both are internal — publishing unresolved questions about how and
 * when partners get paid would undermine the offer rather than explain it.
 */

export const PARTNER_GOALS = [
  {
    title: "Content at scale",
    body: "Create consistent content in beauty, UGC, motherhood, lifestyle or men's skincare for audiences in Nigeria and the United States.",
  },
  {
    title: "Real earning opportunity",
    body: "Earn commission on sales made with your code through content you already create.",
  },
  {
    title: "Growing with the brand",
    body: "Grow with Ahumma from the beginning, with opportunities to take on larger campaigns as the brand expands.",
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
      "For two consecutive months, create at least 3 quality pieces each month and generate ₦500,000 ($368) in sales through your code.",
  },
  {
    name: "Standard Partner",
    commission: "5%",
    status: "Earned through consistent content and sales",
    content: "4 - 5 quality pieces a month, sustained",
    sales: "₦500,000 ($368) a month through your code",
    includes: [
      "Everything in Founding",
      "Increased product seeding",
      "Priority campaign briefs",
      "Eligible for brand features",
    ],
    progression:
      "For two consecutive months, create at least 6 quality pieces each month and generate ₦1,000,000 ($735) in sales through your code.",
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
  {
    number: "I.",
    body: "Follow the campaign brief and Ahumma's content pillars.",
    image: "/images/sika-ritual.jpg",
    alt: "A creator holding Sika body butter",
  },
  {
    number: "II.",
    body: "Use clear audio and visuals; take the time to make each piece feel considered.",
    image: "/images/ara-ritual.jpg",
    alt: "African black soap used in a body-care ritual",
  },
  {
    number: "III.",
    body: "Include your discount code or tag, and post within the campaign window.",
    image: "/images/dream-whip.jpg",
    alt: "Ahumma Dream Whip body butter",
  },
  {
    number: "IV.",
    body: "Keep the content in your own voice—not a copy-paste script.",
    image: "/images/ara-texture.jpg",
    alt: "Ahumma Ara African black soap",
  },
];

export const ONBOARDING_STEPS = [
  {
    title: "Welcome",
    body: "After you apply or receive an invitation, the Partner Network Manager sends a short video about the vision and answers your questions.",
  },
  {
    title: "Your kit",
    body: "Get a digital welcome kit with brand guidelines, content pillars, do's and don'ts, the code of conduct and community details.",
  },
  {
    title: "Community access",
    body: "You join the private Telegram community and receive your personal discount code.",
  },
  {
    title: "First content",
    body: "Share your first piece within your first week and get feedback from the Partner Network Manager.",
  },
  {
    title: "Full integration",
    body: "Take part in the monthly content calendar, prompts and engagement sessions.",
  },
];

export const PARTNER_BENEFITS = [
  {
    title: "Branding & growth sessions",
    body: "Build your personal brand, sharpen your content strategy and grow your on-camera confidence in regular sessions.",
  },
  {
    title: "Brand visibility",
    body: "Get the chance to be reposted on Ahumma's official channels and reach beyond your own following.",
  },
  {
    title: "Community & network",
    body: "Meet and collaborate with creators across Nigeria and the United States.",
  },
  {
    title: "A direct line to Ahumma",
    body: "Stay connected to the people behind the brand throughout your partnership.",
  },
  {
    title: "Long-term opportunity",
    body: "Early partners who perform well may be considered for larger campaigns and paid ambassador roles as Ahumma grows.",
  },
];

/**
 * Field ids on the published FrontDesk form.
 *
 * This targets `become-an-ambassador`, which is the form the brand actually
 * links to. A second form, `ahumma-creator-partner-network`, is also published
 * with near-identical fields — it is the older draft, and submissions sent
 * there would not reach the live inbox.
 *
 * Read the current ids with:
 * GET /v1/storefront/by-handle/ahumma/forms/become-an-ambassador
 */
export const PARTNER_FORM_SLUG = "become-an-ambassador";

export const PARTNER_FIELDS = {
  firstName: "f01a090018af874df9eb7d134d51ac9ab",
  lastName: "nf_1789157673173_0",
  email: "f01a090018af874df9eb7d4aa0d00fa79",
  phone: "f01a090018af874df9eb7da4b2d5e858c",
  categories: "nf_1789157703569_1",
  platformLinks: "nf_1789157714843_2",
  contentLinks: "nf_1789157731169_3",
  motivation: "nf_1789157740499_4",
  otherBrands: "nf_1789157747883_5",
  monthlyCommitment: "nf_1789157775362_6",
  disclosureAgreement: "nf_1789157790312_7",
  codeOfConduct: "nf_1789157805436_8",
  slaAgreed: "nf_1789158571952_9",
} as const;

export const CONTENT_CATEGORIES = [
  { id: "beauty", label: "Beauty" },
  { id: "ugc", label: "UGC" },
  { id: "mother-family", label: "Mother & Family" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "male-skincare", label: "Male Skincare" },
] as const;

/** Widened from the const-asserted literals so runtime input can be checked. */
export const CATEGORY_IDS: string[] = CONTENT_CATEGORIES.map((c) => c.id);

/** Both consent fields are plain yes/no selects on this form. */
export const AGREED_VALUE = "yes";

/**
 * Service Level Agreement.
 *
 * Partners must accept this before an application can be submitted. FrontDesk
 * has no field for it, so acceptance is enforced here and in the API route but
 * is NOT recorded against the submission — see the note in the API route.
 */
export const SLA_PURPOSE =
  "This agreement sets out what Ahumma and its Creator Partners each commit to, so both sides know what to expect and by when.";

export const SLA_BRAND_COMMITMENTS = [
  {
    title: "Enquiry response",
    body: "Questions raised in the community channel or to the Partner Network Manager are answered within 24 hours.",
  },
  {
    title: "Content feedback",
    body: "Feedback on submitted content comes within 48 hours, so you are never left waiting to post.",
  },
  {
    title: "Product seeding",
    body: "Products for active campaigns are dispatched within 3 working days of onboarding or campaign kickoff.",
  },
  {
    title: "Payment",
    body: "Commission is processed monthly, within 7 working days of month-end. The minimum payout is ₦10,000 or its USD equivalent; anything below rolls into the next month.",
  },
  {
    title: "Performance transparency",
    body: "A monthly summary — sales through your code, content count, current tier — reaches you by the 5th working day of the following month.",
  },
  {
    title: "Campaign briefs",
    body: "Briefs, discount codes and content pillars are shared at least 5 working days before a campaign starts.",
  },
  {
    title: "Community",
    body: "The partner channel is actively monitored, with monthly live sessions and regular content prompts.",
  },
];

export const SLA_PARTNER_COMMITMENTS = [
  {
    title: "Content delivery",
    body: "Meet your tier's monthly quota — Founding 3+, Standard 4–5+, Elite 6+ — posted inside the campaign window.",
  },
  {
    title: "Quality standard",
    body: "Follow the brief and brand guidelines, include your discount code or tag, and keep audio and visuals clear.",
  },
  {
    title: "Disclosure",
    body: "Clearly disclose all sponsored or gifted content in line with FTC (US) and applicable Nigerian guidelines.",
  },
  {
    title: "Responsiveness",
    body: "Reply to briefs, feedback and scheduling within 48 hours.",
  },
  {
    title: "Authenticity & conduct",
    body: "Content reflects your own voice and complies with the Partner Code of Conduct.",
  },
  {
    title: "Reporting issues",
    body: "Flag product, payment or content problems to the Partner Network Manager promptly rather than letting them sit.",
  },
];

export const SLA_TURNAROUND = [
  { service: "Partner enquiry response", commitment: "Within 24 hours" },
  { service: "Content feedback", commitment: "Within 48 hours" },
  { service: "Product seeding dispatch", commitment: "Within 5 working days" },
  {
    service: "Commission payout",
    commitment: "Monthly, within 7 working days of month-end",
  },
  {
    service: "Performance summary",
    commitment: "By the 5th working day of the following month",
  },
  {
    service: "Campaign brief delivery",
    commitment: "At least 5 working days before a campaign starts",
  },
];

export const SLA_ESCALATION = [
  "Raise the issue with the Partner Network Manager, in the community channel or by direct message.",
  "If it is unresolved after 3–4 working days, it escalates to the Ahumma founder for review.",
  "Resolution or next steps are communicated within 5 working days of escalation.",
];

export const SLA_REVIEW =
  "This agreement is reviewed quarterly and may change as the network grows beyond the first 21 Founding Partners. Partners are notified of any change at least 14 days before it takes effect.";
