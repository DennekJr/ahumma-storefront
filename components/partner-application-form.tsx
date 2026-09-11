"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CONTENT_CATEGORIES } from "@/lib/partner-network";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  categories: string[];
  primaryPlatform: string;
  platformLinks: string;
  contentLinks: string;
  motivation: string;
  otherBrands: string;
  monthlyCommitment: string;
  disclosureAgreement: boolean;
  codeOfConduct: boolean;
};

const EMPTY: FormState = {
  fullName: "",
  email: "",
  phone: "",
  categories: [],
  primaryPlatform: "",
  platformLinks: "",
  contentLinks: "",
  motivation: "",
  otherBrands: "",
  monthlyCommitment: "",
  disclosureAgreement: false,
  codeOfConduct: false,
};

export function PartnerApplicationForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleCategory(id: string) {
    setForm((current) => ({
      ...current,
      categories: current.categories.includes(id)
        ? current.categories.filter((value) => value !== id)
        : [...current.categories, id],
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage("");

    if (!form.categories.length) {
      setErrorMessage("Choose at least one content category.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/partner-network", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          honeypot,
          elapsedMs: openedAt.current ? Date.now() - openedAt.current : undefined,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setErrorMessage(
          result?.message ?? "We couldn't send your application. Please try again.",
        );
        return;
      }

      setSuccessMessage(
        result?.thankYouMessage ||
          "Thanks for applying. We'll be in touch about next steps.",
      );
    } catch {
      setErrorMessage("We couldn't send your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div className="partner-form partner-form--success" role="status" aria-live="polite">
        <Check size={22} />
        <p>{successMessage}</p>
      </div>
    );
  }

  return (
    <form className="partner-form" onSubmit={handleSubmit}>
      <div className="partner-form-grid">
        <label className="partner-field">
          <span>Full name</span>
          <input
            value={form.fullName}
            onChange={(event) => set("fullName", event.target.value)}
            name="fullName"
            type="text"
            autoComplete="name"
            required
          />
        </label>
        <label className="partner-field">
          <span>Email</span>
          <input
            value={form.email}
            onChange={(event) => set("email", event.target.value)}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="partner-field">
          <span>Phone / WhatsApp</span>
          <input
            value={form.phone}
            onChange={(event) => set("phone", event.target.value)}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </label>
        <label className="partner-field">
          <span>Content you can commit to each month</span>
          <input
            value={form.monthlyCommitment}
            onChange={(event) => set("monthlyCommitment", event.target.value)}
            name="monthlyCommitment"
            type="text"
            placeholder="e.g. 4 pieces"
            required
          />
        </label>
      </div>

      <fieldset className="partner-categories">
        <legend>Content category — choose all that apply</legend>
        <div className="partner-category-options">
          {CONTENT_CATEGORIES.map((category) => (
            <label
              className={`partner-category${form.categories.includes(category.id) ? " is-selected" : ""}`}
              key={category.id}
            >
              <input
                type="checkbox"
                name="categories"
                value={category.id}
                checked={form.categories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
              />
              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="partner-field partner-field--wide">
        <span>Primary platform, handle and follower count</span>
        <input
          value={form.primaryPlatform}
          onChange={(event) => set("primaryPlatform", event.target.value)}
          name="primaryPlatform"
          type="text"
          placeholder="e.g. Instagram, @yourhandle, 12k"
          required
        />
      </label>

      <label className="partner-field partner-field--wide">
        <span>Links to your top 2 platforms</span>
        <input
          value={form.platformLinks}
          onChange={(event) => set("platformLinks", event.target.value)}
          name="platformLinks"
          type="text"
          required
        />
      </label>

      <label className="partner-field partner-field--wide">
        <span>Links to 2 pieces of content you're most proud of</span>
        <input
          value={form.contentLinks}
          onChange={(event) => set("contentLinks", event.target.value)}
          name="contentLinks"
          type="text"
          required
        />
      </label>

      <label className="partner-field partner-field--wide">
        <span>Why do you want to join the Ahumma Creator Partner Network?</span>
        <textarea
          value={form.motivation}
          onChange={(event) => set("motivation", event.target.value)}
          name="motivation"
          rows={5}
          required
        />
      </label>

      <label className="partner-field partner-field--wide partner-select">
        <span>Are you currently working with any other skincare brands?</span>
        <select
          value={form.otherBrands}
          onChange={(event) => set("otherBrands", event.target.value)}
          name="otherBrands"
        >
          <option value="">Prefer not to say</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <div className="partner-agreements">
        <label className="partner-checkbox">
          <input
            type="checkbox"
            name="disclosureAgreement"
            checked={form.disclosureAgreement}
            onChange={(event) => set("disclosureAgreement", event.target.checked)}
            required
          />
          <span className="partner-checkbox__box" aria-hidden="true">
            <Check size={13} />
          </span>
          <span>
            I agree to disclose gifted and paid partnerships in line with FTC
            (US) and Nigerian guidelines.
          </span>
        </label>
        <label className="partner-checkbox">
          <input
            type="checkbox"
            name="codeOfConduct"
            checked={form.codeOfConduct}
            onChange={(event) => set("codeOfConduct", event.target.checked)}
            required
          />
          <span className="partner-checkbox__box" aria-hidden="true">
            <Check size={13} />
          </span>
          <span>I agree to the Partner Code of Conduct.</span>
        </label>
      </div>

      <div className="partner-hidden-field" aria-hidden="true">
        <input
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          type="text"
          name="fd_ref_code"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore=""
          data-form-type="other"
        />
      </div>

      <button className="partner-form__submit" type="submit" disabled={submitting}>
        {submitting ? "Sending your application…" : "Submit application"}
        <ArrowRight size={17} />
      </button>

      {errorMessage ? (
        <p className="partner-form__status is-error" role="alert">
          {errorMessage}
        </p>
      ) : (
        <p className="partner-form__status" role="note">
          Your application goes straight to the Partner Network Manager.
        </p>
      )}
    </form>
  );
}
