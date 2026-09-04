import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, MoveRight, Sparkles } from "lucide-react";
import { connection } from "next/server";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProducts, hasFrontdeskKeys } from "@/lib/frontdesk";

export default async function HomePage() {
  await connection();
  const products = await getProducts();
  const productHref = (...names: string[]) => {
    const match = products.find((product) =>
      names.some((name) => product.name.toLowerCase().includes(name)),
    );

    return match ? `/products/${match.slug}` : "/#shop";
  };

  return (
    <main>
      <div className="announcement-bar">
        <span>Complimentary Lagos delivery on orders over ₦60,000</span>
        <span className="announcement-desktop">Made in Lagos · Shipping worldwide</span>
      </div>

      <section className="home-hero">
        <SiteHeader light />
        <Image className="hero-sky" src="/images/hero-sky.jpeg" alt="" fill loading="eager" fetchPriority="high" sizes="100vw" />
        <video
          className="hero-sky-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-sky.jpeg"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/videos/hero-clouds.mp4" type="video/mp4" />
        </video>
        <div className="hero-haze" />
        <Image className="hero-wordmark" src="/images/hero-wordmark.png" alt="Ahumma" width={2560} height={547} loading="eager" />
        <div className="hero-woman-shell">
          <Image
            className="hero-woman"
            src="/images/hero-woman.png"
            alt="A woman pausing in a moment of calm"
            width={1411}
            height={1800}
            loading="eager"
            sizes="(max-width: 780px) 100vw, (max-width: 1050px) 72vw, 760px"
          />
        </div>
        <div className="hero-copy">
          <span className="eyebrow eyebrow--light">Made for the skin you live in</span>
          <h1>At the edge of everything beautiful is you.</h1>
          <Link href="#shop" className="hero-link">Explore the collection <ArrowRight size={17} /></Link>
        </div>
        <Link href="#philosophy" className="hero-scroll" aria-label="Read the Ahumma philosophy">
          <ArrowDown size={20} />
        </Link>
        <div className="hero-note">Plant-powered care<br />for every body</div>
      </section>

      <section className="philosophy-section" id="philosophy">
        <div className="section-number">01</div>
        <div className="philosophy-heading">
          <span className="eyebrow">The Ahumma philosophy</span>
          <h2>Skin care, as<br />an act of return.</h2>
        </div>
        <div className="philosophy-copy">
          <p>We make high-performance body care with African botanicals—designed to bring you back to softness, back to radiance, back to yourself.</p>
          <Link href="#ritual" className="underlined-link">Discover our approach <MoveRight size={18} /></Link>
        </div>
      </section>

      <section className="love-skin-section" id="love-your-skin" aria-labelledby="love-your-skin-title">
        <Image
          className="love-skin__image"
          src="/images/love-your-skin.jpg"
          alt="A woman enjoying an Ahumma body-care ritual"
          fill
          sizes="100vw"
        />
        <div className="love-skin__overlay" aria-hidden="true" />
        <div className="love-skin__content">
          <h2 id="love-your-skin-title">Love your skin</h2>
          <p className="love-skin__lead">Your skin tells your story — nourish it, honor it, and let it glow.</p>
          <p className="love-skin__body">Indulge in rich, plant-powered body butters designed to deeply hydrate, smooth, and restore your natural radiance. From softening rough patches to enhancing your glow, every application is an act of self-love.</p>
          <Link href="#shop" className="love-skin__cta">Shop now <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading shop-heading">
          <div>
            <span className="eyebrow">The essentials</span>
            <h2>Care you&apos;ll<br />return to.</h2>
          </div>
          <p>A considered collection. Each formula is made to work deeply, feel beautiful and earn its place in your daily ritual.</p>
        </div>

        {!hasFrontdeskKeys ? (
          <div className="api-preview-note">
            <Sparkles size={15} />
            <span><strong>Store preview</strong> — Ahumma&apos;s current collection is shown while the Frontdesk keys are pending.</span>
          </div>
        ) : null}

        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard product={product} index={index} key={product.ref} />
          ))}
        </div>
      </section>

      <section className="concerns-section" id="concerns">
        <div className="concerns-intro">
          <span className="section-number">02</span>
          <span className="eyebrow">Shop by concern</span>
          <h2>What does your skin<br />need today?</h2>
        </div>
        <div className="concern-grid">
          <Link href={productHref("ara")} className="concern-card concern-card--wide">
            <Image src="/images/ara-ritual.jpg" alt="Ahumma body-care ritual" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <span><small>01</small> Uneven tone <ArrowRight size={17} /></span>
          </Link>
          <Link href={productHref("dream whip", "dream")} className="concern-card">
            <Image src="/images/dream-ritual.jpg" alt="Dream Whip body butter ritual" fill sizes="(max-width: 800px) 100vw, 25vw" />
            <span><small>02</small> Dryness <ArrowRight size={17} /></span>
          </Link>
          <Link href={productHref("sika", "sike")} className="concern-card">
            <Image src="/images/sika-ritual.jpg" alt="Sika body butter ritual" fill sizes="(max-width: 800px) 100vw, 25vw" />
            <span><small>03</small> Rough texture <ArrowRight size={17} /></span>
          </Link>
        </div>
      </section>

      <section className="ritual-section" id="ritual">
        <div className="ritual-image">
          <Image src="/images/skin-closeup.jpg" alt="Healthy, luminous skin" fill sizes="(max-width: 800px) 100vw, 50vw" />
          <span className="image-caption">Ahumma / Lagos, Nigeria</span>
        </div>
        <div className="ritual-copy">
          <span className="eyebrow eyebrow--light">Your body is a home</span>
          <h2>Make a ritual<br />of coming back.</h2>
          <p>Begin with a gentle cleanse. Press moisture into damp skin. Take your time. Our formulas are concentrated, sensorial and made to meet your body where it is.</p>
          <div className="ritual-steps">
            <div><span>01</span><strong>Cleanse</strong><small>Clarify without stripping</small></div>
            <div><span>02</span><strong>Nourish</strong><small>Seal in lasting comfort</small></div>
            <div><span>03</span><strong>Glow</strong><small>Return to your radiance</small></div>
          </div>
          <Link href="#shop" className="light-link">Build your ritual <ArrowRight size={17} /></Link>
        </div>
      </section>

      <section className="made-section">
        <div className="made-copy">
          <span className="eyebrow">Rooted here</span>
          <h2>African botanicals.<br />Modern formulation.<br />Made in Lagos.</h2>
        </div>
        <div className="made-principles">
          <p>We choose hardworking plant oils and butters for what they do, not only where they come from.</p>
          <div className="principle-list">
            <span>Shea butter</span><span>Jojoba oil</span><span>Cocoa pod ash</span><span>Mango butter</span>
          </div>
        </div>
      </section>

      <section className="closing-quote">
        <p>“Your skin tells your story—nourish it, honour it, and let it glow.”</p>
        <span>Ahumma</span>
      </section>

      <SiteFooter />
    </main>
  );
}
