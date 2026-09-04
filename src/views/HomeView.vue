<script setup>
import { site, socials, hours } from '../data/site'
import { menu } from '../data/menu'
import SocialIcon from '../components/SocialIcon.vue'
import ownerPortrait from '../assets/images/owner-portrait.webp'
import familyPhoto from '../assets/images/family.webp'
import logoMark from '../assets/images/logo.webp'

/* ---- Accent tokens per menu category ---- */
const accents = {
  red: { line: 'var(--color-red)', soft: 'var(--color-red-soft)' },
  gold: { line: 'var(--color-gold)', soft: 'var(--color-gold-soft)' },
  teal: { line: 'var(--color-teal)', soft: 'var(--color-teal-soft)' },
}

const accentStyle = (accent) => {
  const a = accents[accent] || accents.red
  return { '--accent': a.line, '--accent-soft': a.soft }
}

/* ---- Cheapest price in a category, straight from the menu data ---- */
const toNumber = (price) => Number(String(price).replace(/[^0-9.]/g, ''))

const startingPrice = (items = []) => {
  const values = items.map((i) => toNumber(i.price)).filter((n) => Number.isFinite(n) && n > 0)
  if (!values.length) return ''
  const min = Math.min(...values)
  return `$${Number.isInteger(min) ? min : min.toFixed(2)}`
}

/* ---- The headliners, in the order we want them shown ---- */
const headlinerIds = ['build-your-own', 'lemonades', 'snow-cones', 'milkshakes']
const picked = headlinerIds.map((id) => menu.find((c) => c.id === id)).filter(Boolean)

const featured = (picked.length ? picked : menu.slice(0, 4)).map((category) => ({
  id: category.id,
  name: category.name,
  kicker: category.kicker,
  blurb: category.blurb,
  accent: category.accent,
  from: startingPrice(category.items),
}))

const alsoServing = menu
  .filter((category) => !featured.some((f) => f.id === category.id))
  .map((category) => category.name)

const tickerItems = menu.map((category) => category.name)
</script>

<template>
  <div class="home">
    <!-- ============ HERO ============ -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero-inner">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="hero-badge">
              <span class="hero-dot" aria-hidden="true"></span>
              {{ site.tagline }}
            </p>

            <h1 id="hero-title" class="hero-title">
              <span class="hero-line">Loaded hot.</span>
              <span class="hero-line">Shaken cold.</span>
              <span class="hero-line text-gradient">Straight out the window.</span>
            </h1>

            <p class="hero-lede">
              Rice bowls, baked potatoes and nachos loaded past the rim. Lemonade shaken to order.
              All of it out of a truck rolling around Omaha.
            </p>

            <div class="hero-cta">
              <RouterLink to="/menu" class="btn btn-primary">
                See the menu
                <SocialIcon name="arrow" :size="18" />
              </RouterLink>
              <a :href="site.phoneHref" class="btn btn-outline">
                <SocialIcon name="phone" :size="17" />
                {{ site.phone }}
              </a>
            </div>

            <ul class="hero-pills" role="list">
              <li class="pill">Black-owned &amp; family-run</li>
              <li class="pill">Made fresh to order</li>
              <li class="pill">
                <SocialIcon name="pin" :size="14" />
                {{ site.city }}
              </li>
            </ul>
          </div>

          <div class="hero-visual">
            <img
              :src="ownerPortrait"
              alt="The owner of Pretty's Eats standing with arms crossed in a red shirt and black apron"
              width="700"
              height="1049"
              class="hero-portrait"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TICKER ============ -->
    <div class="ticker">
      <div class="ticker-track">
        <ul class="ticker-list" role="list">
          <li v-for="item in tickerItems" :key="item" class="ticker-item">{{ item }}</li>
        </ul>
        <ul class="ticker-list" aria-hidden="true">
          <li v-for="item in tickerItems" :key="`echo-${item}`" class="ticker-item">{{ item }}</li>
        </ul>
      </div>
    </div>

    <!-- ============ WHAT WE'RE KNOWN FOR ============ -->
    <section class="section known" aria-labelledby="known-title">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Off the truck</p>
          <h2 id="known-title" class="section-title">What we&rsquo;re known for</h2>
          <p class="section-lede">
            One plate, built your way &mdash; base, protein, four toppings. The cold half of the
            menu is there to keep you standing in an Omaha July.
          </p>
        </header>

        <ul class="known-grid" role="list">
          <li v-for="item in featured" :key="item.id">
            <RouterLink
              :to="{ name: 'menu', hash: `#${item.id}` }"
              class="card known-card"
              :style="accentStyle(item.accent)"
              :aria-label="`${item.name} — see it on the menu`"
            >
              <span class="known-kicker">{{ item.kicker }}</span>
              <h3 class="known-name">{{ item.name }}</h3>
              <p class="known-blurb">{{ item.blurb }}</p>
              <span class="known-foot">
                <span v-if="item.from" class="known-price">From {{ item.from }}</span>
                <span class="known-go" aria-hidden="true">
                  <SocialIcon name="arrow" :size="18" />
                </span>
              </span>
            </RouterLink>
          </li>
        </ul>

        <p v-if="alsoServing.length" class="known-also">
          <span class="known-also-label">Also out the window</span>
          <span class="known-also-list">{{ alsoServing.join(' · ') }}</span>
        </p>
      </div>
    </section>

    <!-- ============ STORY ============ -->
    <section class="section story" aria-labelledby="story-title">
      <div class="container story-grid">
        <figure class="story-figure">
          <img
            :src="familyPhoto"
            alt="The Pretty's Eats family standing together in front of their white food truck"
            width="1400"
            height="2471"
            class="story-img"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="story-chip">
            <SocialIcon name="pin" :size="14" />
            {{ site.location }}
          </figcaption>
        </figure>

        <div class="story-copy">
          <p class="eyebrow">Our story</p>
          <h2 id="story-title" class="section-title">
            Black-owned.<br />Family-run.<br /><span class="text-gradient">Omaha-made.</span>
          </h2>
          <p class="story-text">
            Pretty&rsquo;s Eats runs on hustle, heat, and straight-up flavor. It&rsquo;s our family
            in that truck &mdash; taking the order, working the heat, handing it out the window.
            Same faces every time you pull up.
          </p>
          <p class="story-text">
            We cook it the way we&rsquo;d feed our own people. That&rsquo;s the whole recipe.
          </p>
          <RouterLink to="/about" class="btn btn-outline">
            Meet the family
            <SocialIcon name="arrow" :size="18" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============ HOURS / FIND US ============ -->
    <section class="section find" aria-labelledby="find-title">
      <div class="container">
        <header class="section-head">
          <p class="eyebrow">Hours &amp; where we&rsquo;re at</p>
          <h2 id="find-title" class="section-title">Catch the truck</h2>
          <p class="section-lede">
            The corner changes. The hours don&rsquo;t. Follow along on socials so you always know
            where to find us.
          </p>
        </header>

        <div class="find-grid">
          <div class="card find-card">
            <h3 class="find-head">
              <SocialIcon name="clock" :size="18" />
              Hours
            </h3>
            <ul class="hours-list" role="list">
              <li v-for="row in hours" :key="row.days" class="hours-row" :class="{ 'is-closed': !row.open }">
                <span class="hours-days">{{ row.days }}</span>
                <span class="hours-time">{{ row.time }}</span>
              </li>
            </ul>
            <RouterLink to="/contact" class="btn btn-ghost btn-sm find-btn">
              Get in touch
              <SocialIcon name="arrow" :size="16" />
            </RouterLink>
          </div>

          <div class="card find-card">
            <h3 class="find-head">
              <SocialIcon name="pin" :size="18" />
              Where we&rsquo;re parked
            </h3>
            <p class="find-note">
              We&rsquo;re a truck, so we move around Omaha. Check our pages to see where
              we&rsquo;re set up.
            </p>
            <ul class="social-list" role="list">
              <li v-for="s in socials" :key="s.label">
                <a
                  :href="s.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-row"
                  :aria-label="`${site.name} on ${s.label} — opens in a new tab`"
                >
                  <span class="social-icon" aria-hidden="true">
                    <SocialIcon :name="s.icon" :size="18" />
                  </span>
                  <span class="social-text">
                    <span class="social-label">{{ s.label }}</span>
                    <span class="social-handle">{{ s.handle }}</span>
                  </span>
                  <SocialIcon name="arrow" :size="16" class="social-arrow" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CLOSING CTA ============ -->
    <section class="section closing" aria-labelledby="closing-title">
      <div class="container">
        <div class="closing-inner">
          <img :src="logoMark" alt="" width="240" height="236" class="closing-logo" loading="lazy" decoding="async" />
          <h2 id="closing-title" class="closing-title">
            The window&rsquo;s open.<br /><span class="text-gradient">Pull up.</span>
          </h2>
          <p class="closing-text">
            No app, no cart, no delivery driver. Call it in or order at the truck.
          </p>
          <div class="closing-cta">
            <a :href="site.phoneHref" class="btn btn-primary">
              <SocialIcon name="phone" :size="17" />
              {{ site.phone }}
            </a>
            <RouterLink to="/menu" class="btn btn-outline">
              See the full menu
              <SocialIcon name="arrow" :size="18" />
            </RouterLink>
          </div>
          <a :href="site.emailHref" class="closing-mail">
            <SocialIcon name="mail" :size="16" />
            {{ site.email }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* =====================================================
   Shared
   ===================================================== */
.home {
  position: relative;
}

.section-head {
  max-width: 42rem;
  margin-bottom: var(--space-6);
}

.section-title {
  margin-top: var(--space-3);
  font-size: clamp(2.1rem, 9vw, 3.6rem);
  line-height: 0.98;
}

.section-lede {
  margin-top: var(--space-4);
  color: var(--color-text-dim);
  font-size: clamp(0.98rem, 3.4vw, 1.08rem);
  max-width: 46ch;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
}

@keyframes glow-breathe {
  50% {
    opacity: 0.72;
    transform: translateX(-50%) scale(1.07);
  }
}

@keyframes ticker-run {
  to {
    transform: translateX(-50%);
  }
}

@keyframes dot-pulse {
  50% {
    opacity: 0.35;
    transform: scale(0.7);
  }
}

/* =====================================================
   Hero
   ===================================================== */
.hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-6) var(--space-7);
}

.hero::before {
  content: '';
  position: absolute;
  top: -34%;
  left: 50%;
  width: min(140vw, 900px);
  aspect-ratio: 1;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(255, 35, 64, 0.26), transparent 62%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.hero-grid {
  display: grid;
  gap: var(--space-6);
}

.hero-copy > * + * {
  margin-top: var(--space-5);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.45rem 0.95rem;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(255, 35, 64, 0.42);
  background: var(--color-red-soft);
  color: var(--color-red-bright);
  font-size: clamp(0.62rem, 2.5vw, 0.7rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.3;
  animation: rise 0.6s ease backwards;
}

.hero-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-red);
  box-shadow: 0 0 10px var(--color-red);
  animation: dot-pulse 2.4s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(2.9rem, 13.5vw, 6.5rem);
  line-height: 0.92;
  letter-spacing: -0.01em;
}

.hero-line {
  display: block;
  animation: rise 0.75s ease backwards;
}

.hero-line:nth-child(1) {
  animation-delay: 0.06s;
}
.hero-line:nth-child(2) {
  animation-delay: 0.14s;
}
.hero-line:nth-child(3) {
  animation-delay: 0.22s;
}

.hero-lede {
  color: var(--color-text-dim);
  font-size: clamp(1rem, 3.8vw, 1.18rem);
  max-width: 42ch;
  animation: rise 0.75s ease 0.3s backwards;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  animation: rise 0.75s ease 0.38s backwards;
}

.hero-cta .btn {
  flex: 1 1 100%;
  min-height: 48px;
}

.hero-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  animation: rise 0.75s ease 0.46s backwards;
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.hero-visual::before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 6%;
  width: min(92%, 380px);
  aspect-ratio: 1;
  transform: translateX(-50%);
  background: radial-gradient(
    circle,
    rgba(255, 35, 64, 0.5),
    rgba(255, 35, 64, 0.14) 46%,
    transparent 70%
  );
  filter: blur(22px);
  animation: glow-breathe 7s ease-in-out infinite;
  pointer-events: none;
}

.hero-visual::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: min(78%, 320px);
  height: 14px;
  transform: translateX(-50%);
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(255, 35, 64, 0.42), transparent 70%);
  pointer-events: none;
}

.hero-portrait {
  position: relative;
  width: min(74%, 290px);
  height: auto;
  filter: drop-shadow(0 26px 38px rgba(0, 0, 0, 0.7));
  animation: rise 0.9s ease 0.1s backwards;
}

/* =====================================================
   Ticker
   ===================================================== */
.ticker {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-3);
  border-block: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: ticker-run 38s linear infinite;
}

.ticker-list {
  display: flex;
  align-items: center;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-right: var(--space-4);
  font-family: var(--font-display);
  font-size: clamp(0.95rem, 3.6vw, 1.25rem);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--color-text-dim);
  white-space: nowrap;
}

.ticker-item::after {
  content: '';
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 50%;
  background: var(--gradient-flame);
}

/* =====================================================
   Known for
   ===================================================== */
.known-grid {
  display: grid;
  gap: var(--space-4);
}

.known-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: var(--space-5);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.known-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--accent);
}

.known-card::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: -45%;
  right: -30%;
  width: 190px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--accent-soft);
  filter: blur(34px);
  opacity: 0.65;
  transition: opacity 0.3s ease;
}

.known-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-lift);
}

.known-card:hover::after {
  opacity: 1;
}

.known-kicker {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
}

.known-name {
  margin-top: var(--space-2);
  font-size: clamp(1.35rem, 5.5vw, 1.6rem);
  line-height: 1.02;
}

.known-blurb {
  margin-top: var(--space-3);
  color: var(--color-text-dim);
  font-size: 0.94rem;
}

.known-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-top: auto;
  padding-top: var(--space-5);
}

.known-price {
  font-family: var(--font-display);
  font-size: 1.15rem;
  letter-spacing: 0.02em;
  color: var(--color-text);
}

.known-go {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-left: auto;
  margin-right: -0.5rem;
  border-radius: 50%;
  color: var(--accent);
  transition: transform 0.25s ease;
}

.known-card:hover .known-go {
  transform: translateX(4px);
}

.known-also {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-3);
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-dim);
  font-size: 0.92rem;
}

.known-also-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-gold);
}

/* =====================================================
   Story
   ===================================================== */
.story {
  position: relative;
  background: var(--color-bg-soft);
  border-block: 1px solid var(--color-border);
}

.story-grid {
  display: grid;
  gap: var(--space-6);
}

.story-figure {
  position: relative;
  margin: 0;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  box-shadow: var(--shadow-lift);
}

.story-img {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center 32%;
}

.story-chip {
  position: absolute;
  left: var(--space-4);
  bottom: var(--space-4);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0.45rem 0.85rem;
  border-radius: var(--radius-pill);
  background: rgba(10, 10, 12, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--color-border-strong);
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--color-text);
}

.story-copy > * + * {
  margin-top: var(--space-4);
}

.story-copy .section-title {
  margin-top: var(--space-3);
}

.story-text {
  color: var(--color-text-dim);
  font-size: clamp(0.98rem, 3.4vw, 1.08rem);
  max-width: 46ch;
}

.story-copy .btn {
  margin-top: var(--space-5);
  min-height: 48px;
}

/* =====================================================
   Find us
   ===================================================== */
.find-grid {
  display: grid;
  gap: var(--space-4);
}

.find-card {
  display: flex;
  flex-direction: column;
  padding: var(--space-4);
}

.find-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: 1.15rem;
  color: var(--color-gold);
}

.hours-list {
  margin-top: var(--space-4);
}

.hours-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-1) var(--space-3);
  padding-block: var(--space-3);
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9rem;
}

.hours-row:last-child {
  border-bottom: none;
}

.hours-days {
  color: var(--color-text-dim);
}

.hours-time {
  margin-left: auto;
  font-weight: 700;
  text-align: right;
}

.hours-row.is-closed .hours-time {
  color: var(--color-text-mute);
  font-weight: 600;
}

.find-btn {
  align-self: flex-start;
  margin-top: var(--space-5);
  min-height: 44px;
}

.find-note {
  margin-top: var(--space-3);
  color: var(--color-text-dim);
  font-size: 0.95rem;
}

.social-list {
  margin-top: var(--space-4);
}

.social-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 56px;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border);
  transition: color 0.2s ease;
}

.social-list li:last-child .social-row {
  border-bottom: none;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 50%;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.social-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  min-width: 0;
}

.social-label {
  font-weight: 700;
  font-size: 0.95rem;
}

.social-handle {
  font-size: 0.82rem;
  color: var(--color-text-mute);
  overflow-wrap: anywhere;
}

.social-arrow {
  margin-left: auto;
  flex: none;
  color: var(--color-text-mute);
  transition: transform 0.2s ease, color 0.2s ease;
}

.social-row:hover .social-icon {
  background: var(--color-red-soft);
  border-color: rgba(255, 35, 64, 0.45);
  color: var(--color-red-bright);
}

.social-row:hover .social-arrow {
  transform: translateX(4px);
  color: var(--color-text);
}

/* =====================================================
   Closing CTA
   ===================================================== */
.closing-inner {
  position: relative;
  overflow: hidden;
  padding: var(--space-7) var(--space-5);
  text-align: center;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface);
}

.closing-inner::before {
  content: '';
  position: absolute;
  top: -60%;
  left: 50%;
  width: min(160%, 760px);
  aspect-ratio: 1;
  transform: translateX(-50%);
  background: radial-gradient(circle, rgba(255, 35, 64, 0.3), transparent 62%);
  pointer-events: none;
}

.closing-inner > * {
  position: relative;
}

.closing-logo {
  width: 74px;
  height: auto;
  margin: 0 auto var(--space-4);
  filter: drop-shadow(0 0 20px rgba(255, 35, 64, 0.5));
}

.closing-title {
  font-size: clamp(2.2rem, 10vw, 4rem);
  line-height: 0.96;
}

.closing-text {
  margin: var(--space-4) auto 0;
  max-width: 34ch;
  color: var(--color-text-dim);
  font-size: clamp(0.98rem, 3.4vw, 1.08rem);
}

.closing-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.closing-cta .btn {
  flex: 1 1 100%;
  min-height: 48px;
}

.closing-mail {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
  min-height: 44px;
  padding-inline: var(--space-2);
  color: var(--color-text-mute);
  font-size: 0.9rem;
  font-weight: 600;
  overflow-wrap: anywhere;
  transition: color 0.2s ease;
}

.closing-mail:hover {
  color: var(--color-gold);
}

/* =====================================================
   >= 560px — buttons stop being full width
   ===================================================== */
@media (min-width: 560px) {
  .hero-cta .btn,
  .closing-cta .btn {
    flex: 0 1 auto;
  }
}

/* =====================================================
   >= 640px
   ===================================================== */
@media (min-width: 640px) {
  .known-grid,
  .find-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-portrait {
    width: min(60%, 340px);
  }

  .closing-inner {
    padding: var(--space-8) var(--space-6);
  }
}

/* =====================================================
   >= 900px
   ===================================================== */
@media (min-width: 900px) {
  .hero {
    padding-block: var(--space-7) var(--space-8);
  }

  .hero-grid {
    grid-template-columns: 1.08fr 0.92fr;
    align-items: center;
    gap: var(--space-7);
  }

  .hero-visual {
    align-items: center;
  }

  .hero-portrait {
    width: min(100%, 420px);
  }

  .story-grid {
    grid-template-columns: 0.85fr 1.15fr;
    align-items: center;
    gap: var(--space-7);
  }

  .story-img {
    aspect-ratio: 3 / 4;
  }

  .section-head {
    margin-bottom: var(--space-7);
  }

  .known-also {
    margin-top: var(--space-6);
  }

  .find-card {
    padding: var(--space-6);
  }

  .hours-row {
    font-size: 0.95rem;
  }
}

/* =====================================================
   >= 1200px
   ===================================================== */
@media (min-width: 1200px) {
  .known-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .hero-portrait {
    width: min(100%, 470px);
  }

  .closing-inner {
    padding: var(--space-9) var(--space-7);
  }
}

/* =====================================================
   Motion preferences
   ===================================================== */
@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>
