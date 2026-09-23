/**
 * Ahumma's privacy policy.
 *
 * Transcribed from the signed PDF rather than rewritten: the wording is a legal
 * document, so it is reproduced verbatim and only the structure — sections,
 * subheadings, lists — is modelled here. Section numbering follows the source,
 * which is what a regulator or a customer request will cite.
 *
 * To update, replace the content below from the new PDF and move LAST_UPDATED.
 * Section 32 of the policy itself promises that date moves whenever the text
 * does, so the two must not drift apart.
 */

export type PolicyBlock =
  | { t: "p"; v: string }
  | { t: "h3"; v: string; n: string }
  | { t: "ul"; v: string[] };

export type PolicySection = {
  n: number;
  title: string;
  blocks: PolicyBlock[];
};

export const PRIVACY_META = {
  company: "Ahumma Limited",
  registrationNumber: "8857375",
  website: "ahumma.com",
  email: "info@ahumma.com",
  phone: "07074050960",
  location: "Nigeria",
  effectiveDate: "17 September 2026",
  lastUpdated: "17 September 2026",
} as const;

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    n: 1,
    title: "Introduction",
    blocks: [
      { t: "p", v: "Ahumma Limited (\"Ahumma,\" \"we,\" \"us,\" or \"our\") operates ahumma.com (the \"Site\") and provides body-care products and related services to customers in Nigeria and internationally." },
      { t: "p", v: "We respect your privacy and are committed to handling personal information responsibly, transparently and securely." },
      { t: "p", v: "This Privacy Policy explains how we collect, use, disclose, store, retain and protect personal information when you:" },
      {
        t: "ul",
        v: [
          "visit or browse our Site;",
          "create an Ahumma account;",
          "place or attempt to place an order;",
          "purchase or receive Ahumma products;",
          "contact our customer service team;",
          "subscribe to our marketing communications;",
          "submit a review, photograph, video or other customer content;",
          "interact with Ahumma through social media or other digital channels; or",
          "otherwise interact with Ahumma.",
        ],
      },
      { t: "p", v: "This Privacy Policy is intended to provide information relevant to customers in Nigeria and, where applicable, customers in other jurisdictions, including the United States and Canada." },
      { t: "p", v: "The privacy rights available to you may depend on where you live and the laws that apply to your circumstances. Where required by applicable law, Ahumma will obtain consent for particular processing activities. Where consent is not the appropriate legal basis, we may process personal information where necessary to perform a contract, comply with a legal obligation, protect our legitimate interests, prevent fraud or misuse, or on another lawful basis permitted by applicable law." },
    ],
  },
  {
    n: 2,
    title: "Who is responsible for your personal information?",
    blocks: [
      { t: "p", v: "Ahumma Limited is generally responsible for determining how and why the personal information described in this Privacy Policy is processed." },
      { t: "p", v: "For privacy questions, requests or concerns, please contact:" },
      { t: "p", v: "Ahumma Limited\nNigeria\nPrivacy Email: info@ahumma.com\nPhone: 07074050960" },
      { t: "p", v: "Where required by applicable law, Ahumma may appoint a designated data-protection or privacy representative. Details of that representative will be made available where legally required." },
    ],
  },
  {
    n: 3,
    title: "What personal information do we collect?",
    blocks: [
      { t: "p", v: "The information we collect depends on how you interact with Ahumma." },
      { t: "h3", n: "3.1", v: "Information You Provide Directly" },
      { t: "p", v: "We may collect:" },
      {
        t: "ul",
        v: [
          "Full name",
          "Email address",
          "Phone number",
          "Billing address",
          "Delivery/shipping address",
          "Account username or login information",
          "Order and purchase history",
          "Products purchased or considered",
          "Product preferences and related information",
          "Customer-service communications",
          "Information you provide when making an enquiry or complaint",
          "Information provided in product reviews",
          "Photographs or videos submitted with reviews or customer content",
          "Information provided when you subscribe to marketing communications",
          "Information provided when you participate in Ahumma events, campaigns, promotions or community activities",
        ],
      },
      { t: "p", v: "You should only provide personal information that is accurate and that you have the right to provide." },
    ],
  },
  {
    n: 4,
    title: "Payment information",
    blocks: [
      { t: "p", v: "Payments made through the Site may be processed by third-party payment providers, including Flutterwave." },
      { t: "p", v: "Where payment information is collected through a third-party payment provider, that provider may process payment and transaction information in accordance with its own terms and privacy practices." },
      { t: "p", v: "Ahumma does not intentionally store customers' full payment card numbers or complete card-security information on its own systems." },
      { t: "p", v: "We may retain transaction-related information necessary for order fulfilment, accounting, reconciliation, fraud prevention, customer service and legal or regulatory purposes." },
    ],
  },
  {
    n: 5,
    title: "Information collected automatically",
    blocks: [
      { t: "p", v: "When you visit or use our Site, certain information may be collected automatically. This may include:" },
      {
        t: "ul",
        v: [
          "IP address",
          "Browser type and version",
          "Device type",
          "Operating system",
          "Approximate location derived from technical information",
          "Pages visited",
          "Products viewed",
          "Referring websites",
          "Date and time of visits",
          "Website interaction information",
          "General usage and engagement information",
          "Cookie identifiers and similar technologies",
        ],
      },
      { t: "p", v: "This information may be used to understand how our Site is used, improve functionality, measure marketing performance, maintain security and improve the customer experience." },
    ],
  },
  {
    n: 6,
    title: "Cookies and similar technologies",
    blocks: [
      { t: "p", v: "Ahumma uses cookies and similar technologies to operate, secure and improve our Site." },
      { t: "p", v: "These technologies may be used for:" },
      { t: "p", v: "Strictly necessary purposes" },
      { t: "p", v: "Including:" },
      {
        t: "ul",
        v: [
          "Shopping-cart functionality",
          "Checkout",
          "Authentication",
          "Security",
          "Fraud prevention",
          "Basic Site functionality",
        ],
      },
      { t: "p", v: "Preferences" },
      { t: "p", v: "Including remembering choices and settings. Analytics" },
      { t: "p", v: "Including understanding:" },
      {
        t: "ul",
        v: [
          "how visitors use the Site;",
          "which pages are visited;",
          "how customers move through the Site; and",
          "how we can improve our website and customer experience.",
        ],
      },
      { t: "p", v: "Advertising and marketing" },
      { t: "p", v: "Where applicable, technologies such as Meta/Facebook Pixel may help us measure advertising effectiveness, understand campaign performance and, where permitted, create or measure advertising audiences." },
      { t: "p", v: "We may also use services such as Google Analytics for website analytics." },
      { t: "p", v: "Where required by applicable law, Ahumma will seek your consent before using non-essential cookies, analytics technologies or advertising technologies." },
      { t: "p", v: "You may be able to manage cookies through our Site's cookie controls, where available, and through your browser or device settings." },
      { t: "p", v: "Disabling certain cookies may affect the functionality of portions of the Site." },
    ],
  },
  {
    n: 7,
    title: "How we use personal information",
    blocks: [
      { t: "p", v: "We may use personal information to:" },
      {
        t: "ul",
        v: [
          "Process and fulfil orders",
          "Process or facilitate payments",
          "Arrange delivery and shipping",
          "Communicate with you about your orders",
          "Provide customer support",
          "Respond to questions, complaints and enquiries",
          "Manage customer accounts",
          "Maintain order and business records",
          "Improve our products and services",
          "Improve our Site and customer experience",
          "Understand how customers interact with our Site",
          "Analyse website performance",
          "Measure advertising and marketing campaigns",
          "Personalise or improve our communications, where permitted",
          "Send promotional communications where you have consented or where otherwise permitted by applicable law",
          "Prevent fraud, misuse and unauthorised activity",
          "Maintain the security of our Site, systems and services",
          "Administer promotions, events, community activities and campaigns",
          "Manage reviews and customer-generated content",
          "Comply with accounting, tax, legal and regulatory obligations",
          "Establish, exercise or defend legal claims",
          "Protect the rights, property, safety and security of Ahumma, our customers and others",
        ],
      },
      { t: "p", v: "We will not use personal information for purposes that are incompatible with the purposes described in this Privacy Policy unless permitted or required by applicable law or we have obtained appropriate consent." },
    ],
  },
  {
    n: 8,
    title: "Lawful bases for processing",
    blocks: [
      { t: "p", v: "Depending on the circumstances and applicable law, Ahumma may process personal information on one or more of the following bases:" },
      { t: "p", v: "Contract" },
      { t: "p", v: "Where processing is necessary to:" },
      {
        t: "ul",
        v: [
          "process an order;",
          "deliver products;",
          "provide customer-account services; or",
          "otherwise perform our obligations to you.",
        ],
      },
      { t: "p", v: "Consent" },
      { t: "p", v: "Where you have voluntarily provided consent, including where consent is required for:" },
      {
        t: "ul",
        v: [
          "certain marketing communications;",
          "certain cookies or advertising technologies;",
          "certain customer-generated content; or",
          "other processing activities requiring consent. You may withdraw consent where legally permitted, although withdrawal will not affect processing that occurred before withdrawal or processing that can lawfully continue on another basis.",
        ],
      },
      { t: "p", v: "Legal obligation" },
      { t: "p", v: "Where processing is necessary to comply with applicable laws, regulations, tax requirements, accounting requirements, legal processes or regulatory obligations." },
      { t: "p", v: "Legitimate interests" },
      { t: "p", v: "Where permitted by applicable law, we may process information where reasonably necessary for legitimate business interests, such as:" },
      {
        t: "ul",
        v: [
          "improving our Site;",
          "preventing fraud;",
          "maintaining security;",
          "managing customer relationships;",
          "protecting our legal rights; or",
          "operating and developing our business.",
        ],
      },
      { t: "p", v: "Where we rely on legitimate interests, we will consider the impact on your privacy rights and interests." },
      { t: "p", v: "Other lawful grounds" },
      { t: "p", v: "We may rely on other lawful bases recognised under applicable law where appropriate." },
    ],
  },
  {
    n: 9,
    title: "How we share personal information",
    blocks: [
      { t: "p", v: "We do not sell personal information for monetary consideration." },
      { t: "p", v: "We may disclose or provide access to personal information where reasonably necessary to operate Ahumma, fulfil orders, provide services, comply with law or protect our rights." },
      { t: "p", v: "These parties may include:" },
      { t: "h3", n: "9.1", v: "Payment Providers" },
      { t: "p", v: "We may share information with payment providers such as Flutterwave to facilitate payment processing and related transaction activities." },
      { t: "h3", n: "9.2", v: "Delivery and Logistics Partners" },
      { t: "p", v: "We may provide delivery or logistics providers with information necessary to fulfil an order, including:" },
      {
        t: "ul",
        v: [
          "Name",
          "Phone number",
          "Delivery address",
          "Order information",
        ],
      },
      { t: "h3", n: "9.3", v: "Technology and Service Providers" },
      { t: "p", v: "We may use third-party providers supporting:" },
      {
        t: "ul",
        v: [
          "Website hosting",
          "E-commerce functionality",
          "Inventory management",
          "Order management",
          "Analytics",
          "Marketing",
          "Customer service",
          "Communications",
          "Security",
          "IT infrastructure",
          "Business administration",
        ],
      },
      { t: "p", v: "These may include services such as Zoho Inventory, Google Analytics and Meta technologies, depending on the services Ahumma uses from time to time." },
      { t: "p", v: "We seek to limit information shared with service providers to information reasonably necessary for the relevant service or business purpose." },
      { t: "h3", n: "9.4", v: "Professional Advisers" },
      { t: "p", v: "We may share information with professional advisers such as lawyers, accountants, auditors, insurers and other professional service providers where reasonably necessary." },
      { t: "h3", n: "9.5", v: "Legal and Regulatory Requirements" },
      { t: "p", v: "We may disclose personal information where required or permitted by law, regulation, court order, legal process or governmental request." },
      { t: "p", v: "We may also disclose information where reasonably necessary to:" },
      {
        t: "ul",
        v: [
          "prevent fraud;",
          "investigate misuse;",
          "protect our rights;",
          "protect the safety or security of individuals;",
          "enforce our agreements; or",
          "establish, exercise or defend legal claims.",
        ],
      },
      { t: "h3", n: "9.6", v: "Business Transactions" },
      { t: "p", v: "If Ahumma is involved in a merger, acquisition, financing, restructuring, sale of assets, investment transaction or similar corporate transaction, personal information may be transferred as part of that transaction where legally permitted." },
    ],
  },
  {
    n: 10,
    title: "Targeted advertising and advertising technologies",
    blocks: [
      { t: "p", v: "Ahumma may use third-party advertising and analytics technologies, including Meta technologies, to understand advertising performance and, where permitted, deliver or measure relevant advertising." },
      { t: "p", v: "Depending on your location and applicable law, these activities may be treated differently from ordinary service-provider processing." },
      { t: "p", v: "Where applicable law gives you the right to opt out of targeted advertising, sale or sharing of personal information, Ahumma will provide the relevant mechanism or instructions." },
      { t: "p", v: "We do not knowingly sell personal information for monetary consideration." },
    ],
  },
  {
    n: 11,
    title: "International data transfers",
    blocks: [
      { t: "p", v: "Ahumma is based in Nigeria and ships internationally, including to customers in the United States and Canada. Depending on the services and providers used to operate our business, personal information may be processed, stored or accessed in countries other than the country where you live." },
      { t: "p", v: "Different countries may have different privacy laws." },
      { t: "p", v: "Where required by applicable law, Ahumma will take reasonable and appropriate steps to ensure that international transfers of personal information are subject to appropriate safeguards." },
      { t: "p", v: "These safeguards may include:" },
      {
        t: "ul",
        v: [
          "contractual protections;",
          "organisational safeguards;",
          "technical security measures; and",
          "other transfer mechanisms recognised under applicable law.",
        ],
      },
      { t: "p", v: "You may contact us using the details in Section 24 if you would like more information about international processing relevant to your personal information." },
    ],
  },
  {
    n: 12,
    title: "Customer reviews and user-submitted content",
    blocks: [
      { t: "p", v: "Customers may voluntarily submit:" },
      {
        t: "ul",
        v: [
          "Reviews",
          "Photographs",
          "Videos",
          "Testimonials",
          "Social-media content",
          "Other content relating to their Ahumma experience",
        ],
      },
      { t: "p", v: "We may use information contained in such submissions to administer and display reviews or other customer content." },
      { t: "p", v: "However, submission of customer content does not automatically grant Ahumma unlimited commercial rights to use that content." },
      { t: "p", v: "Where Ahumma wishes to use customer content for advertising, promotional campaigns, paid media, social media campaigns or other commercial purposes beyond the original submission context, we may request a separate consent or content licence." },
      { t: "p", v: "That separate permission may explain:" },
      {
        t: "ul",
        v: [
          "How the content may be used",
          "Where it may be published",
          "How long the permission lasts",
          "Whether the content may be edited or cropped",
          "Whether the content may be used in paid advertising",
          "Whether compensation is provided, where applicable",
        ],
      },
      { t: "p", v: "You should only submit content that you have the right to share." },
      { t: "p", v: "You should not submit photographs or videos containing another person unless you have the necessary permission." },
    ],
  },
  {
    n: 13,
    title: "Children's privacy",
    blocks: [
      { t: "p", v: "Ahumma offers products intended for different stages of life, including products intended for babies and children." },
      { t: "p", v: "However, the Site is intended for adults and Ahumma does not knowingly seek to collect personal information directly from children." },
      { t: "p", v: "Parents or legal guardians should place orders for products intended for children." },
      { t: "p", v: "Parents and guardians should also supervise children's use of Ahumma products where appropriate." },
      { t: "p", v: "We ask customers not to submit children's personal information, photographs or videos to Ahumma unless they have the appropriate legal authority and consent to do so." },
      { t: "p", v: "Where Ahumma wishes to use a child's photograph, video, testimonial or other personal information for promotional purposes, we may require separate verifiable parental or guardian consent." },
      { t: "p", v: "If you believe that a child has provided personal information to Ahumma without appropriate involvement of a parent or legal guardian, please contact us at:" },
      { t: "p", v: "info@ahumma.com" },
    ],
  },
  {
    n: 14,
    title: "Data minimisation and accuracy",
    blocks: [
      { t: "p", v: "Ahumma seeks to collect personal information that is adequate, relevant and reasonably necessary for the purposes for which it is processed." },
      { t: "p", v: "We encourage customers to provide accurate and up-to-date information." },
      { t: "p", v: "If your personal information changes or you believe information we hold about you is inaccurate, you may contact us to request correction." },
    ],
  },
  {
    n: 15,
    title: "Data security",
    blocks: [
      { t: "p", v: "Ahumma uses reasonable administrative, technical and organisational measures designed to protect personal information against:" },
      {
        t: "ul",
        v: [
          "Unauthorised access",
          "Unauthorised disclosure",
          "Loss",
          "Misuse",
          "Alteration",
          "Destruction",
          "Unauthorised processing",
        ],
      },
      { t: "p", v: "Security measures may include access controls, password protection, restricted employee access, secure service providers and other technical and organisational safeguards appropriate to the information and the risks involved." },
      { t: "p", v: "No method of transmitting or storing information online is completely secure." },
      { t: "p", v: "Accordingly, while we take reasonable steps to protect personal information, we cannot guarantee absolute security." },
    ],
  },
  {
    n: 16,
    title: "Data breaches and security incidents",
    blocks: [
      { t: "p", v: "If Ahumma becomes aware of a personal-data breach or security incident, we will assess the incident and take reasonable steps to contain, investigate and remediate it." },
      { t: "p", v: "Where required by applicable law, we may notify:" },
      {
        t: "ul",
        v: [
          "Relevant regulators or supervisory authorities;",
          "Affected individuals;",
          "Service providers or other relevant parties.",
        ],
      },
      { t: "p", v: "The timing and content of any notification will depend on the nature of the incident, the risk involved and the legal requirements applicable to the incident." },
      { t: "p", v: "For Nigeria, the applicable regulatory requirements may include obligations under the Nigeria Data Protection Act and guidance issued by the Nigeria Data Protection Commission. The NDPC's published guidance states that certain breaches are subject to notification obligations, including a 72-hour notification period for qualifying breaches." },
    ],
  },
  {
    n: 17,
    title: "Data retention",
    blocks: [
      { t: "p", v: "Ahumma retains personal information only for as long as reasonably necessary for the purposes for which it was collected, including:" },
      {
        t: "ul",
        v: [
          "Fulfilling orders",
          "Maintaining customer-service records",
          "Maintaining accounting and financial records",
          "Complying with legal and regulatory requirements",
          "Preventing fraud and misuse",
          "Resolving disputes",
          "Establishing, exercising or defending legal claims",
          "Maintaining legitimate business records",
          "Managing marketing preferences",
        ],
      },
      { t: "p", v: "Different categories of information may be retained for different periods." },
      { t: "p", v: "When personal information is no longer reasonably required, we may securely delete, destroy or anonymise it, subject to applicable legal, regulatory, accounting or legitimate business requirements." },
    ],
  },
  {
    n: 18,
    title: "Your privacy rights",
    blocks: [
      { t: "p", v: "Depending on where you live and the law applicable to you, you may have rights relating to your personal information. These may include:" },
      { t: "p", v: "Right to be informed" },
      { t: "p", v: "The right to receive information about how your personal information is collected and used." },
      { t: "p", v: "Right of access" },
      { t: "p", v: "The right to request access to personal information we hold about you." },
      { t: "p", v: "Right to rectification" },
      { t: "p", v: "The right to request correction of inaccurate or incomplete personal information." },
      { t: "p", v: "Right to erasure" },
      { t: "p", v: "The right to request deletion of personal information in circumstances where applicable law provides that right." },
      { t: "p", v: "Right to restrict processing" },
      { t: "p", v: "The right, in applicable circumstances, to request that processing of your personal information be restricted." },
      { t: "p", v: "Right to object" },
      { t: "p", v: "The right to object to certain processing of your personal information, including certain forms of direct marketing or processing based on legitimate interests where applicable." },
      { t: "p", v: "Right to data portability" },
      { t: "p", v: "Where applicable, the right to receive certain personal information in a structured, commonly used and machine-readable format or request that it be transferred to another organisation." },
      { t: "p", v: "Right to withdraw consent" },
      { t: "p", v: "Where processing is based on consent, you may withdraw your consent, subject to legal or contractual restrictions." },
      { t: "p", v: "Rights relating to automated decision-making" },
      { t: "p", v: "Where applicable law provides such rights, you may have rights relating to decisions made solely through automated processing. Right to complain" },
      { t: "p", v: "You may have the right to lodge a complaint with the relevant privacy or data-protection supervisory authority." },
      { t: "p", v: "Not all rights apply in every circumstance, and certain legal exceptions may apply." },
    ],
  },
  {
    n: 19,
    title: "Nigeria — data protection rights",
    blocks: [
      { t: "p", v: "For customers and other data subjects whose personal information is subject to Nigerian data-protection law, Ahumma seeks to comply with the Nigeria Data Protection Act 2023 and applicable regulations, directives and guidance." },
      { t: "p", v: "The Nigeria Data Protection Commission identifies data-subject rights including the right to be informed, access, rectification, objection, restriction, data portability, erasure, rights concerning automated decision-making and the right to report to the supervisory authority." },
      { t: "p", v: "If you believe your privacy rights have been infringed, you may first contact Ahumma using the details in Section 24 so that we can investigate and respond." },
      { t: "p", v: "You may also have the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC)." },
    ],
  },
  {
    n: 20,
    title: "United States — state privacy rights",
    blocks: [
      { t: "p", v: "Privacy laws in the United States vary by state." },
      { t: "p", v: "Where a U.S. state privacy law applies to Ahumma and to your personal information, you may have additional rights under that law." },
      { t: "p", v: "Depending on the applicable law, these rights may include:" },
      {
        t: "ul",
        v: [
          "The right to know or access personal information collected about you",
          "The right to correct inaccurate information",
          "The right to request deletion",
          "The right to opt out of certain targeted advertising",
          "The right to opt out of certain sales or sharing of personal information",
          "The right to limit certain uses of sensitive personal information where applicable",
          "The right to appeal certain privacy decisions",
          "The right to receive equal treatment for exercising applicable privacy rights",
        ],
      },
      { t: "p", v: "The availability and scope of these rights depend on factors including your state of residence, the type of information involved and whether Ahumma is subject to the applicable law." },
      { t: "p", v: "For example, the California Consumer Privacy Act applies to certain for-profit businesses that meet statutory requirements and thresholds; it does not automatically apply to every business that sells to a California resident." },
      { t: "p", v: "Where applicable law provides a specific opt-out mechanism for targeted advertising, sale or sharing of personal information, Ahumma will provide the applicable mechanism." },
    ],
  },
  {
    n: 21,
    title: "Canada — privacy rights",
    blocks: [
      { t: "p", v: "Ahumma may receive and process personal information relating to customers in Canada." },
      { t: "p", v: "Depending on the circumstances and the province in which you live, Canadian federal or provincial privacy laws may apply." },
      { t: "p", v: "Where applicable, these laws may provide rights relating to:" },
      {
        t: "ul",
        v: [
          "Meaningful consent",
          "Access to personal information",
          "Correction of personal information",
          "Appropriate safeguards",
          "Limiting collection",
          "Limiting use and disclosure",
          "Retention",
          "Accountability",
          "Complaints and challenges concerning privacy practices",
        ],
      },
      { t: "p", v: "PIPEDA, where applicable, is based on ten fair-information principles including accountability, identifying purposes, consent, limiting collection, limiting use/disclosure/retention, accuracy, safeguards, openness, individual access and challenging compliance. Where consent is required, Ahumma seeks to provide information sufficient for customers to understand what information is collected, why it is collected, how it is used and with whom it may be shared." },
      { t: "p", v: "Because privacy requirements may differ by Canadian province, Ahumma will apply the law relevant to the particular circumstances." },
    ],
  },
  {
    n: 22,
    title: "Marketing communications",
    blocks: [
      { t: "p", v: "If you provide your contact information for marketing purposes, Ahumma may contact you about:" },
      {
        t: "ul",
        v: [
          "New products",
          "Product launches",
          "Promotions",
          "Offers",
          "Events",
          "Brand updates",
          "Community activities",
          "Other marketing communications",
        ],
      },
      { t: "p", v: "Where consent is required, we will obtain appropriate consent before sending promotional communications." },
      { t: "p", v: "You may opt out of promotional email communications at any time by using the unsubscribe mechanism included in the communication." },
      { t: "p", v: "You may also contact us at:" },
      { t: "p", v: "info@ahumma.com" },
      { t: "p", v: "Where marketing messages are sent by SMS, WhatsApp or another messaging service, additional consent or opt-out requirements may apply depending on the jurisdiction and communication channel." },
      { t: "p", v: "Opting out of marketing communications does not prevent Ahumma from sending necessary transactional communications, including:" },
      {
        t: "ul",
        v: [
          "Order confirmations",
          "Payment confirmations",
          "Delivery updates",
          "Important account information",
          "Product or service communications necessary to fulfil an order",
        ],
      },
    ],
  },
  {
    n: 23,
    title: "Account deletion",
    blocks: [
      { t: "p", v: "If you have an Ahumma customer account, you may contact us to request deletion of your account." },
      { t: "p", v: "We may need to verify your identity before completing the request." },
      { t: "p", v: "Deleting an account does not necessarily mean that all personal information will immediately be deleted." },
      { t: "p", v: "Certain information may need to be retained for:" },
      {
        t: "ul",
        v: [
          "Legal requirements",
          "Accounting and tax obligations",
          "Fraud prevention",
          "Dispute resolution",
          "Record-keeping",
          "Establishing, exercising or defending legal claims",
          "Other lawful purposes",
        ],
      },
      { t: "p", v: "Where information no longer needs to be retained, we may delete or anonymise it." },
    ],
  },
  {
    n: 24,
    title: "How to make a privacy request",
    blocks: [
      { t: "p", v: "To make a privacy request, complaint or enquiry, contact:" },
      { t: "p", v: "Ahumma Limited\nNigeria\nEmail: info@ahumma.com\nPhone: 07074050960" },
      { t: "p", v: "Your request should, where possible, include:" },
      {
        t: "ul",
        v: [
          "Your full name",
          "Email address or phone number associated with your Ahumma account/order",
          "The nature of your request",
          "Any relevant order or account details We may request additional information to verify your identity and protect against unauthorised access to personal information.",
        ],
      },
      { t: "p", v: "We will process requests in accordance with the law applicable to the request." },
      { t: "p", v: "Some requests may be subject to legal exceptions or limitations." },
    ],
  },
  {
    n: 25,
    title: "Third-party websites and services",
    blocks: [
      { t: "p", v: "The Site may contain links to or integrations with third-party websites, applications, payment providers, social-media platforms and other services." },
      { t: "p", v: "These third parties may have their own privacy policies and practices." },
      { t: "p", v: "Ahumma is not responsible for the privacy practices of third parties that operate independently from Ahumma." },
      { t: "p", v: "We encourage you to review the privacy policies of third-party services before providing them with personal information." },
    ],
  },
  {
    n: 26,
    title: "Social media",
    blocks: [
      { t: "p", v: "Ahumma may maintain accounts or pages on social-media platforms." },
      { t: "p", v: "If you interact with Ahumma through a social-media platform, the platform may collect and process information about you according to its own privacy policy." },
      { t: "p", v: "Information you publicly post or submit to a social-media platform may also be visible to others depending on your privacy settings." },
      { t: "p", v: "Ahumma may receive information made available to us through these platforms in accordance with the platform's functionality and your settings." },
    ],
  },
  {
    n: 27,
    title: "Product-related information",
    blocks: [
      { t: "p", v: "Ahumma may collect information relating to products you purchase or enquire about, including product preferences and customer feedback." },
      { t: "p", v: "Ahumma products are not intended to diagnose, treat, cure or prevent medical conditions unless expressly stated and legally authorised." },
      { t: "p", v: "Information submitted to Ahumma about skin concerns, sensitivities or product experiences should not be assumed to constitute medical records or professional medical advice." },
      { t: "p", v: "Customers should review product ingredients and directions before use and seek appropriate professional advice where they have concerns about allergies, sensitivities or medical conditions." },
    ],
  },
  {
    n: 28,
    title: "Data relating to sensitive information",
    blocks: [
      { t: "p", v: "We do not generally require customers to provide sensitive personal information to purchase Ahumma products." },
      { t: "p", v: "Please do not provide sensitive personal information through reviews, customer service channels, social media or other communications unless it is necessary for your enquiry." },
      { t: "p", v: "If sensitive personal information is provided to us, we will handle it in accordance with applicable law and appropriate safeguards." },
    ],
  },
  {
    n: 29,
    title: "Data protection of third-party information",
    blocks: [
      { t: "p", v: "If you provide Ahumma with another person's personal information—for example, a recipient's delivery details—you confirm that you have the appropriate authority or lawful basis to provide that information to us. You should inform that person, where required, that their information has been provided to Ahumma for the relevant purpose." },
    ],
  },
  {
    n: 30,
    title: "Business partners and service providers",
    blocks: [
      { t: "p", v: "Ahumma may engage service providers to help operate its business." },
      { t: "p", v: "Where appropriate, Ahumma seeks to ensure that service providers:" },
      {
        t: "ul",
        v: [
          "Process information only for authorised purposes;",
          "Maintain appropriate security safeguards;",
          "Protect personal information against unauthorised access;",
          "Comply with applicable privacy obligations; and",
          "Assist Ahumma in responding to applicable privacy requirements.",
        ],
      },
      { t: "p", v: "Where required by law, appropriate contractual or other safeguards may be used when personal information is processed by third parties." },
      { t: "p", v: "Canadian privacy guidance similarly emphasises that an organisation remains accountable for personal information under its control, including information transferred to third parties for processing." },
    ],
  },
  {
    n: 31,
    title: "Privacy of employees, contractors and other persons",
    blocks: [
      { t: "p", v: "This Privacy Policy primarily concerns customers, website visitors and other individuals interacting with Ahumma through the Site or customer-facing services." },
      { t: "p", v: "Separate internal privacy policies or notices may apply to Ahumma employees, contractors, creators, suppliers, partners and other business relationships." },
    ],
  },
  {
    n: 32,
    title: "Changes to this Privacy Policy",
    blocks: [
      { t: "p", v: "We may update this Privacy Policy from time to time to reflect changes in:" },
      {
        t: "ul",
        v: [
          "Our business",
          "Products and services",
          "Technology",
          "Third-party providers",
          "Privacy practices",
          "Applicable laws or regulations",
          "Regulatory guidance",
        ],
      },
      { t: "p", v: "When we make changes, we will update the Last Updated date at the beginning of this Privacy Policy." },
      { t: "p", v: "Where required by applicable law, we will provide additional notice or obtain consent for material changes." },
      { t: "p", v: "We encourage you to review this Privacy Policy periodically." },
    ],
  },
  {
    n: 33,
    title: "Severability",
    blocks: [
      { t: "p", v: "If any provision of this Privacy Policy is found to be invalid, unlawful or unenforceable under applicable law, that provision will be interpreted or modified to the extent necessary to comply with the applicable law, and the remaining provisions will continue to apply to the extent permitted." },
    ],
  },
  {
    n: 34,
    title: "Governing law and jurisdiction",
    blocks: [
      { t: "p", v: "Ahumma is a company incorporated in Nigeria and operates primarily from Nigeria." },
      { t: "p", v: "This Privacy Policy will be interpreted consistently with applicable Nigerian law and, where applicable, the mandatory privacy laws of the jurisdiction in which a customer resides." },
      { t: "p", v: "Nothing in this section is intended to remove or limit privacy rights that cannot lawfully be excluded under the laws applicable to you." },
    ],
  },
  {
    n: 35,
    title: "Contact us",
    blocks: [
      { t: "p", v: "If you have questions, concerns, complaints or requests concerning this Privacy Policy or Ahumma's handling of personal information, please contact:" },
      { t: "p", v: "AHUMMA LIMITED\nCompany Registration No.: 8857375\nNigeria" },
      { t: "p", v: "Email: info@ahumma.com\nPhone: 07074050960\nWebsite: ahumma.com" },
    ],
  },
];

export const PRIVACY_CLOSING = {
  title: "Your privacy matters to us",
  blocks: [
    "Ahumma was created around the belief that people should feel cared for, respected and seen.",
    "That principle extends beyond our products.",
    "We are committed to handling your personal information with care, transparency and respect.",
  ],
  signoff: "At the edge of everything beautiful is you.",
} as const;
