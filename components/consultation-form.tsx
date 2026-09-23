"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  CONSULTATION_SAFETY_NOTICE,
  SKIN_CONCERNS,
} from "@/lib/consultation";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  concerns: string[];
  routine: string;
  products: string;
  texture: string;
  fragrance: string;
  goal: string;
  region: string;
  referral: string;
  marketingConsent: boolean;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  concerns: [],
  routine: "",
  products: "",
  texture: "",
  fragrance: "",
  goal: "",
  region: "",
  referral: "",
  marketingConsent: false,
};

export function ConsultationForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleConcern(concern: string) {
    update(
      "concerns",
      form.concerns.includes(concern)
        ? form.concerns.filter((item) => item !== concern)
        : [...form.concerns, concern],
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.message ?? "We couldn't send your consultation.");
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setError("We couldn't send your consultation. Please try again.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="consultation-success" role="status" aria-live="polite">
        <Check size={24} />
        <h2>We&apos;ll be in touch.</h2>
        <p>We&apos;ll use your answers to suggest a considered Ahumma ritual.</p>
      </div>
    );
  }

  return (
    <form className="consultation-form" onSubmit={submit}>
      <div className="consultation-form__grid">
        <label>
          <span>First name</span>
          <input
            name="firstName"
            value={form.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            autoComplete="given-name"
            required
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            name="lastName"
            value={form.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            autoComplete="family-name"
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>Country or region</span>
          <input
            name="region"
            value={form.region}
            onChange={(event) => update("region", event.target.value)}
            autoComplete="country-name"
          />
        </label>
      </div>

      <fieldset>
        <legend>What would you like help with?</legend>
        <div className="consultation-form__options">
          {SKIN_CONCERNS.map((concern) => (
            <label key={concern}>
              <input
                type="checkbox"
                checked={form.concerns.includes(concern)}
                onChange={() => toggleConcern(concern)}
              />
              <span>{concern}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="consultation-form__grid">
        <label>
          <span>What are you using now?</span>
          <textarea
            name="routine"
            value={form.routine}
            onChange={(event) => update("routine", event.target.value)}
            rows={4}
          />
        </label>
        <label>
          <span>Products you currently use</span>
          <textarea
            name="products"
            value={form.products}
            onChange={(event) => update("products", event.target.value)}
            rows={4}
          />
        </label>
        <label>
          <span>Preferred texture</span>
          <select
            name="texture"
            value={form.texture}
            onChange={(event) => update("texture", event.target.value)}
          >
            <option value="">Choose one</option>
            <option>Lightweight</option>
            <option>Rich and buttery</option>
            <option>Either is fine</option>
          </select>
        </label>
        <label>
          <span>Fragrance preference</span>
          <select
            name="fragrance"
            value={form.fragrance}
            onChange={(event) => update("fragrance", event.target.value)}
          >
            <option value="">Choose one</option>
            <option>Fragrant</option>
            <option>Subtle fragrance</option>
            <option>Fragrance-free</option>
            <option>No preference</option>
          </select>
        </label>
        <label>
          <span>Main care goal</span>
          <textarea
            name="goal"
            value={form.goal}
            onChange={(event) => update("goal", event.target.value)}
            rows={3}
          />
        </label>
        <label>
          <span>How did you hear about Ahumma?</span>
          <input
            name="referral"
            value={form.referral}
            onChange={(event) => update("referral", event.target.value)}
          />
        </label>
      </div>

      <label className="consultation-form__consent">
        <input
          type="checkbox"
          checked={form.marketingConsent}
          onChange={(event) => update("marketingConsent", event.target.checked)}
        />
        <span>Keep me updated with Ahumma news and new rituals.</span>
      </label>

      <p className="consultation-form__safety">{CONSULTATION_SAFETY_NOTICE}</p>
      {error ? <p className="consultation-form__error" role="alert">{error}</p> : null}
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send my consultation"}
      </button>
    </form>
  );
}
