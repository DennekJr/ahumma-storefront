export type ProductPrice = {
  currency: string;
  priceMinor: number;
  compareAtMinor?: number | null;
};

export type ProductVariant = {
  ref: string;
  name: string;
  priceMinor: number;
  compareAtMinor?: number | null;
  currency: string;
  prices?: ProductPrice[];
  media?: string[];
  soldOut?: boolean;
  availableQty?: number | null;
  swatchHex?: string | null;
  optionValueRefs?: string[];
  description?: string | null;
  badge?: string | null;
};

export type ProductOption = {
  ref: string;
  name: string;
  display: "text" | "dropdown" | "color" | "image" | string;
  values: Array<{
    ref: string;
    label: string;
    swatchHex?: string | null;
    media?: string[];
  }>;
};

export type ProductSummary = {
  ref: string;
  name: string;
  slug: string;
  isPackage?: boolean;
  coverUrl?: string | null;
  currency: string;
  priceMinorFrom: number;
  pricesFrom?: Record<string, number>;
  compareAtMinorFrom?: number | null;
  compareAtFrom?: Record<string, number>;
  showSaleBadge?: boolean;
  variantCount?: number;
  soldOut?: boolean;
  saveForItSaveable?: boolean;
  preorderable?: boolean;
  ratingAvg?: number | null;
  ratingCount?: number;
  updatedAt?: string;
  /** Present in local preview data so quick-add can work before API keys arrive. */
  previewVariantRef?: string;
  previewTagline?: string;
};

export type ProductInfo = {
  brand?: string | null;
  infoCategory?: string | null;
  longDescription?: string | null;
  descriptionBlocks?: Array<{
    id: string;
    kind: string;
    text?: string | null;
    url?: string | null;
    alt?: string | null;
    caption?: string | null;
    width?: string;
    sort?: number;
  }>;
  highlights?: string[];
  sku?: string | null;
  manufacturer?: string | null;
  modelName?: string | null;
  weightValue?: number | null;
  weightUnit?: string | null;
  countryOfOrigin?: string | null;
  careInstructions?: string | null;
  sustainabilityText?: string | null;
  ingredients?: string[];
  warrantyText?: string | null;
  warrantyMonths?: number | null;
  specs?: Array<{
    id: string;
    key?: string;
    label: string;
    value: string;
    unit?: string | null;
    sort?: number;
  }>;
};

export type ProductDetail = ProductSummary & {
  description?: string | null;
  needsDelivery?: boolean;
  media?: string[];
  variants: ProductVariant[];
  selectionMode?: string;
  variantDisplay?: string;
  options?: ProductOption[];
  preorderEtaText?: string | null;
  preorderRemaining?: number | null;
  restockAlertsEnabled?: boolean;
  reviewsEnabled?: boolean;
  reviews?: {
    count: number;
    average: number;
    aiSummary?: string | null;
  } | null;
  info?: ProductInfo | null;
};

export type ProductCollection = {
  ref: string;
  name: string;
  slug: string;
  description?: string | null;
  coverUrl?: string | null;
  /** Refs of the products in this collection; empty while it is being filled. */
  productRefs: string[];
  itemCount: number;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type DeliveryZone = {
  ref: string;
  name: string;
  feeMinor: number;
  currency: string;
  sort?: number;
  prices?: Array<{ currency: string; feeMinor: number }>;
};

export type StoreCheckoutRequest = {
  items: Array<{ variantRef: string; quantity: number }>;
  contact: { name: string; email: string; phone?: string };
  currency?: string;
  deliveryZoneRef?: string;
};
