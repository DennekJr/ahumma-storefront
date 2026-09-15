"use client";

import { useEffect, useState } from "react";

const PREVIEW_NOTICE_KEY = "ahumma-preview-notice-dismissed";

type PreviewNoticeProps = {
  visible: boolean;
};

export function PreviewNotice({ visible: shouldShow }: PreviewNoticeProps) {
  const [visible, setVisible] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  useEffect(() => {
    setVisible(
      shouldShow && window.localStorage.getItem(PREVIEW_NOTICE_KEY) !== "true",
    );
    setHasCheckedStorage(true);
  }, [shouldShow]);

  if (!hasCheckedStorage || !visible) {
    return null;
  }

  const dismiss = () => {
    window.localStorage.setItem(PREVIEW_NOTICE_KEY, "true");
    setVisible(false);
  };

  return (
    <aside className="preview-notice" aria-label="Store preview notice">
      <p>Store preview mode</p>
      <button type="button" onClick={dismiss}>
        Dismiss
      </button>
    </aside>
  );
}
