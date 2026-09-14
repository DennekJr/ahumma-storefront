"use client";

import Image from "next/image";
import {
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  formatMoney,
  isStoreCurrency,
  resolvePrice,
  type StoreCurrency,
} from "@/lib/format";
import type { DeliveryZone, ProductPrice } from "@/lib/store-types";

export type CartItem = {
  variantRef: string;
  productRef: string;
  slug: string;
  name: string;
  variantName: string;
  imageUrl: string;
  priceMinor: number;
  currency: string;
  prices?: ProductPrice[];
  quantity: number;
  needsDelivery?: boolean;
  maxQuantity?: number | null;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  currency: StoreCurrency;
  setCurrency: (currency: StoreCurrency) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantRef: string) => void;
  setQuantity: (variantRef: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "ahumma-cart-v2";
const CURRENCY_STORAGE_KEY = "ahumma-currency";

export function CartProvider({
  children,
  checkoutEnabled,
}: {
  children: ReactNode;
  checkoutEnabled: boolean;
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [currency, setCurrency] = useState<StoreCurrency>("NGN");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const storedCurrency = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
      if (isStoreCurrency(storedCurrency)) setCurrency(storedCurrency);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  }, [currency, hydrated, items]);

  useEffect(() => {
    document.body.classList.toggle("cart-is-open", isOpen);
    return () => document.body.classList.remove("cart-is-open");
  }, [isOpen]);

  const addItem = useCallback((item: CartItem) => {
    setItems((current) => {
      const existing = current.find(
        (line) => line.variantRef === item.variantRef,
      );
      if (!existing) return [...current, item];
      return current.map((line) => {
        if (line.variantRef !== item.variantRef) return line;
        const nextQuantity = line.quantity + item.quantity;
        return {
          ...line,
          quantity: line.maxQuantity
            ? Math.min(nextQuantity, line.maxQuantity)
            : nextQuantity,
        };
      });
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variantRef: string) => {
    setItems((current) =>
      current.filter((item) => item.variantRef !== variantRef),
    );
  }, []);

  const setQuantity = useCallback((variantRef: string, quantity: number) => {
    setItems((current) =>
      current.flatMap((item) => {
        if (item.variantRef !== variantRef) return [item];
        if (quantity <= 0) return [];
        return [
          {
            ...item,
            quantity: item.maxQuantity
              ? Math.min(quantity, item.maxQuantity)
              : quantity,
          },
        ];
      }),
    );
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      isOpen,
      currency,
      setCurrency,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      setQuantity,
    }),
    [addItem, currency, isOpen, items, removeItem, setQuantity],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer checkoutEnabled={checkoutEnabled} />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}

function CartDrawer({ checkoutEnabled }: { checkoutEnabled: boolean }) {
  const {
    items,
    itemCount,
    isOpen,
    closeCart,
    removeItem,
    setQuantity,
    currency,
  } = useCart();
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [zoneRef, setZoneRef] = useState("");
  const [loadingZones, setLoadingZones] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  const needsDelivery = items.some((item) => item.needsDelivery);
  const pricedItems = items.map((item) => ({
    item,
    displayPrice: resolvePrice(
      item.priceMinor,
      item.currency,
      item.prices,
      currency,
    ),
  }));
  const subtotal = pricedItems.reduce(
    (sum, { item, displayPrice }) =>
      sum + displayPrice.priceMinor * item.quantity,
    0,
  );
  const selectedZone = zones.find((zone) => zone.ref === zoneRef);
  const selectedZonePrice = selectedZone
    ? resolvePrice(
        selectedZone.feeMinor,
        selectedZone.currency,
        selectedZone.prices?.map((price) => ({
          currency: price.currency,
          priceMinor: price.feeMinor,
        })),
        currency,
      )
    : null;
  const zoneFee = selectedZonePrice?.priceMinor ?? 0;

  useEffect(() => {
    if (!isOpen || !needsDelivery || !checkoutEnabled || zones.length) return;
    const controller = new AbortController();
    setLoadingZones(true);
    fetch("/api/delivery-zones", { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) {
          throw new Error(
            payload.error?.message ?? "Delivery options are unavailable.",
          );
        }
        setZones(payload as DeliveryZone[]);
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError")
          return;
        setError(
          reason instanceof Error
            ? reason.message
            : "Delivery options are unavailable.",
        );
      })
      .finally(() => setLoadingZones(false));
    return () => controller.abort();
  }, [checkoutEnabled, isOpen, needsDelivery, zones.length]);

  async function beginCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!checkoutEnabled) {
      setError(
        "This preview is ready for your Frontdesk keys. Live payment will activate once they are added.",
      );
      return;
    }
    if (!items.length) return;
    if (needsDelivery && zones.length > 0 && !zoneRef) {
      setError("Choose a delivery area before continuing.");
      return;
    }

    setCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": crypto.randomUUID(),
        },
        body: JSON.stringify({
          items: items.map(({ variantRef, quantity }) => ({
            variantRef,
            quantity,
          })),
          contact,
          currency,
          ...(zoneRef ? { deliveryZoneRef: zoneRef } : {}),
        }),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(
          payload.error?.message ?? "Checkout could not be started.",
        );
      if (!payload.hostedUrl)
        throw new Error("Frontdesk did not return a secure checkout link.");
      window.location.assign(payload.hostedUrl as string);
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Checkout could not be started.",
      );
      setCheckingOut(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className={`cart-backdrop ${isOpen ? "is-visible" : ""}`}
        aria-label="Close shopping bag"
        tabIndex={isOpen ? 0 : -1}
        onClick={closeCart}
      />
      <aside
        className={`cart-drawer ${isOpen ? "is-open" : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!isOpen}
      >
        <div className="cart-drawer__header">
          <div>
            <h2>SHOPPING BAG ({itemCount})</h2>
          </div>
          <button
            type="button"
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Close bag"
          >
            CLOSE
          </button>
        </div>

        {!items.length ? (
          <div className="empty-cart">
            <ShoppingBag size={31} strokeWidth={1.35} />
            <h3>Your bag is quiet.</h3>
            <p>
              Explore considered care for cleansing, renewal and everyday glow.
            </p>
            <button type="button" className="text-button" onClick={closeCart}>
              Continue shopping <ArrowRight size={15} />
            </button>
          </div>
        ) : (
          <form className="cart-checkout" onSubmit={beginCheckout}>
            <div className="cart-lines">
              {pricedItems.map(({ item, displayPrice }) => (
                <article className="cart-line" key={item.variantRef}>
                  <div className="cart-line__image">
                    <Image src={item.imageUrl} alt="" fill sizes="96px" />
                  </div>
                  <div className="cart-line__content">
                    <h3>{item.name}</h3>
                    <p>{item.variantName}</p>
                    <span>
                      {formatMoney(
                        displayPrice.priceMinor,
                        displayPrice.currency,
                      )}
                    </span>
                    <div
                      className="quantity-control"
                      aria-label={`Quantity for ${item.name}`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(item.variantRef, item.quantity - 1)
                        }
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(item.variantRef, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="line-remove"
                    onClick={() => removeItem(item.variantRef)}
                    aria-label={`Remove ${item.name} from bag`}
                    title={`Remove ${item.name}`}
                  >
                    <Trash2 size={15} strokeWidth={1.5} />
                  </button>
                </article>
              ))}
            </div>

            <div className="cart-form">
              <h3>Checkout details</h3>
              <div className="field-pair">
                <label>
                  <span>Name</span>
                  <input
                    required
                    autoComplete="name"
                    value={contact.name}
                    onChange={(event) =>
                      setContact((value) => ({
                        ...value,
                        name: event.target.value,
                      }))
                    }
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={contact.email}
                    onChange={(event) =>
                      setContact((value) => ({
                        ...value,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <label>
                <span>
                  Phone <small>optional</small>
                </span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={contact.phone}
                  onChange={(event) =>
                    setContact((value) => ({
                      ...value,
                      phone: event.target.value,
                    }))
                  }
                />
              </label>
              {needsDelivery && checkoutEnabled && zones.length > 0 ? (
                <label>
                  <span>Delivery area</span>
                  <select
                    required={zones.length > 0}
                    disabled={loadingZones || !zones.length}
                    value={zoneRef}
                    onChange={(event) => setZoneRef(event.target.value)}
                  >
                    <option value="">
                      {loadingZones
                        ? "Loading delivery areas…"
                        : "Choose an area"}
                    </option>
                    {zones.map((zone) => {
                      const deliveryPrice = resolvePrice(
                        zone.feeMinor,
                        zone.currency,
                        zone.prices?.map((price) => ({
                          currency: price.currency,
                          priceMinor: price.feeMinor,
                        })),
                        currency,
                      );

                      return (
                        <option key={zone.ref} value={zone.ref}>
                          {zone.name} ·{" "}
                          {formatMoney(
                            deliveryPrice.priceMinor,
                            deliveryPrice.currency,
                          )}
                        </option>
                      );
                    })}
                  </select>
                </label>
              ) : null}
            </div>

            <div className="cart-totals">
              <div>
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal, currency)}</strong>
              </div>
              {selectedZone ? (
                <div>
                  <span>Delivery</span>
                  <strong>{formatMoney(zoneFee, currency)}</strong>
                </div>
              ) : null}
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatMoney(subtotal + zoneFee, currency)}</strong>
              </div>
            </div>

            {error ? <p className="cart-error">{error}</p> : null}
            {!checkoutEnabled ? (
              <p className="preview-checkout-note">
                <Check size={14} /> Cart and checkout flow are ready for the API
                keys.
              </p>
            ) : null}
            <button
              className="checkout-button"
              type="submit"
              disabled={checkingOut || loadingZones}
            >
              {checkingOut
                ? "Opening secure checkout…"
                : checkoutEnabled
                  ? "Continue to secure payment"
                  : "Preview checkout"}
              <ArrowRight size={17} />
            </button>
            <p className="secure-note">
              Payment is completed securely on Frontdesk. Ahumma never handles
              your card details.
            </p>
          </form>
        )}
      </aside>
    </>
  );
}
