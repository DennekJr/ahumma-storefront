import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div>
        <span>404</span>
        <h1>This ritual moved.</h1>
        <p>The page may have changed, or this formulation is no longer part of the collection.</p>
        <Link href="/#shop">Return to the collection</Link>
      </div>
    </main>
  );
}
