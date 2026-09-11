"use client";

import { useEffect, useState } from "react";

const COOKIE_NOTICE_KEY = "ahumma-cookie-notice-dismissed";
const PRIVACY_POLICY_URL = "https://ahumma.com/privacy-policy/";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    setVisible(window.localStorage.getItem(COOKIE_NOTICE_KEY) !== "true");
    setHasCheckedStorage(true);
  }, []);

  if (!hasCheckedStorage || !visible) {
    return null;
  }

  const dismiss = () => {
    window.localStorage.setItem(COOKIE_NOTICE_KEY, "true");
    setVisible(false);
  };

  return (
    <aside className="cookie-notice" aria-label="Cookie notice">
      <p>
        This site uses <a href={PRIVACY_POLICY_URL}>cookies</a>.
      </p>
      <button type="button" onClick={dismiss}>
        Accept
      </button>
    </aside>
  );
}
