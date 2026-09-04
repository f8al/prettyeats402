<script setup>
import { site, socials, hours } from '../data/site'
import SocialIcon from '../components/SocialIcon.vue'
import familyPhoto from '../assets/images/family.webp'
import ownerTalking from '../assets/images/owner-cutout.webp'
import ownerStanding from '../assets/images/owner-portrait.webp'

// The footer already carries the full hours table, so the page only needs the
// one human detail out of it: the day the truck doesn't roll.
const restDay = hours.find((row) => !row.open)?.days ?? 'Sunday'

const values = [
  {
    n: '01',
    title: 'Fresh, or not at all',
    body: "It's on the apron for a reason. Nothing sits under a lamp waiting for you to show up — you order it, we cook it, you eat it hot. That's the whole system. We're not looking for a faster one.",
  },
  {
    n: '02',
    title: 'Family runs the window',
    body: "The people taking your order are the people who own the truck. No manager to ask, no corporate to call. If it's good, we made it good. If it's not, you're telling us to our face, and we'd rather have it that way.",
  },
  {
    n: '03',
    title: 'Hustle, heat, flavor',
    body: "That's what this is built on. Big portions, bold seasoning, no shortcuts and nothing apologized for. We didn't roll a truck out here to make food that's just fine.",
  },
]
</script>

<template>
  <div class="about">
    <!-- ---------------- HERO ---------------- -->
    <section class="hero">
      <div class="glow glow-red" aria-hidden="true"></div>

      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow rise d0">Our Story</p>

          <h1 class="hero-title rise d1">
            <span class="hero-title-line">We cook like we’re</span>
            <span class="hero-title-line text-gradient">feeding family</span>
          </h1>

          <p class="lead rise d2">
            Because six days a week, that’s exactly who’s in the truck. Pretty’s Eats is a
            Black-owned, family-run food truck in Omaha, Nebraska — loaded rice bowls and loaded
            baked potatoes, done our way. Hearty. Soulful. Made when you order it, not before.
          </p>

          <ul class="fact-row rise d3">
            <li class="pill"><SocialIcon name="pin" :size="15" />{{ site.city }}</li>
            <li class="pill">Black-owned &amp; family-run</li>
            <li class="pill"><SocialIcon name="clock" :size="15" />Open six days a week</li>
          </ul>
        </div>

        <figure class="hero-figure rise d2">
          <img
            :src="familyPhoto"
            class="hero-img"
            width="1400"
            height="2471"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            alt="The Pretty’s Eats family — five of them arm in arm — in front of their white food truck: two women, two men and a young boy, with the owner in a red shirt and a black apron reading FRESH standing in the middle."
          />
          <figcaption class="hero-badge">
            <span class="hero-badge-dot" aria-hidden="true"></span>
            The whole crew, one window
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- ---------------- BAND ---------------- -->
    <div class="band">
      <p class="band-text">Hustle <span aria-hidden="true">·</span> Heat <span aria-hidden="true">·</span> Straight-up flavor</p>
    </div>

    <!-- ---------------- STORY ---------------- -->
    <section class="section story">
      <div class="container story-grid">
        <div class="story-copy">
          <p class="eyebrow reveal">Who we are</p>
          <h2 class="story-title reveal">One truck. One family. One window.</h2>

          <div class="prose">
            <p class="reveal">
              We’re Black-owned and family-run, cooking out of a truck in Omaha, Nebraska. Not a
              chain. Not a franchise. Not somebody’s third location. Just us and a
              menu we actually eat ourselves.
            </p>
            <p class="reveal">
              What comes out of that window is loaded rice bowls, loaded baked potatoes and loaded
              nachos, built the way you want them. Steak, chicken, shrimp, chili, sausage, pork
              asada, black bean. Four toppings on the house. Hearty, soulful, and full of love —
              and that last part is easy to mean when it’s your own family in the truck with you.
              Then the cold side to sit next to it: shake-up lemonades, smoothies, milkshakes, snow
              cones, root beer floats.
            </p>
            <p class="reveal">
              Every meal we make is fresh, bold, and meant to bring people together. That isn’t a
              line we painted on the truck. It’s the actual reason to cook for strangers. You hand
              somebody a hot bowl and for ten minutes the day gets easier.
            </p>
          </div>
        </div>

        <figure class="story-figure reveal">
          <img
            :src="ownerTalking"
            class="story-img"
            width="800"
            height="1422"
            loading="lazy"
            decoding="async"
            alt="The owner of Pretty’s Eats mid-sentence outside the truck in a red shirt and black apron, the round neon Pretty’s Eats eye-and-fork logo painted on the truck behind him."
          />
          <figcaption>Same face at the window every time you come back.</figcaption>
        </figure>
      </div>

      <div class="container">
        <figure class="pullquote reveal">
          <blockquote>
            <p>
              Food isn’t just something you eat —
              <span class="text-gradient">it’s something you feel.</span>
            </p>
          </blockquote>
          <figcaption>How we’ve always seen it</figcaption>
        </figure>
      </div>
    </section>

    <!-- ---------------- VALUES ---------------- -->
    <section class="section values">
      <div class="container">
        <p class="eyebrow reveal">What we stand for</p>
        <h2 class="values-title reveal">Three things we don’t bend on</h2>

        <ul class="values-grid">
          <li v-for="value in values" :key="value.n" class="card value-card reveal">
            <span class="value-num" aria-hidden="true">{{ value.n }}</span>
            <h3 class="value-title">{{ value.title }}</h3>
            <p class="value-body">{{ value.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ---------------- OWNER ---------------- -->
    <section class="section owner">
      <div class="container owner-grid">
        <figure class="owner-figure reveal">
          <div class="owner-plate" aria-hidden="true"></div>
          <img
            :src="ownerStanding"
            class="owner-img"
            width="700"
            height="1049"
            loading="lazy"
            decoding="async"
            alt="The owner of Pretty’s Eats standing with his arms crossed, wearing a red shirt and a black apron."
          />
          <figcaption class="owner-caption">Hustle, heat, and straight-up flavor.</figcaption>
        </figure>

        <div class="owner-copy">
          <p class="eyebrow reveal">The one in charge</p>
          <h2 class="owner-title reveal">You’ll know him by the red shirt</h2>
          <div class="prose">
            <p class="reveal">
              Red shirt, black apron, arms folded, truck behind him. He’s in that window six days a
              week — and he calls this the most based food truck in Omaha. Not as a joke. As a
              standard he has to cook up to every single service.
            </p>
            <p class="reveal">
              Hustle, heat, and straight-up flavor. That’s the promise, and it’s a short one on
              purpose. Roll up on a Saturday and let him prove it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ---------------- CTA ---------------- -->
    <section class="section cta">
      <div class="glow glow-gold" aria-hidden="true"></div>
      <div class="container cta-inner">
        <h2 class="cta-title reveal">Come find the truck</h2>
        <p class="cta-lead reveal">
          At Pretty’s Eats we believe in the power of good food. So don’t take our word for it —
          pull up hungry, get it loaded, and find out what the noise is about.
        </p>

        <div class="cta-actions reveal">
          <RouterLink to="/menu" class="btn btn-primary">
            See the menu
            <SocialIcon name="arrow" :size="18" />
          </RouterLink>
          <a :href="site.phoneHref" class="btn btn-outline">
            <SocialIcon name="phone" :size="18" />
            {{ site.phone }}
          </a>
        </div>

        <p class="cta-note reveal">Six days a week. {{ restDay }} we rest.</p>

        <div class="cta-social reveal">
          <p class="cta-social-label">Follow the truck</p>
          <ul class="social-row">
            <li v-for="social in socials" :key="social.label">
              <a
                class="social-link"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="`${social.label} — ${social.handle} (opens in a new tab)`"
              >
                <SocialIcon :name="social.icon" :size="18" />
                <span>{{ social.label }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about {
  /* `clip` (not `hidden`) so the decorative glows can't cause sideways scroll
     without turning this into a scroll container and killing position: sticky. */
  overflow-x: clip;
}

/* ---------- shared ---------- */

.prose p + p {
  margin-top: var(--space-4);
}

.prose p {
  color: var(--color-text-dim);
  font-size: clamp(1rem, 0.96rem + 0.35vw, 1.12rem);
  line-height: 1.72;
}

.glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(10px);
  z-index: 0;
}

.glow-red {
  top: -160px;
  right: -180px;
  width: 460px;
  height: 460px;
  background: radial-gradient(circle, rgba(255, 35, 64, 0.22) 0%, rgba(255, 35, 64, 0) 68%);
}

.glow-gold {
  bottom: -220px;
  left: -180px;
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(255, 176, 32, 0.16) 0%, rgba(255, 176, 32, 0) 68%);
}

/* ---------- hero ---------- */

.hero {
  position: relative;
  padding-block: var(--space-7) var(--space-8);
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--space-6);
}

.hero-title {
  margin-top: var(--space-4);
  font-size: clamp(2.4rem, 11vw, 4.25rem);
  line-height: 0.94;
  overflow-wrap: break-word;
}

.hero-title-line {
  display: block;
}

.lead {
  margin-top: var(--space-5);
  max-width: 56ch;
  font-size: clamp(1.02rem, 0.95rem + 0.6vw, 1.24rem);
  line-height: 1.62;
  color: var(--color-text-dim);
}

.fact-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.fact-row .pill {
  min-height: 34px;
}

.hero-figure {
  position: relative;
  margin: 0;
}

.hero-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: 50% 36%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-strong);
  box-shadow: var(--shadow-lift);
}

.hero-badge {
  position: absolute;
  left: var(--space-3);
  bottom: var(--space-3);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-pill);
  background: rgba(10, 10, 12, 0.78);
  border: 1px solid var(--color-border-strong);
  backdrop-filter: blur(8px);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-text);
}

.hero-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-red);
  box-shadow: 0 0 0 3px rgba(255, 35, 64, 0.22);
}

/* ---------- band ---------- */

.band {
  border-block: 1px solid var(--color-border);
  background: var(--color-bg-soft);
}

.band-text {
  margin: 0;
  padding: var(--space-4) var(--container-pad);
  text-align: center;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: clamp(0.95rem, 3.4vw, 1.35rem);
  letter-spacing: 0.14em;
  color: var(--color-gold);
}

.band-text span {
  color: var(--color-red);
  padding-inline: 0.15em;
}

/* ---------- story ---------- */

.story-grid {
  display: grid;
  gap: var(--space-6);
}

.story-title {
  margin-top: var(--space-3);
  margin-bottom: var(--space-5);
  font-size: clamp(1.85rem, 7.6vw, 2.6rem);
  line-height: 1.02;
}

.story-figure {
  margin: 0;
}

.story-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  object-position: 50% 14%;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
}

.story-figure figcaption {
  margin-top: var(--space-3);
  padding-left: var(--space-3);
  border-left: 2px solid var(--color-red);
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--color-text-mute);
}

.pullquote {
  margin: var(--space-7) 0 0;
  padding: var(--space-5) 0 0;
  border-top: 1px solid var(--color-border);
}

.pullquote blockquote {
  margin: 0;
}

.pullquote blockquote p {
  font-family: var(--font-display);
  text-transform: uppercase;
  line-height: 1.02;
  font-size: clamp(1.9rem, 9vw, 4rem);
  color: var(--color-text);
  overflow-wrap: break-word;
}

.pullquote figcaption {
  margin-top: var(--space-4);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-mute);
}

/* ---------- values ---------- */

.values-title {
  margin-top: var(--space-3);
  margin-bottom: var(--space-6);
  font-size: clamp(1.85rem, 7.6vw, 2.6rem);
}

.values-grid {
  display: grid;
  gap: var(--space-4);
}

.value-card {
  position: relative;
  overflow: hidden;
  padding: var(--space-5);
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.value-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--gradient-flame);
  opacity: 0.85;
}

.value-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-strong);
}

.value-num {
  display: block;
  font-family: var(--font-display);
  font-size: 1.6rem;
  letter-spacing: 0.06em;
  color: var(--color-gold);
  opacity: 0.85;
}

.value-title {
  margin: var(--space-2) 0 var(--space-3);
  font-size: clamp(1.25rem, 5.4vw, 1.5rem);
}

.value-body {
  color: var(--color-text-dim);
  font-size: 0.98rem;
  line-height: 1.68;
}

/* ---------- owner ---------- */

.owner-grid {
  display: grid;
  gap: var(--space-6);
}

.owner-figure {
  position: relative;
  margin: 0;
  /* Breathing room between the top of the plate and the top of his head. */
  padding-top: var(--space-5);
}

.owner-plate {
  position: absolute;
  inset: 0 0 46px 0;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background:
    radial-gradient(120% 90% at 50% 100%, rgba(255, 35, 64, 0.3) 0%, rgba(255, 35, 64, 0) 62%),
    linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg-soft) 100%);
  overflow: hidden;
}

.owner-img {
  position: relative;
  display: block;
  margin-inline: auto;
  width: auto;
  height: clamp(300px, 82vw, 420px);
  max-width: 100%;
  object-fit: contain;
  object-position: bottom center;
  filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.55));
}

.owner-caption {
  position: relative;
  margin-top: var(--space-3);
  text-align: center;
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: clamp(0.95rem, 4vw, 1.15rem);
  letter-spacing: 0.06em;
  color: var(--color-gold);
}

.owner-title {
  margin-top: var(--space-3);
  margin-bottom: var(--space-5);
  font-size: clamp(1.85rem, 7.6vw, 2.6rem);
}

/* ---------- cta ---------- */

.cta {
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-soft);
}

.cta-inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.cta-title {
  font-size: clamp(2.1rem, 9.5vw, 3.5rem);
}

.cta-lead {
  margin: var(--space-4) auto 0;
  max-width: 54ch;
  color: var(--color-text-dim);
  font-size: clamp(1rem, 0.95rem + 0.4vw, 1.12rem);
  line-height: 1.68;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.cta-actions .btn {
  width: 100%;
  min-height: 52px;
}

.cta-note {
  margin-top: var(--space-5);
  font-family: var(--font-display);
  text-transform: uppercase;
  font-size: clamp(1rem, 4.4vw, 1.2rem);
  letter-spacing: 0.05em;
  color: var(--color-text-mute);
}

.cta-social {
  margin-top: var(--space-7);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.cta-social-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-mute);
}

.social-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

/* Icon-only circles on phones (the aria-label carries the name), pills with
   visible text once there's room for all three on one line. */
.social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 50px;
  height: 50px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
  font-size: 0.88rem;
  font-weight: 600;
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.social-link span {
  display: none;
}

.social-link:hover {
  color: var(--color-gold);
  border-color: var(--color-gold);
  transform: translateY(-2px);
}

/* ---------- motion ---------- */

@keyframes rise {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.rise {
  animation: rise 0.75s cubic-bezier(0.22, 0.72, 0.28, 1) both;
}

.d0 {
  animation-delay: 0.02s;
}
.d1 {
  animation-delay: 0.1s;
}
.d2 {
  animation-delay: 0.2s;
}
.d3 {
  animation-delay: 0.3s;
}

/* Scroll-driven reveal where supported; everything stays fully visible otherwise. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .reveal {
      animation: rise linear both;
      animation-timeline: view();
      animation-range: entry 8% entry 62%;
    }
  }
}

/* ---------- breakpoints ---------- */

@media (min-width: 640px) {
  .hero-img {
    aspect-ratio: 3 / 4;
  }

  .story-img {
    aspect-ratio: 16 / 10;
    object-position: 50% 14%;
  }

  .cta-actions {
    flex-direction: row;
    justify-content: center;
  }

  .cta-actions .btn {
    width: auto;
  }

  .value-card {
    padding: var(--space-6);
  }

  .social-link {
    width: auto;
    height: 50px;
    padding-inline: 1.15rem;
  }

  .social-link span {
    display: inline;
  }
}

@media (min-width: 900px) {
  .hero {
    padding-block: var(--space-8) var(--space-9);
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.85fr);
    align-items: center;
    gap: var(--space-8);
  }

  .hero-title {
    font-size: clamp(3.6rem, 5.4vw, 5.25rem);
  }

  .hero-img {
    aspect-ratio: 4 / 5;
  }

  .hero-badge {
    left: var(--space-4);
    bottom: var(--space-4);
    font-size: 0.82rem;
  }

  .story-grid {
    grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
    gap: var(--space-8);
    align-items: start;
  }

  .story-img {
    aspect-ratio: 3 / 4;
    object-position: 50% 18%;
  }

  .story-figure {
    position: sticky;
    top: 108px;
  }

  /* A view() timeline on a sticky element fights the stickiness — drop it. */
  .story-figure.reveal {
    animation: none;
  }

  .pullquote {
    margin-top: var(--space-8);
    padding-top: var(--space-6);
  }

  .values-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-5);
  }

  .owner-grid {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    align-items: center;
    gap: var(--space-8);
  }

  .owner-img {
    height: clamp(400px, 34vw, 520px);
  }

  .owner-plate {
    inset: 0 0 52px 0;
  }
}

@media (min-width: 1200px) {
  .hero-grid {
    gap: var(--space-9);
  }

  .lead {
    font-size: 1.28rem;
  }

  .pullquote blockquote p {
    font-size: 4.4rem;
    max-width: 22ch;
  }

  .owner-img {
    height: 560px;
  }
}
</style>
