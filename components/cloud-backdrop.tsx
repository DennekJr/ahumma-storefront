/**
 * The drifting-cloud backdrop, as used behind the homepage hero.
 *
 * Decorative only: muted, looping, aria-hidden and out of the tab order, with
 * the hero still as its poster so the first paint is an image rather than a
 * grey box. `preload="metadata"` because unlike the homepage this is never the
 * first thing a visitor sees — the frames can arrive a moment late.
 *
 * Under prefers-reduced-motion the CSS hides the video and leaves the poster
 * showing, so the section keeps its backdrop without the movement.
 */
export function CloudBackdrop() {
  return (
    <div className="cloud-backdrop" aria-hidden="true">
      <video
        className="cloud-backdrop__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-sky.jpeg"
        tabIndex={-1}
      >
        <source src="/videos/hero-clouds.mp4" type="video/mp4" />
      </video>
      <div className="cloud-backdrop__scrim" />
    </div>
  );
}
