"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { CONTENT_CATEGORIES } from "@/lib/partner-network";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  categories: string[];
  platformLinks: string;
  contentLinks: string;
  motivation: string;
  otherBrands: string;
  monthlyCommitment: string;
  disclosureAgreement: boolean;
  codeOfConduct: boolean;
  slaAgreed: boolean;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  categories: [],
  platformLinks: "",
  contentLinks: "",
  motivation: "",
  otherBrands: "",
  monthlyCommitment: "",
  disclosureAgreement: false,
  codeOfConduct: false,
  slaAgreed: false,
};

const COMMITMENT_OPTIONS = ["3 a month", "4–5 a month", "6+ a month"];

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

  /** Everything the browser cannot enforce on its own. */
  function firstProblem() {
    if (!form.categories.length) return "Choose at least one content category.";
    if (!form.slaAgreed)
      return "Please read and accept the Service Level Agreement.";
    return "";
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const problem = firstProblem();

    if (problem) {
      setErrorMessage(problem);
      return;
    }

    setErrorMessage("");
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
      <div
        className="partner-form partner-form--success"
        role="status"
        aria-live="polite"
      >
        <span className="partner-form__tick" aria-hidden="true">
          <Check size={26} />
        </span>
        <p>{successMessage}</p>
        <p className="partner-form__aside">
          Applications are reviewed by the Partner Network Manager. Keep an eye
          on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form className="partner-form" onSubmit={handleSubmit}>
      <fieldset className="partner-step">
        <legend>
          <span className="partner-step__index">01</span> About you
        </legend>
        <div className="partner-form-grid">
          <label className="partner-field">
            <span>First name</span>
            <input
              value={form.firstName}
              onChange={(event) => set("firstName", event.target.value)}
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
            />
          </label>
          <label className="partner-field">
            <span>Last name</span>
            <input
              value={form.lastName}
              onChange={(event) => set("lastName", event.target.value)}
              name="lastName"
              type="text"
              autoComplete="family-name"
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
              placeholder="+234…"
              required
            />
          </label>
        </div>
      </fieldset>

      <fieldset className="partner-step">
        <legend>
          <span className="partner-step__index">02</span> Your work
        </legend>

        <div className="partner-categories">
          <span className="partner-field__label">
            Content category
            <em>choose all that apply</em>
          </span>
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
                <span className="partner-category__tick" aria-hidden="true">
                  <Check size={13} />
                </span>
                <span>{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="partner-form-grid partner-form-grid--two">
          <label className="partner-field">
            <span>Links to your top 2 platforms</span>
            <input
              value={form.platformLinks}
              onChange={(event) => set("platformLinks", event.target.value)}
              name="platformLinks"
              type="text"
              placeholder="instagram.com/you, tiktok.com/@you"
              required
            />
          </label>
          <label className="partner-field">
            <span>Links to 2 pieces you&apos;re most proud of</span>
            <input
              value={form.contentLinks}
              onChange={(event) => set("contentLinks", event.target.value)}
              name="contentLinks"
              type="text"
              placeholder="Paste two links"
              required
            />
          </label>
        </div>

        <div className="partner-form-split">
          <label className="partner-field">
            <span>Why do you want to join the Ahumma Creator Partner Network?</span>
            <textarea
              value={form.motivation}
              onChange={(event) => set("motivation", event.target.value)}
              name="motivation"
              rows={6}
              placeholder="Tell us in your own words."
              required
            />
          </label>

          <div className="partner-form-split__aside">
            <div className="partner-categories">
              <span className="partner-field__label">
                Content you can commit to each month
              </span>
              <div className="partner-category-options">
                {COMMITMENT_OPTIONS.map((option) => (
                  <label
                    className={`partner-category${form.monthlyCommitment === option ? " is-selected" : ""}`}
                    key={option}
                  >
                    <input
                      type="radio"
                      name="monthlyCommitment"
                      value={option}
                      checked={form.monthlyCommitment === option}
                      onChange={() => set("monthlyCommitment", option)}
                      required
                    />
                    <span className="partner-category__tick" aria-hidden="true">
                      <Check size={13} />
                    </span>
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="partner-field partner-select">
              <span>Working with any other skincare brands?</span>
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
          </div>
        </div>
      </fieldset>

      <fieldset className="partner-step">
        <legend>
          <span className="partner-step__index">03</span> Agreements
        </legend>

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

          <label
            className={`partner-checkbox partner-checkbox--sla${form.slaAgreed ? " is-signed" : ""}`}
          >
            <input
              type="checkbox"
              name="slaAgreed"
              checked={form.slaAgreed}
              onChange={(event) => set("slaAgreed", event.target.checked)}
              required
            />
            <span className="partner-checkbox__box" aria-hidden="true">
              <Check size={13} />
            </span>
            <span>
              <strong>
                <ShieldCheck size={14} /> I have read and accept the Service
                Level Agreement
              </strong>
              <em>
                Both sides&apos; commitments, above. Applications cannot be sent
                without it.
              </em>
            </span>
          </label>
        </div>
      </fieldset>

      <div className="partner-form__hidden" aria-hidden="true">
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

      <div className="partner-form__actions">
        <button className="partner-submit" type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Submit application"}{" "}
          <ArrowRight size={17} />
        </button>
        <p className="partner-form__note">
          Your application goes straight to the Partner Network Manager.
        </p>
      </div>

      {errorMessage ? (
        <p className="partner-form__error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
