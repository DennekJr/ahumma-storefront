"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type CircleSignupProps = {
  className?: string;
  buttonLabel?: string;
  showArrow?: boolean;
};

export function CircleSignup({
  className = "",
  buttonLabel = "Join us",
  showArrow = true,
}: CircleSignupProps) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.message ?? "We couldn't add you just now.");
        return;
      }

      setDone(true);
    } catch {
      setError("We couldn't add you just now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <p className="circle-form__done" role="status" aria-live="polite">
        <Check size={17} /> You&apos;re in. Beautiful things are coming.
      </p>
    );
  }

  return (
    <form
      className={`circle-form${className ? ` ${className}` : ""}`}
      onSubmit={handleSubmit}
    >
      <label className="circle-form__field">
        <span className="visually-hidden">Email address</span>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email address"
          required
        />
      </label>

      <div className="circle-form__hidden" aria-hidden="true">
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

      <button type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : buttonLabel}
        {showArrow ? <ArrowRight size={16} /> : null}
      </button>

      {error ? (
        <p className="circle-form__error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
