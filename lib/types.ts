export type CheckoutSession = {
  ref: string;
  status: "open" | "completed" | "paid" | "expired" | "cancelled" | string;
  mode?: "live" | "test" | string;
  hostedUrl?: string | null;
  returnUrl?: string | null;
  currency?: string;
  orderRef?: string | null;
  expiresAt?: string | null;
  completedAt?: string | null;
  createdAt?: string;
};
