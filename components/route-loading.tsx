/**
 * The branded route transition.
 *
 * Kept as a component rather than a root `app/loading.tsx`: a loading boundary
 * at the root wraps every child segment, and the streamed shell commits an
 * HTTP 200 before the page resolves — so a missing product answered 200
 * instead of 404. Segments opt in individually, and only where the route
 * cannot call notFound().
 */
export function RouteLoading() {
  return (
    <div
      className="route-loading"
      role="status"
      aria-live="polite"
      aria-label="Loading the next page"
    >
      <span className="route-loading__progress" aria-hidden="true" />
      <div className="route-loading__content">
        <span className="route-loading__wordmark">Ahumma</span>
        <span className="route-loading__pulse" aria-hidden="true" />
        <span className="eyebrow">Preparing your ritual</span>
      </div>
    </div>
  );
}
