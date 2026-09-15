"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Minus, Plus, Trash2 } from "lucide-react";
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
import { demoProductSummaries } from "@/lib/demo-products";
import type {
  DeliveryZone,
  ProductPrice,
  ProductSummary,
} from "@/lib/store-types";

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
    addItem,
    currency,
  } = useCart();
  const [recommendations, setRecommendations] = useState<ProductSummary[]>([]);
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [zoneRef, setZoneRef] = useState("");
  const [loadingZones, setLoadingZones] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (!isOpen || items.length) return;
    setRecommendations(
      [...demoProductSummaries].sort(() => Math.random() - 0.5).slice(0, 3),
    );
    setRecommendationIndex(0);
  }, [isOpen, items.length]);

  function addRecommendation(product: ProductSummary) {
    if (!product.previewVariantRef || !product.coverUrl) return;
    addItem({
      variantRef: product.previewVariantRef,
      productRef: product.ref,
      slug: product.slug,
      name: product.name,
      variantName: "Standard",
      imageUrl: product.coverUrl,
      priceMinor: product.priceMinorFrom,
      currency: product.currency,
      prices: Object.entries(product.pricesFrom ?? {}).map(
        ([priceCurrency, priceMinor]) => ({
          currency: priceCurrency,
          priceMinor,
        }),
      ),
      quantity: 1,
      needsDelivery: true,
    });
  }

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
            <svg
              className="cart-empty__icon"
              viewBox="0 0 148 146"
              aria-hidden="true"
            >
              <path
                d="M35.989 5.89692C36.3226 5.85693 37.113 5.8352 37.4563 5.83467C43.902 5.82467 50.3605 5.84337 56.8051 5.84163L96.5967 5.83274L116.007 5.82703C119.001 5.82606 124.585 5.66886 127.294 6.10721C130.208 6.60438 132.903 7.9724 135.024 10.0311C137.321 12.2773 138.822 15.2122 139.298 18.3895C139.759 21.3131 139.569 26.7586 139.575 29.8877L139.573 51.0456L139.572 105.234C139.572 114.051 139.409 123.445 139.574 132.209L95.7412 132.208L43.3912 132.193C31.4095 132.194 18.9064 132.004 6.97656 132.225C7.6132 129.774 9.29926 125.312 10.1233 122.8L15.3183 106.482C16.7407 102.147 18.0963 97.4304 19.4847 93.0635L29.583 61.1017L34.147 46.8862C34.2835 46.4734 34.4336 46.0471 34.5906 45.6421C35.7506 42.6485 36.6486 39.5025 37.4734 36.4014C36.4158 36.25 35.2821 36.1113 34.2443 35.8765C27.9258 34.4473 22.9924 29.0341 22.3903 22.5455C21.9897 18.4222 23.2568 14.3101 25.9087 11.1272C28.5871 7.92534 31.8389 6.27173 35.989 5.89692ZM13.9468 126.799C19.7817 126.595 26.6493 126.776 32.5633 126.777L68.7331 126.778L86.8771 126.769C88.4184 126.767 94.1463 126.666 95.4662 126.878C95.9301 124.463 96.8701 121.818 97.6143 119.445C104.767 96.6324 111.985 73.848 119.251 51.0697C120.722 46.458 122.888 40.9879 123.983 36.3441C117.941 36.6328 110.4 36.3853 104.231 36.3836L65.7632 36.381L49.3342 36.3964C48.0859 36.5125 43.392 36.5125 42.5429 36.3052C42.291 39.2819 40.2428 44.3167 39.3295 47.2499C35.7809 58.6465 32.188 70.0334 28.574 81.4108C26.9467 86.533 25.2963 91.672 23.6792 96.8125L17.2533 116.564C16.3011 119.446 15.3135 124.196 13.9468 126.799ZM122.715 11.3267C121.276 11.4972 120.844 11.7133 119.555 12.3829C112.524 16.0359 112.766 26.7524 120.11 29.8511C120.511 30.0203 121.078 30.5309 121.51 30.7106C122.831 31.0555 124.541 30.9642 125.909 30.9591C128.655 30.9561 131.462 30.927 134.203 30.9531C133.973 27.208 134.353 23.346 134.07 19.5943C133.89 17.2138 132.694 14.8908 130.924 13.2926C128.588 11.1836 125.656 11.2099 122.715 11.3267ZM112.4 11.1919C106.263 11.5609 98.0119 11.3336 91.7128 11.334L54.4818 11.3228L42.1266 11.3069C40.0552 11.1968 37.4509 11.1968 35.4104 11.4376C30.2408 12.0476 26.0608 18.9811 27.9654 23.8108C28.664 25.5826 29.8288 27.4703 31.3147 28.7135C31.8775 29.1805 32.504 29.5648 33.1754 29.855C36.0982 31.4286 39.802 30.9698 43.0967 30.9698L55.7854 30.9638L93.6694 30.9564L106.171 30.9548C108.227 30.9549 110.803 30.8845 112.83 30.9819C108.65 24.5359 107.451 20.203 111.468 13.0162C111.708 12.5869 112.885 11.3347 112.801 11.1716L112.4 11.1919ZM129.694 35.94C128.993 37.442 128.738 39.0976 128.182 40.6542C126.767 44.6168 125.636 48.6352 124.305 52.6248C123.819 54.0844 123.473 55.7759 122.981 57.2582L108.248 102.924L103.129 119.011C102.276 121.698 101.487 123.866 100.674 126.643C100.713 126.706 100.784 126.839 100.835 126.875C102.144 126.7 104.204 126.756 105.567 126.76L112.846 126.779C119.805 126.783 127.319 126.617 134.21 126.764C134.057 124.821 134.141 122.168 134.146 120.178L134.156 109.594C134.162 85.6388 134.158 61.6838 134.157 37.7287C134.157 37.2374 134.303 36.1799 134.026 35.879C132.85 35.8881 130.801 35.8391 129.694 35.94Z"
                fill="currentColor"
              />
            </svg>
            <h3>Your bag is quiet.</h3>
            <section
              className="empty-cart-recommendations"
              aria-label="You might like"
            >
              <div className="empty-cart-recommendations__heading">
                <h4>You might like</h4>
                <div className="empty-cart-recommendations__controls">
                  <button
                    type="button"
                    aria-label="Previous recommendation"
                    disabled={
                      recommendationIndex === 0 || recommendations.length < 2
                    }
                    onClick={() =>
                      setRecommendationIndex((index) => Math.max(0, index - 1))
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m15 5-7 7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next recommendation"
                    disabled={
                      recommendationIndex >= recommendations.length - 1 ||
                      recommendations.length < 2
                    }
                    onClick={() =>
                      setRecommendationIndex((index) =>
                        Math.min(recommendations.length - 1, index + 1),
                      )
                    }
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="m9 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="empty-cart-recommendations__viewport">
                <div
                  className="empty-cart-recommendations__list"
                  style={{
                    transform: `translateX(calc(-${recommendationIndex * 93}%)`,
                  }}
                >
                  {recommendations.map((product) => {
                    const displayPrice = resolvePrice(
                      product.priceMinorFrom,
                      product.currency,
                      Object.entries(product.pricesFrom ?? {}).map(
                        ([priceCurrency, priceMinor]) => ({
                          currency: priceCurrency,
                          priceMinor,
                        }),
                      ),
                      currency,
                    );

                    return (
                      <article
                        className="empty-cart-recommendation"
                        key={product.ref}
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          className="empty-cart-recommendation__image"
                        >
                          {product.coverUrl ? (
                            <Image
                              src={product.coverUrl}
                              alt={product.name}
                              fill
                              sizes="9rem"
                            />
                          ) : null}
                        </Link>
                        <div className="empty-cart-recommendation__details">
                          <Link href={`/products/${product.slug}`}>
                            <h5>{product.name}</h5>
                          </Link>
                          <span>
                            {formatMoney(
                              displayPrice.priceMinor,
                              displayPrice.currency,
                            )}
                          </span>
                          <button
                            type="button"
                            onClick={() => addRecommendation(product)}
                          >
                            <span className="empty-cart-recommendation__add-icon-wrap">
                              <svg
                                className="empty-cart-recommendation__add-icon empty-cart-recommendation__add-icon--plus"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                              <svg
                                className="empty-cart-recommendation__add-icon empty-cart-recommendation__add-icon--bag"
                                viewBox="0 0 148 146"
                                aria-hidden="true"
                              >
                                <path
                                  d="M35.989 5.89692C36.3226 5.85693 37.113 5.8352 37.4563 5.83467C43.902 5.82467 50.3605 5.84337 56.8051 5.84163L96.5967 5.83274L116.007 5.82703C119.001 5.82606 124.585 5.66886 127.294 6.10721C130.208 6.60438 132.903 7.9724 135.024 10.0311C137.321 12.2773 138.822 15.2122 139.298 18.3895C139.759 21.3131 139.569 26.7586 139.575 29.8877L139.573 51.0456L139.572 105.234C139.572 114.051 139.409 123.445 139.574 132.209L95.7412 132.208L43.3912 132.193C31.4095 132.194 18.9064 132.004 6.97656 132.225C7.6132 129.774 9.29926 125.312 10.1233 122.8L15.3183 106.482C16.7407 102.147 18.0963 97.4304 19.4847 93.0635L29.583 61.1017L34.147 46.8862C34.2835 46.4734 34.4336 46.0471 34.5906 45.6421C35.7506 42.6485 36.6486 39.5025 37.4734 36.4014C36.4158 36.25 35.2821 36.1113 34.2443 35.8765C27.9258 34.4473 22.9924 29.0341 22.3903 22.5455C21.9897 18.4222 23.2568 14.3101 25.9087 11.1272C28.5871 7.92534 31.8389 6.27173 35.989 5.89692ZM13.9468 126.799C19.7817 126.595 26.6493 126.776 32.5633 126.777L68.7331 126.778L86.8771 126.769C88.4184 126.767 94.1463 126.666 95.4662 126.878C95.9301 124.463 96.8701 121.818 97.6143 119.445C104.767 96.6324 111.985 73.848 119.251 51.0697C120.722 46.458 122.888 40.9879 123.983 36.3441C117.941 36.6328 110.4 36.3853 104.231 36.3836L65.7632 36.381L49.3342 36.3964C48.0859 36.5125 43.392 36.5125 42.5429 36.3052C42.291 39.2819 40.2428 44.3167 39.3295 47.2499C35.7809 58.6465 32.188 70.0334 28.574 81.4108C26.9467 86.533 25.2963 91.672 23.6792 96.8125L17.2533 116.564C16.3011 119.446 15.3135 124.196 13.9468 126.799ZM122.715 11.3267C121.276 11.4972 120.844 11.7133 119.555 12.3829C112.524 16.0359 112.766 26.7524 120.11 29.8511C120.511 30.0203 121.078 30.5309 121.51 30.7106C122.831 31.0555 124.541 30.9642 125.909 30.9591C128.655 30.9561 131.462 30.927 134.203 30.9531C133.973 27.208 134.353 23.346 134.07 19.5943C133.89 17.2138 132.694 14.8908 130.924 13.2926C128.588 11.1836 125.656 11.2099 122.715 11.3267ZM112.4 11.1919C106.263 11.5609 98.0119 11.3336 91.7128 11.334L54.4818 11.3228L42.1266 11.3069C40.0552 11.1968 37.4509 11.1968 35.4104 11.4376C30.2408 12.0476 26.0608 18.9811 27.9654 23.8108C28.664 25.5826 29.8288 27.4703 31.3147 28.7135C31.8775 29.1805 32.504 29.5648 33.1754 29.855C36.0982 31.4286 39.802 30.9698 43.0967 30.9698L55.7854 30.9638L93.6694 30.9564L106.171 30.9548C108.227 30.9549 110.803 30.8845 112.83 30.9819C108.65 24.5359 107.451 20.203 111.468 13.0162C111.708 12.5869 112.885 11.3347 112.801 11.1716L112.4 11.1919ZM129.694 35.94C128.993 37.442 128.738 39.0976 128.182 40.6542C126.767 44.6168 125.636 48.6352 124.305 52.6248C123.819 54.0844 123.473 55.7759 122.981 57.2582L108.248 102.924L103.129 119.011C102.276 121.698 101.487 123.866 100.674 126.643C100.713 126.706 100.784 126.839 100.835 126.875C102.144 126.7 104.204 126.756 105.567 126.76L112.846 126.779C119.805 126.783 127.319 126.617 134.21 126.764C134.057 124.821 134.141 122.168 134.146 120.178L134.156 109.594C134.162 85.6388 134.158 61.6838 134.157 37.7287C134.157 37.2374 134.303 36.1799 134.026 35.879C132.85 35.8881 130.801 35.8391 129.694 35.94Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                            Add to Bag
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
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
