/**
 * Ahumma's published FAQ answers.
 *
 * The copy is taken verbatim from the brand bedrock document so the answers a
 * customer reads, the answers Google indexes and the answers an LLM quotes are
 * the same text. Edit the wording here and both the page and its FAQPage
 * structured data follow.
 */

export type FaqEntry = {
  question: string;
  /** Rendered as separate paragraphs; joined with a space for structured data. */
  answer: string[];
  /** Ordered steps, rendered after the answer paragraphs. */
  steps?: string[];
  /** Unordered points, rendered after the answer paragraphs. */
  points?: string[];
};

export type FaqGroup = {
  id: string;
  title: string;
  entries: FaqEntry[];
};

export const FAQ_INTRO =
  "Everything you need to know about Ahumma, our body butters, African black soap and our rituals.";

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "about-ahumma",
    title: "About Ahumma",
    entries: [
      {
        question: "What is Ahumma?",
        answer: [
          "Ahumma is a Nigerian-born premium body-care brand inspired by African heritage, natural ingredients and the beauty of everyday rituals.",
          "We create thoughtful body-care products designed to nourish, soften and care for your skin—while celebrating Black and brown skin rather than asking it to become something else.",
          "Our current collection includes whipped body butters and liquid African black soap.",
        ],
      },
      {
        question: "What does “Ahumma” mean?",
        answer: [
          "Ahumma is inspired by an Igbo expression associated with beautiful skin.",
          "The name reflects our belief that beauty begins with caring for and appreciating yourself—not constantly trying to change yourself.",
        ],
      },
      {
        question: "Is Ahumma a Nigerian brand?",
        answer: [
          "Yes.",
          "Ahumma was born in Nigeria and is deeply inspired by African beauty traditions, ingredients, culture and craftsmanship.",
          "Our ambition, however, is global. We are building Ahumma as a modern African body-care brand for customers in Nigeria, the United States and eventually around the world.",
        ],
      },
      {
        question: "Is Ahumma only for Black people?",
        answer: [
          "Ahumma is created with melanin-rich skin and the experiences of Black and brown consumers at its heart, but our products can be enjoyed by anyone whose skin and preferences are suited to them.",
          "Our philosophy is simple: beautiful skin deserves beautiful care.",
        ],
      },
    ],
  },
  {
    id: "body-butters",
    title: "Body butters",
    entries: [
      {
        question: "What is body butter?",
        answer: [
          "Body butter is a rich moisturizing product made primarily with plant butters and oils.",
          "Compared with many lightweight lotions, body butters generally contain a richer blend of oils and butters and are designed to help soften and moisturize dry skin.",
          "Ahumma body butters are created to make moisturization feel like a sensory ritual, not another chore.",
        ],
      },
      {
        question: "Are Ahumma body butters good for dry skin?",
        answer: [
          "Yes. Ahumma's body butters are designed particularly with dry and combination skin in mind.",
          "Ingredients such as shea butter, mango butter, cocoa butter and nourishing plant oils help leave skin feeling softer, smoother and moisturized.",
          "For very dry skin, apply your body butter immediately after bathing while your skin is still slightly damp.",
        ],
      },
      {
        question: "Are Ahumma body butters suitable for Black and brown skin?",
        answer: [
          "Yes.",
          "Our products are created with melanin-rich skin in mind, while remaining suitable for a wide range of skin tones.",
          "We focus on nourishing and caring for skin rather than promoting skin lightening or changing your natural complexion.",
        ],
      },
      {
        question: "Will Ahumma body butter make my skin greasy?",
        answer: [
          "Our body butters are designed to feel rich and nourishing without leaving an unnecessarily heavy finish.",
          "The experience can vary depending on your skin type and how much you apply.",
          "Start with a small amount and massage it thoroughly into slightly damp skin.",
        ],
      },
      {
        question: "What is the difference between Sika and Dream Whip?",
        answer: [
          "Both are Ahumma body butters, but they have different formulations and sensory experiences.",
          "Sika is an ode to you—created around nourishing dry, dull and uneven-looking skin.",
          "Dream Whip is our more indulgent, sensory body butter—created to feel soft, luxurious and comforting on the skin.",
          "Choose based on the texture, ingredients and experience you prefer.",
        ],
      },
      {
        question: "What is Baby Bloom?",
        answer: [
          "Baby Bloom is Ahumma's gentle body butter created with delicate skin in mind.",
          "It is unscented and designed around simplicity and tenderness.",
        ],
      },
      {
        question: "Can I use Ahumma body butter every day?",
        answer: [
          "Yes.",
          "Ahumma body butters are designed for everyday body-care rituals.",
          "For best results, apply after bathing, particularly while your skin is still slightly damp.",
        ],
      },
      {
        question: "Can I use Ahumma body butter on my face?",
        answer: [
          "Our body butters are formulated for the body, not specifically for facial skin.",
          "Unless the individual product label states otherwise, we recommend using Ahumma body butter on your body rather than your face.",
        ],
      },
    ],
  },
  {
    id: "african-black-soap",
    title: "African black soap / Ara",
    entries: [
      {
        question: "What is African black soap?",
        answer: [
          "African black soap is a traditional cleansing product associated with West African beauty practices.",
          "Traditional African black soap is commonly made using ingredients such as plantain skins, cocoa pod ash, palm kernel oil and other locally sourced ingredients, although formulations vary.",
          "Ahumma's Ara Liquid Black Soap brings the heritage of African black soap into a convenient liquid format for modern everyday cleansing.",
        ],
      },
      {
        question: "What is Ara?",
        answer: [
          "Ara means “body” in Igbo, and Ara is Ahumma's liquid African black soap.",
          "Its name reflects our philosophy of caring for the whole body through simple, intentional rituals.",
          "Ara: Lathered to cater.",
        ],
      },
      {
        question: "Is Ahumma Ara real African black soap?",
        answer: [
          "Ara is inspired by the traditional African black soap tradition and is formulated as a liquid black soap for modern use.",
          "We believe African beauty traditions can be respected while also being thoughtfully adapted for contemporary skincare rituals.",
        ],
      },
      {
        question: "Is African black soap good for Black skin?",
        answer: [
          "African black soap has a long history of use in African beauty routines and can be a useful cleanser for many people.",
          "However, Black skin is not one skin type. Some people may find traditional black soap cleansing, while others—particularly people with dry or sensitive skin—may find it too drying if overused.",
          "That's why your cleansing routine should be matched to your skin's needs.",
        ],
      },
      {
        question: "Can African black soap dry out your skin?",
        answer: [
          "It can.",
          "Like other cleansing products, African black soap may leave some people's skin feeling dry or tight, particularly when used too frequently or when followed by inadequate moisturization.",
          "If your skin feels dry after cleansing, reduce frequency and follow with a nourishing moisturizer such as an Ahumma body butter.",
        ],
      },
      {
        question: "How often should I use Ara Liquid Black Soap?",
        answer: [
          "Start according to your skin's needs.",
          "If your skin is comfortable with daily use, Ara can become part of your regular bathing ritual. If your skin tends to be dry or sensitive, you may prefer using it less frequently.",
          "Listen to your skin.",
        ],
      },
      {
        question: "Can I use Ara on my face?",
        answer: [
          "Unless the product label specifically indicates facial use, Ara is intended primarily as a body cleanser.",
          "Facial skin can have different needs from the skin on your body, so we recommend using products formulated specifically for the face.",
        ],
      },
    ],
  },
  {
    id: "ingredients",
    title: "Ingredients",
    entries: [
      {
        question: "What ingredients are in Ahumma body butters?",
        answer: [
          "Our formulations vary by product.",
          "Depending on the product, Ahumma body butters may contain ingredients such as:",
        ],
        points: [
          "Shea butter",
          "Mango butter",
          "Cocoa butter",
          "Avocado",
          "Jojoba oil",
          "Argan oil",
          "Sunflower oil",
          "Sweet almond oil",
        ],
      },
      {
        question: "Why does Ahumma use shea butter?",
        answer: [
          "Shea butter is a rich plant butter traditionally used in African body care.",
          "We use it because of its moisturizing and skin-softening properties and its deep connection to African beauty traditions.",
          "But Ahumma doesn't believe that every body butter has to be “just shea butter.”",
          "Our formulations combine different butters and oils to create distinct textures, experiences and skin-feel.",
        ],
      },
      {
        question: "Are Ahumma products natural?",
        answer: [
          "Ahumma is inspired by natural ingredients and African beauty traditions.",
          "However, we don't use “natural” as a blanket claim that everything we make is 100% natural.",
          "The most accurate way to understand each product is to review its individual ingredient list and formulation.",
        ],
      },
      {
        question: "Does Ahumma use African ingredients?",
        answer: [
          "Yes.",
          "African ingredients and beauty traditions are an important part of Ahumma's identity.",
          "African black soap, shea butter and other ingredients and traditions inform our products and storytelling.",
          "Our goal is to combine that heritage with thoughtful modern formulation—not simply reproduce traditional products unchanged.",
        ],
      },
    ],
  },
  {
    id: "skin-concerns",
    title: "Skin concerns",
    entries: [
      {
        question: "Is Ahumma good for dry skin?",
        answer: [
          "Yes. Caring for dry skin is one of the key reasons we created our body butters.",
          "Regular moisturization can help dry skin feel softer, smoother and more comfortable.",
          "For best results, apply body butter after bathing while your skin is still slightly damp.",
        ],
      },
      {
        question: "Is Ahumma good for combination skin?",
        answer: [
          "Our lightweight application approach can work well for combination skin, particularly when you adjust the amount of product you use to different areas of your body.",
          "If one area is particularly dry, apply more there and less where your skin feels comfortable.",
        ],
      },
      {
        question: "Can Ahumma help with uneven-looking skin tone?",
        answer: [
          "Some Ahumma products contain ingredients traditionally used in skincare formulations that support a more even-looking complexion.",
          "However, Ahumma is currently positioned primarily as a premium, non-clinical body-care brand, not a medical treatment for hyperpigmentation.",
          "We do not promise to erase, cure or “fix” your natural skin.",
        ],
      },
      {
        question: "Does Ahumma lighten or bleach skin?",
        answer: [
          "No.",
          "Ahumma does not promote skin bleaching or changing your natural skin tone.",
          "Our philosophy is rooted in celebrating and caring for Black and brown skin—not erasing its natural beauty.",
        ],
      },
    ],
  },
  {
    id: "fragrance",
    title: "Fragrance & sensory experience",
    entries: [
      {
        question: "Are Ahumma products scented?",
        answer: [
          "Some are and some are not.",
          "Our fragrances are designed to create a beautiful sensory experience without overwhelming the ritual.",
          "Baby Bloom is unscented.",
          "Please check each individual product page for its specific fragrance profile.",
        ],
      },
      {
        question: "What does Dream Whip smell like?",
        answer: [
          "Dream Whip is designed around a warm, creamy and indulgent sensory experience, with notes inspired by mango, creamy coconut, vanilla and cocoa butter.",
        ],
      },
      {
        question: "What does Sika smell like?",
        answer: [
          "Sika has a brighter, softer fragrance profile inspired by lemon, vanilla and rose.",
        ],
      },
      {
        question: "Does Ahumma use essential oils?",
        answer: [
          "Yes, some Ahumma products contain essential oils, depending on the individual formulation and what we want the product to offer.",
          "We’re thoughtful about what goes into every formula and don’t believe that every ingredient belongs in every product. Each product is formulated with its intended use and the needs of its customers in mind.",
          "For example, Baby Bloom is completely free from essential oils. We intentionally kept the formula gentle and uncomplicated for the delicate skin of babies and children under 5.",
          "If you have a particular sensitivity or ingredient you prefer to avoid, we always recommend checking the full ingredient list on the specific product before purchasing. And if you're ever unsure about an ingredient, our team is happy to help.",
        ],
      },
    ],
  },
  {
    id: "nigeria",
    title: "Nigeria",
    entries: [
      {
        question: "Where can I buy Ahumma in Nigeria?",
        answer: [
          "Ahumma is available through Ahumma.com and selected retail partners.",
          "Our website remains the best place to discover the complete collection and receive the most up-to-date information about availability.",
        ],
      },
      {
        question: "Does Ahumma deliver across Nigeria?",
        answer: [
          "Yes. Ahumma ships to customers across Nigeria.",
          "Shipping times and fees vary depending on your location. Please see our Shipping Policy for current delivery information.",
        ],
      },
      {
        question: "Where is Ahumma made?",
        answer: [
          "Ahumma is a Nigerian-born brand, and our products are developed and manufactured according to the standards applicable to each product and market.",
          "We believe African brands should be capable of producing products that meet global expectations for quality.",
        ],
      },
    ],
  },
  {
    id: "united-states",
    title: "United States",
    entries: [
      {
        question: "Does Ahumma ship to the United States?",
        answer: [
          "Yes. Ahumma is building its U.S. customer base, with an initial focus on markets including New York and Texas.",
          "Please check our current shipping options at checkout because availability, delivery times and shipping costs can vary.",
        ],
      },
      {
        question: "Can I buy Ahumma in New York?",
        answer: [
          "Ahumma is expanding its U.S. retail presence, beginning with New York.",
          "For the latest stockist information, please visit our Stockists page.",
        ],
      },
      {
        question:
          "Are Ahumma products suitable for Black and brown skin in the U.S.?",
        answer: [
          "Yes.",
          "Ahumma was created with melanin-rich skin at the heart of its product philosophy, while being designed for anyone who enjoys our formulations and sensory experience.",
          "We are particularly interested in serving Black and brown consumers who often want body care that understands their skin, culture and beauty experience.",
        ],
      },
      {
        question: "Will Ahumma products be available in stores in the U.S.?",
        answer: [
          "Yes.",
          "We are selectively building retail partnerships in the United States rather than pursuing mass distribution immediately.",
          "Our ambition is to build Ahumma into a globally recognized African beauty brand, beginning with strong communities in Nigeria and the U.S.",
        ],
      },
    ],
  },
  {
    id: "safety",
    title: "Safety",
    entries: [
      {
        question: "Are Ahumma products safe for sensitive skin?",
        answer: [
          "Our products are formulated with skin comfort in mind, but individual skin can react differently.",
          "If you have sensitive or reactive skin, we recommend reviewing the complete ingredient list and performing a patch test before extensive use.",
        ],
      },
      {
        question: "Are Ahumma products pregnancy-safe?",
        answer: [
          "We do not currently position the entire Ahumma range as universally pregnancy-safe.",
          "If you are pregnant or breastfeeding and have concerns about a particular ingredient, please consult your doctor or qualified healthcare professional before use.",
        ],
      },
    ],
  },
  {
    id: "how-to-use",
    title: "How to use Ahumma",
    entries: [
      {
        question: "How should I apply Ahumma body butter?",
        answer: [],
        steps: [
          "Cleanse your skin.",
          "Pat your skin gently, leaving it slightly damp.",
          "Scoop a small amount of body butter.",
          "Warm it between your palms.",
          "Massage into your skin using gentle circular motions.",
          "Add more to areas that need additional moisture.",
        ],
      },
      {
        question: "When is the best time to use body butter?",
        answer: [
          "The best time is generally after bathing, while your skin is still slightly damp.",
          "This allows you to moisturize immediately after cleansing and makes the application part of a simple daily ritual.",
        ],
      },
      {
        question: "Can I use body butter and body oil together?",
        answer: [
          "Yes, if you enjoy layering products.",
          "A simple approach is: body butter, then body oil.",
          "Use the body butter as your main moisturizing step, then apply a small amount of body oil over it if you want additional nourishment and a more luminous finish.",
        ],
      },
    ],
  },
  {
    id: "philosophy",
    title: "Ahumma philosophy",
    entries: [
      {
        question:
          "Why does Ahumma talk so much about beauty and self-acceptance?",
        answer: [
          "Because we don't believe skincare should begin with the idea that something is wrong with you.",
          "For generations, Black and brown people have been encouraged to change, lighten, hide or “fix” aspects of their appearance.",
          "Ahumma offers a different perspective: care for your skin. Nourish it. Enjoy it. Celebrate it.",
          "Your skin doesn't have to become something else to be beautiful.",
        ],
      },
      {
        question: "Is Ahumma a clinical skincare brand?",
        answer: [
          "No.",
          "Ahumma is currently a premium, non-clinical body-care brand.",
          "Our focus is on beautiful everyday rituals, thoughtful ingredients, sensory experiences and care for melanin-rich skin.",
        ],
      },
      {
        question:
          "What makes Ahumma different from other African skincare brands?",
        answer: [
          "Ahumma sits at the intersection of African heritage, modern body care, sensory luxury, melanin-rich skin and intentional simplicity.",
          "We aren't trying to recreate the past.",
          "We're taking inspiration from where we come from and creating something beautiful for where we're going.",
        ],
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & customer service",
    entries: [
      {
        question: "How long does Ahumma shipping take?",
        answer: [
          "Delivery times depend on your location and shipping method.",
          "Your estimated delivery timeframe will be shown during checkout or communicated with your order confirmation.",
        ],
      },
      {
        question: "How can I track my order?",
        answer: [
          "Once your order has been dispatched, you'll receive tracking information where tracking is available.",
        ],
      },
      {
        question: "What if my product arrives damaged?",
        answer: [
          "Please contact Ahumma customer service as soon as possible with your order number and photographs of the damaged package/product.",
          "We'll review the issue and help resolve it.",
        ],
      },
      {
        question: "Can I return Ahumma products?",
        answer: [
          "For hygiene reasons, opened or used skincare and body-care products may not be eligible for return.",
          "Please review our Returns Policy for the current terms applicable to your country.",
        ],
      },
    ],
  },
  {
    id: "why-ahumma",
    title: "The final FAQ",
    entries: [
      {
        question: "Why should I try Ahumma?",
        answer: [
          "Because body care can be more than something you quickly apply and forget.",
          "It can be a moment. A ritual. A return to yourself.",
          "Ahumma brings together African heritage, beautiful ingredients and modern body care to create products that help you care for your skin—and enjoy the process.",
          "At the edge of everything beautiful is you.",
        ],
      },
    ],
  },
];

/** Flattens an entry into the single answer string structured data expects. */
export function faqAnswerText(entry: FaqEntry) {
  const parts = [...entry.answer];

  if (entry.points?.length) {
    parts.push(entry.points.join(", ") + ".");
  }

  if (entry.steps?.length) {
    parts.push(
      entry.steps.map((step, index) => `${index + 1}. ${step}`).join(" "),
    );
  }

  return parts.join(" ");
}

export const FAQ_ENTRIES = FAQ_GROUPS.flatMap((group) => group.entries);
