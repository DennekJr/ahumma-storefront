"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type CircleSignupProps = {
  className?: string;
  buttonLabel?: string;
  showArrow?: boolean;
  showFirstName?: boolean;
  consultationOptions?: string[];
  onSuccess?: () => void;
};

export function CircleSignup({
  className = "",
  buttonLabel = "Join us",
  showArrow = true,
  showFirstName = false,
  consultationOptions = [],
  onSuccess,
}: CircleSignupProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
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
        body: JSON.stringify({ email, name, honeypot }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.message ?? "We couldn't add you just now.");
        return;
      }

      onSuccess?.();
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
      {showFirstName ? (
        <label className="circle-form__field circle-form__name">
          <span className="visually-hidden">First name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            name="name"
            autoComplete="given-name"
            placeholder="First name"
          />
        </label>
      ) : null}

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

      {consultationOptions.length ? (
        <div className="circle-form__consultation">
          <div>What would you like help with?</div>
          {consultationOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="interests"
                value={option}
                checked={interests.includes(option)}
                onChange={() =>
                  setInterests((current) =>
                    current.includes(option)
                      ? current.filter((item) => item !== option)
                      : [...current, option],
                  )
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : null}

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
