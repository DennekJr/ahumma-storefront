import Image from "next/image";
import Link from "next/link";

type CommunityMedia = {
  src: string;
  alt: string;
  type: "image" | "video";
  poster?: string;
};

const communityMedia: CommunityMedia[] = [
  {
    src: "/videos/explore-media.webm",
    alt: "Ahumma body-care ritual in motion",
    type: "video",
    poster: "/images/love-your-skin.jpg",
  },
  {
    src: "/images/ara-ritual.jpg",
    alt: "Ara African black soap held against skin",
    type: "image",
  },
  {
    src: "/images/in-hand-dream-whip.jpg",
    alt: "A hand holding a jar of Dream Whip body butter against a warm sky",
    type: "image",
  },
  {
    src: "/images/in-hand-sika.jpg",
    alt: "A hand holding a jar of Sika body butter against a warm sky",
    type: "image",
  },
];

export function AboutCommunityGallery() {
  return (
    <div
      className="about-community__gallery"
      role="list"
      aria-label="Ahumma videos and campaign imagery"
    >
      {communityMedia.map((media) => (
        <div className="about-community__image" key={media.src} role="listitem">
          {media.type === "video" ? (
            <video
              src={media.src}
              poster={media.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={media.alt}
            />
          ) : (
            <Image src={media.src} alt={media.alt} fill sizes="320px" />
          )}
        </div>
      ))}
    </div>
  );
}

// About ends on the invitation alone. The gallery is the partner page's
// opening, and repeating it here showed the same four frames twice.
export function AboutCommunitySection() {
  return (
    <section
      className="about-community"
      aria-labelledby="about-community-title"
    >
      <div className="about-community__intro">
        <h2 id="about-community-title">Be the voice of the ritual.</h2>
        <p>
          Join Ahumma’s Creator Partner Network to create with us, earn
          commission, and bring body care rooted in Africa to the world.
        </p>
        <Link className="about-community__cta" href="/partner-network">
          Explore the partner program
        </Link>
      </div>
    </section>
  );
}
