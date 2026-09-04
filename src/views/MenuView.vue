<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { menu, menuNote } from '../data/menu'
import { site, hours } from '../data/site'
import SocialIcon from '../components/SocialIcon.vue'
import MenuItemCard from '../components/menu/MenuItemCard.vue'
import logo from '../assets/images/logo.webp'

const ACCENTS = {
  red: { accent: 'var(--color-red)', soft: 'var(--color-red-soft)' },
  gold: { accent: 'var(--color-gold)', soft: 'var(--color-gold-soft)' },
  teal: { accent: 'var(--color-teal)', soft: 'var(--color-teal-soft)' },
}

const accentStyle = (accent) => {
  const tone = ACCENTS[accent] || ACCENTS.red
  return { '--accent': tone.accent, '--accent-soft': tone.soft }
}

const index = (i) => String(i + 1).padStart(2, '0')

const route = useRoute()
const router = useRouter()
const sections = ref(null)
const activeId = ref(menu[0].id)
let observer = null

/**
 * The router runs on hash history, so a bare "#rice-bowls" href would be read
 * as a route and dump the visitor on the 404 page. Links point at the real
 * deep link ("#/menu#rice-bowls") for new-tab / copy-link, and clicks are
 * handled here so the jump honours scroll-margin-top under the fixed header.
 */
const hrefFor = (id) => router.resolve({ name: 'menu', hash: `#${id}` }).href

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  activeId.value = id
  el.focus({ preventScroll: true })
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Land a deep link on `id`, if it names a real category. */
const landHash = (rawHash, smooth = false) => {
  const target = String(rawHash || '').replace(/^#/, '')
  if (!target || !menu.some((category) => category.id === target)) return
  activeId.value = target
  const settle = () =>
    document
      .getElementById(target)
      ?.scrollIntoView(smooth ? { behavior: 'smooth', block: 'start' } : { block: 'start' })
  requestAnimationFrame(settle)
  // The display face reflows the page under us, so land the jump again once
  // the fonts are in.
  if (!smooth) document.fonts?.ready.then(() => requestAnimationFrame(settle))
}

/*
 * The router leaves in-page anchors to us (see scrollBehavior), so handle both
 * arriving with a hash and the hash changing while we're already mounted —
 * e.g. a "/menu#lemonades" link followed from another page or pasted in.
 */
watch(
  () => route.hash,
  (hash) => landHash(hash, true),
)

onMounted(() => {
  // Deep link straight to a category (the page transition means this view
  // doesn't exist yet when the navigation resolves).
  landHash(route.hash)

  // Scroll-spy: highlights the quick-nav chip for the section in view.
  if (!sections.value || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) activeId.value = entry.target.id
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  sections.value.querySelectorAll('[data-menu-section]').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <div class="menu-page">
    <!-- ---------- Page header ---------- -->
    <header class="page-head">
      <div class="container page-head-inner">
        <p class="eyebrow">Made fresh to order</p>
        <h1 class="page-title">
          The <span class="text-gradient">Menu</span>
        </h1>
        <p class="page-lead">
          Loaded bowls, loaded potatoes, and a cold lineup to match. Nothing gets built until you
          order it — then it comes straight out the window.
        </p>
        <div class="page-actions">
          <a :href="site.phoneHref" class="btn btn-primary">
            <SocialIcon name="phone" :size="18" />
            Call to order
          </a>
          <a
            :href="hrefFor('lemonades')"
            class="btn btn-outline"
            @click.prevent="scrollToSection('lemonades')"
          >
            Skip to the cold stuff
          </a>
        </div>
        <p class="page-stamp">{{ site.tagline }}</p>
      </div>
    </header>

    <!-- ---------- Category quick-nav ---------- -->
    <nav class="quicknav" aria-label="Menu categories">
      <ul class="quicknav-list" role="list">
        <li v-for="category in menu" :key="category.id" :style="accentStyle(category.accent)">
          <a
            :href="hrefFor(category.id)"
            class="quicknav-chip"
            :class="{ 'is-active': activeId === category.id }"
            :aria-current="activeId === category.id ? 'location' : undefined"
            @click.prevent="scrollToSection(category.id)"
          >
            <span class="quicknav-dot" aria-hidden="true" />
            {{ category.name }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- ---------- Categories ---------- -->
    <div ref="sections" class="container">
      <section
        v-for="(category, i) in menu"
        :id="category.id"
        :key="category.id"
        data-menu-section
        class="category"
        tabindex="-1"
        :style="accentStyle(category.accent)"
        :aria-labelledby="`${category.id}-title`"
      >
        <header class="category-head">
          <span class="category-index" aria-hidden="true">{{ index(i) }}</span>
          <div>
            <p class="eyebrow category-kicker">{{ category.kicker }}</p>
            <h2 :id="`${category.id}-title`" class="category-name">{{ category.name }}</h2>
            <p class="category-blurb">{{ category.blurb }}</p>
          </div>
        </header>

        <div class="items">
          <MenuItemCard v-for="item in category.items" :key="item.name" :item="item" />
        </div>
      </section>
    </div>

    <!-- ---------- How to order ---------- -->
    <section class="order" aria-labelledby="order-title">
      <div class="container order-inner">
        <img
          :src="logo"
          alt=""
          width="64"
          height="63"
          loading="lazy"
          decoding="async"
          class="order-logo"
        />
        <p class="eyebrow">How to order</p>
        <h2 id="order-title" class="order-title">Come to the window</h2>
        <p class="order-lead">
          There’s no online ordering and no delivery app. Walk up to the truck and order at the
          window, or call ahead and we’ll get it going.
        </p>
        <p class="order-note">{{ menuNote }}</p>

        <div class="order-actions">
          <a :href="site.phoneHref" class="btn btn-primary order-call">
            <SocialIcon name="phone" :size="18" />
            {{ site.phone }}
          </a>
          <a
            :href="site.emailHref"
            class="btn btn-outline"
            :aria-label="`Email ${site.name} at ${site.email}`"
          >
            <SocialIcon name="mail" :size="18" />
            Email us
          </a>
        </div>

        <div class="order-hours">
          <p class="order-hours-label">
            <SocialIcon name="clock" :size="16" />
            Window hours
          </p>
          <ul role="list">
            <li v-for="row in hours" :key="row.days" :class="{ 'is-closed': !row.open }">
              <span>{{ row.days }}</span>
              <span class="order-hours-time">{{ row.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.menu-page {
  padding-bottom: var(--space-6);
}

/* ---------- Page header ---------- */

.page-head {
  padding-block: var(--space-7) var(--space-6);
  background:
    radial-gradient(110% 80% at 12% 0%, var(--color-red-soft), transparent 62%),
    radial-gradient(80% 70% at 92% 8%, var(--color-gold-soft), transparent 60%);
}

.page-head-inner > * {
  animation: rise 0.5s ease backwards;
}

.page-head-inner > *:nth-child(2) {
  animation-delay: 60ms;
}

.page-head-inner > *:nth-child(3) {
  animation-delay: 120ms;
}

.page-head-inner > *:nth-child(4) {
  animation-delay: 180ms;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

.page-title {
  margin-top: var(--space-3);
  font-size: clamp(3.25rem, 17vw, 7rem);
  letter-spacing: -0.01em;
}

.page-lead {
  max-width: 44ch;
  margin-top: var(--space-4);
  font-size: clamp(1rem, 3.6vw, 1.15rem);
  color: var(--color-text-dim);
}

.page-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

/* Outlined tagline slab — fills the desktop hero without stock photography */
.page-stamp {
  display: none;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 3.4vw, 3.5rem);
  line-height: 0.95;
  text-transform: uppercase;
  color: var(--color-red);
  opacity: 0.5;
  transform: rotate(-3deg);
}

@supports (-webkit-text-stroke: 1px red) {
  .page-stamp {
    color: transparent;
    opacity: 1;
    -webkit-text-stroke: 1.5px var(--color-red);
  }
}

/* ---------- Quick-nav ---------- */

.quicknav {
  position: sticky;
  top: 72px;
  z-index: 20;
  background: var(--color-bg);
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-block: 1px solid var(--color-border);
}

.quicknav-list {
  display: flex;
  gap: var(--space-2);
  max-width: var(--container-width);
  margin-inline: auto;
  padding: var(--space-2) var(--container-pad);
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x proximity;
  scroll-padding-inline: var(--container-pad);
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.quicknav-list::-webkit-scrollbar {
  display: none;
}

.quicknav-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding-inline: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-dim);
  white-space: nowrap;
  scroll-snap-align: start;
  transition: color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.quicknav-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  transition: transform 0.2s ease;
}

.quicknav-chip:hover {
  color: var(--color-text);
  border-color: var(--color-border-strong);
}

.quicknav-chip.is-active {
  color: var(--color-text);
  border-color: var(--accent);
  background: var(--accent-soft);
}

.quicknav-chip.is-active .quicknav-dot {
  transform: scale(1.35);
}

/* ---------- Categories ---------- */

.category {
  padding-block: var(--space-7);
  scroll-margin-top: 132px;
  background: radial-gradient(60% 45% at 0% 0%, var(--accent-soft), transparent 62%);
}

.category + .category {
  border-top: 1px solid var(--color-border);
}

/* Sections take focus on a quick-nav jump — keep the ring inside the page */
.category:focus-visible {
  outline-offset: -6px;
  border-radius: var(--radius-lg);
}

.category-head {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-3);
  align-items: start;
  margin-bottom: var(--space-5);
}

.category-index {
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3.25rem);
  line-height: 0.82;
  color: var(--accent);
  opacity: 0.55;
}

@supports (-webkit-text-stroke: 1px red) {
  .category-index {
    color: transparent;
    opacity: 1;
    -webkit-text-stroke: 1.5px var(--accent);
  }
}

.category-kicker {
  color: var(--accent);
}

.category-kicker::before {
  background: var(--accent);
}

.category-name {
  margin-top: var(--space-2);
  font-size: clamp(1.9rem, 8vw, 3rem);
}

.category-blurb {
  max-width: 56ch;
  margin-top: var(--space-3);
  color: var(--color-text-dim);
}

.items {
  display: grid;
  gap: var(--space-4);
}

/* ---------- How to order ---------- */

.order {
  padding-top: var(--space-7);
}

.order-inner {
  max-width: 720px;
  padding-block: var(--space-6) var(--space-7);
  text-align: center;
  border-top: 1px solid var(--color-border);
}

.order-logo {
  width: 64px;
  height: auto;
  margin: 0 auto var(--space-4);
  filter: drop-shadow(0 0 18px rgba(255, 35, 64, 0.45));
}

.order-title {
  margin-top: var(--space-3);
  font-size: clamp(2rem, 9vw, 3rem);
}

.order-lead {
  max-width: 46ch;
  margin: var(--space-3) auto 0;
  color: var(--color-text-dim);
}

.order-note {
  margin-top: var(--space-3);
  font-size: 0.9rem;
  color: var(--color-text-mute);
}

.order-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.order-call {
  font-size: 1.05rem;
}

.order-hours {
  max-width: 380px;
  margin: var(--space-6) auto 0;
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  text-align: left;
}

.order-hours-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-gold);
}

.order-hours li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  padding-block: var(--space-2);
  font-size: 0.9rem;
  color: var(--color-text-dim);
}

.order-hours li + li {
  border-top: 1px solid var(--color-border);
}

.order-hours-time {
  font-weight: 700;
  color: var(--color-text);
}

.order-hours .is-closed .order-hours-time {
  color: var(--color-text-mute);
  font-weight: 600;
}

/* ---------- Up and out ---------- */

@media (min-width: 640px) {
  .page-head {
    padding-block: var(--space-8) var(--space-6);
  }

  .items {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    gap: var(--space-5);
  }

  .category-head {
    gap: var(--space-5);
  }
}

@media (min-width: 900px) {
  .page-head-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
    align-items: center;
    column-gap: var(--space-7);
  }

  .page-head-inner > * {
    grid-column: 1;
  }

  .page-stamp {
    display: block;
    grid-column: 2;
    grid-row: 1 / span 4;
    align-self: center;
    text-wrap: balance;
    animation-delay: 240ms;
  }

  .quicknav {
    top: 84px;
  }

  .quicknav-list {
    flex-wrap: wrap;
    justify-content: center;
    overflow-x: visible;
    padding-block: var(--space-3);
  }

  .category {
    padding-block: var(--space-8);
    scroll-margin-top: 168px;
  }

  .category-head {
    margin-bottom: var(--space-6);
  }
}

@media (min-width: 1200px) {
  .page-title {
    letter-spacing: -0.02em;
  }

  .category-head {
    grid-template-columns: auto minmax(0, 1fr);
    gap: var(--space-6);
  }
}
</style>
