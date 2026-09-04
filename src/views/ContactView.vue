<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { hours, site, socials } from '../data/site'
import SocialIcon from '../components/SocialIcon.vue'
import ContactForm from '../components/contact/ContactForm.vue'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/** "HH:MM" (24h) -> minutes from midnight. */
function toMinutes(value) {
  const [h, m] = String(value).split(':')
  return Number(h) * 60 + Number(m || 0)
}

/**
 * Both lookups below are derived from the `hours` table in src/data/site.js, so
 * editing hours there is enough — nothing here needs to be kept in sync by hand.
 *
 * WINDOWS[day]   -> [openMinutes, closeMinutes] or null when closed
 * ROW_FOR_DAY[day] -> index of the `hours` row that covers that day
 */
const WINDOWS = Array(7).fill(null)
const ROW_FOR_DAY = Array(7).fill(-1)

hours.forEach((row, index) => {
  for (const day of row.weekdays ?? []) {
    ROW_FOR_DAY[day] = index
    if (row.open && row.opens && row.closes) {
      WINDOWS[day] = [toMinutes(row.opens), toMinutes(row.closes)]
    }
  }
})

const now = ref(new Date())
let timer

onMounted(() => {
  timer = window.setInterval(() => {
    now.value = new Date()
  }, 60000)
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
})

/** Minutes from midnight -> "7:00 PM". */
function formatTime(totalMinutes) {
  const hour = Math.floor(totalMinutes / 60)
  const minute = totalMinutes % 60
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const twelve = hour % 12 === 0 ? 12 : hour % 12
  return `${twelve}:${String(minute).padStart(2, '0')} ${suffix}`
}

/** The next day with a serving window, described from `fromDay`. */
function nextOpening(fromDay) {
  for (let step = 1; step <= 7; step += 1) {
    const day = (fromDay + step) % 7
    if (WINDOWS[day]) {
      return {
        when: step === 1 ? 'tomorrow' : DAY_NAMES[day],
        at: formatTime(WINDOWS[day][0]),
      }
    }
  }
  return null
}

const todayRow = computed(() => ROW_FOR_DAY[now.value.getDay()])

const status = computed(() => {
  const date = now.value
  const day = date.getDay()
  const minutes = date.getHours() * 60 + date.getMinutes()
  const window_ = WINDOWS[day]
  const next = nextOpening(day)

  const backSoon = next ? `Back ${next.when} at ${next.at}.` : ''

  if (!window_) {
    return { open: false, label: 'Closed today', detail: backSoon }
  }

  const [start, end] = window_

  if (minutes < start) {
    return { open: false, label: 'Not open yet', detail: `Window opens at ${formatTime(start)}.` }
  }

  if (minutes >= end) {
    return { open: false, label: 'Closed for the day', detail: backSoon }
  }

  return { open: true, label: 'Open right now', detail: `Serving until ${formatTime(end)}.` }
})

const instagram = socials.find((s) => s.icon === 'instagram') ?? socials[0]

const reachCards = [
  {
    icon: 'phone',
    title: 'Call the truck',
    value: site.phone,
    note: 'Quickest answer you will get. Orders, catering, anything.',
    cta: 'Tap to call',
    href: site.phoneHref,
    external: false,
  },
  {
    icon: 'mail',
    title: 'Email us',
    value: site.email,
    note: 'Best for catering details, bookings and the long questions.',
    cta: 'Tap to email',
    href: site.emailHref,
    external: false,
  },
  {
    icon: 'pin',
    title: 'Where to find us',
    value: 'Omaha, NE',
    note: 'We move around — follow along to catch us.',
    cta: `Follow on ${instagram.label}`,
    href: instagram.url,
    external: true,
  },
]
</script>

<template>
  <div class="contact">
    <!-- ---------- Header ---------- -->
    <section class="hero">
      <div class="container hero-inner">
        <p class="eyebrow">Get in touch</p>
        <h1 class="hero-title">Holler at <span class="text-gradient">the truck</span></h1>
        <p class="hero-lead">
          Questions, feedback, catering — we like hearing from the people we feed. Call, email or
          drop a note below and we'll get back to you as soon as we can.
        </p>
      </div>
    </section>

    <!-- ---------- Contact cards ---------- -->
    <section class="section reach" aria-labelledby="reach-heading">
      <div class="container">
        <h2 id="reach-heading" class="sr-only">Ways to reach us</h2>
        <ul class="reach-grid">
          <li v-for="(card, i) in reachCards" :key="card.title" class="reach-item" :style="{ '--i': i }">
            <a
              class="card reach-card"
              :href="card.href"
              :target="card.external ? '_blank' : undefined"
              :rel="card.external ? 'noopener noreferrer' : undefined"
            >
              <span class="reach-icon" aria-hidden="true">
                <SocialIcon :name="card.icon" :size="20" />
              </span>
              <h3 class="reach-title">{{ card.title }}</h3>
              <span class="reach-value">{{ card.value }}</span>
              <span class="reach-note">{{ card.note }}</span>
              <span class="reach-cta">
                {{ card.cta }}
                <SocialIcon name="arrow" :size="16" />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- ---------- Form + schedule ---------- -->
    <section class="section body">
      <div class="container body-grid">
        <div class="body-main">
          <h2 class="block-title">Send us a note</h2>
          <p class="block-lead">
            Nothing fancy — a name, an email we can write back to, and what you need from us.
          </p>
          <ContactForm />
        </div>

        <aside class="body-side">
          <!-- Hours -->
          <div class="card panel">
            <p class="eyebrow">Our schedule</p>
            <h2 class="block-title panel-title">Serving you daily</h2>

            <p class="status" :class="status.open ? 'is-open' : 'is-shut'">
              <span class="status-dot" :class="{ 'is-live': status.open }" aria-hidden="true"></span>
              <span class="status-label">{{ status.label }}</span>
              <span class="status-detail">{{ status.detail }}</span>
            </p>

            <ul class="hours-list">
              <li
                v-for="(row, i) in hours"
                :key="row.days"
                class="hours-row"
                :class="{ 'is-today': i === todayRow }"
              >
                <span class="hours-days">
                  {{ row.days }}
                  <span v-if="i === todayRow" class="today-tag">Today</span>
                </span>
                <span class="hours-time" :class="{ 'is-closed': !row.open }">{{ row.time }}</span>
              </li>
            </ul>

            <p class="panel-foot">
              <SocialIcon name="clock" :size="15" />
              Status is worked out from your device's clock. The truck moves around Omaha, so check
              the socials before you roll up.
            </p>
          </div>

          <!-- Good to know -->
          <div class="card panel">
            <h2 class="block-title panel-title">Good to know</h2>
            <div class="know">
              <h3 class="know-title">Ordering</h3>
              <p class="know-text">
                No app, no online cart. You order at the window, or you call it in at
                <a :href="site.phoneHref" class="inline-link">{{ site.phone }}</a>.
              </p>
            </div>
            <div class="know">
              <h3 class="know-title">Catering &amp; bookings</h3>
              <p class="know-text">
                Parties, work lunches, whatever you've got going — email or call with the date, the
                headcount and where you want us parked.
              </p>
            </div>
          </div>

          <!-- Socials -->
          <div class="card panel">
            <h2 class="block-title panel-title">Follow the truck</h2>
            <p class="know-text">
              Where we're parked and what's coming out of the window.
            </p>
            <ul class="social-list">
              <li v-for="s in socials" :key="s.label">
                <a
                  class="social-link"
                  :href="s.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`${s.label} — ${site.name} (opens in a new tab)`"
                >
                  <SocialIcon :name="s.icon" :size="18" />
                  <span class="social-name">{{ s.label }}</span>
                  <span class="social-handle">{{ s.handle }}</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ---------- Header ---------- */

.hero {
  position: relative;
  overflow: hidden;
  padding-block: var(--space-7) var(--space-5);
}

.hero::before {
  content: '';
  position: absolute;
  inset: -40% -25% auto -25%;
  height: 420px;
  background:
    radial-gradient(45% 55% at 25% 60%, rgba(255, 35, 64, 0.28), transparent 70%),
    radial-gradient(40% 50% at 78% 45%, rgba(255, 176, 32, 0.16), transparent 70%);
  pointer-events: none;
}

.hero-inner {
  position: relative;
  animation: rise 0.5s ease-out both;
}

.hero-title {
  margin-top: var(--space-3);
  font-size: clamp(2.7rem, 13vw, 6rem);
}

.hero-lead {
  margin-top: var(--space-4);
  max-width: 52ch;
  font-size: clamp(1rem, 3.6vw, 1.15rem);
  color: var(--color-text-dim);
}

/* ---------- Contact cards ---------- */

.reach {
  padding-block: var(--space-6);
}

.reach-grid {
  display: grid;
  gap: var(--space-4);
}

.reach-item {
  animation: rise 0.5s ease-out both;
  animation-delay: calc(var(--i) * 90ms + 80ms);
}

.reach-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  height: 100%;
  padding: var(--space-5);
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.reach-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-strong);
  background: var(--color-surface-2);
}

.reach-card:focus-visible {
  border-radius: var(--radius-lg);
}

.reach-icon {
  display: grid;
  place-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-red-soft);
  color: var(--color-red-bright);
}

.reach-title {
  font-size: 1.15rem;
  letter-spacing: 0.04em;
}

.reach-value {
  font-size: clamp(0.98rem, 3.6vw, 1.05rem);
  font-weight: 700;
  color: var(--color-gold);
  overflow-wrap: anywhere;
}

.reach-note {
  font-size: 0.9rem;
  color: var(--color-text-dim);
}

.reach-cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-3);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-mute);
  transition: color 0.2s ease;
}

.reach-cta :deep(svg) {
  transition: transform 0.2s ease;
}

.reach-card:hover .reach-cta {
  color: var(--color-text);
}

.reach-card:hover .reach-cta :deep(svg) {
  transform: translateX(4px);
}

/* ---------- Body layout ---------- */

.body {
  padding-top: var(--space-5);
}

.body-grid {
  display: grid;
  gap: var(--space-7);
}

.block-title {
  font-size: clamp(1.6rem, 6.5vw, 2.1rem);
}

.block-lead {
  margin-top: var(--space-3);
  margin-bottom: var(--space-5);
  max-width: 46ch;
  color: var(--color-text-dim);
  font-size: 0.98rem;
}

.body-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.panel {
  padding: var(--space-5);
}

.panel-title {
  margin-top: var(--space-2);
  font-size: clamp(1.35rem, 5.5vw, 1.6rem);
}

/* ---------- Hours ---------- */

.status {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1);
  margin-top: var(--space-4);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
}

.status.is-open {
  border-color: rgba(47, 216, 196, 0.4);
  background: var(--color-teal-soft);
}

.status.is-shut {
  border-color: rgba(255, 35, 64, 0.32);
  background: var(--color-red-soft);
}

.status-dot {
  width: 9px;
  height: 9px;
  border-radius: var(--radius-pill);
  background: var(--color-red);
  grid-column: 1;
  grid-row: 1;
  align-self: center;
  margin-left: 1px;
}

.status-dot.is-live {
  background: var(--color-teal);
  animation: pulse 2.2s ease-in-out infinite;
}

.status-label {
  grid-column: 2;
  grid-row: 1;
  padding-left: var(--space-3);
  font-family: var(--font-display);
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.status-detail {
  grid-column: 1 / -1;
  grid-row: 2;
  font-size: 0.88rem;
  color: var(--color-text-dim);
}

.hours-list {
  margin-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.hours-row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border);
}

.hours-row:last-child {
  border-bottom: none;
}

.hours-row.is-today {
  padding-inline: var(--space-3);
  margin-inline: calc(var(--space-3) * -1);
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--color-gold-soft), transparent);
  border-bottom-color: transparent;
}

.hours-days {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-weight: 600;
  font-size: 0.95rem;
}

.is-today .hours-days {
  color: var(--color-gold);
}

.today-tag {
  padding: 0.1rem 0.5rem;
  border-radius: var(--radius-pill);
  background: var(--color-gold);
  color: #140505;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hours-time {
  margin-left: auto;
  font-size: 0.92rem;
  color: var(--color-text-dim);
  font-variant-numeric: tabular-nums;
}

.hours-time.is-closed {
  color: var(--color-red-bright);
  font-weight: 600;
}

.panel-foot {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-4);
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--color-text-mute);
}

.panel-foot :deep(svg) {
  flex: none;
  margin-top: 3px;
}

/* ---------- Good to know ---------- */

.know {
  margin-top: var(--space-4);
}

.know-title {
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  color: var(--color-gold);
}

.know-text {
  margin-top: var(--space-2);
  font-size: 0.93rem;
  color: var(--color-text-dim);
}

.inline-link {
  color: var(--color-text);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  white-space: nowrap;
}

.inline-link:hover {
  color: var(--color-gold);
}

/* ---------- Socials ---------- */

.social-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-height: 48px;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  color: var(--color-text-dim);
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.social-link:hover {
  color: var(--color-text);
  border-color: var(--color-red);
  transform: translateX(3px);
}

.social-link:focus-visible {
  border-radius: var(--radius-sm);
}

.social-name {
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--color-text);
}

.social-handle {
  margin-left: auto;
  font-size: 0.85rem;
  overflow-wrap: anywhere;
}

/* ---------- Motion ---------- */

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.45;
    transform: scale(1.35);
  }
}

/* ---------- Breakpoints ---------- */

@media (min-width: 640px) {
  .hero {
    padding-block: var(--space-8) var(--space-5);
  }

  .reach-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }
}

@media (min-width: 900px) {
  .reach-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .body-grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
    gap: var(--space-7);
    align-items: start;
  }

  .panel {
    padding: var(--space-6);
  }
}

@media (min-width: 1200px) {
  .body-grid {
    grid-template-columns: minmax(0, 1.2fr) minmax(360px, 0.8fr);
    gap: var(--space-8);
  }

  .hero-lead {
    font-size: 1.2rem;
  }
}
</style>
