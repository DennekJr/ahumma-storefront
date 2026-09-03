export default function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite" aria-label="Loading the next page">
      <span className="route-loading__progress" aria-hidden="true" />
      <div className="route-loading__content">
        <span className="route-loading__wordmark">Ahumma</span>
        <span className="route-loading__pulse" aria-hidden="true" />
        <span className="eyebrow">Preparing your ritual</span>
      </div>
    </div>
  );
}
