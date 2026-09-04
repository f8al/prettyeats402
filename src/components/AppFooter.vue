<script setup>
import { site, socials, hours, navLinks } from '../data/site'
import logo from '../assets/images/logo.webp'
import SocialIcon from './SocialIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img :src="logo" alt="Pretty's Eats logo" width="72" height="71" class="footer-logo" />
        <p class="footer-blurb">
          Black-owned, family-run, and parked somewhere in Omaha with the fryer already hot.
        </p>
        <ul class="socials">
          <li v-for="s in socials" :key="s.label">
            <a
              :href="s.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${site.name} on ${s.label}`"
              class="social-btn"
            >
              <SocialIcon :name="s.icon" :size="18" />
            </a>
          </li>
        </ul>
      </div>

      <nav class="footer-col" aria-label="Footer">
        <h2 class="footer-title">Explore</h2>
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" class="footer-link">
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="footer-col">
        <h2 class="footer-title">Find us</h2>
        <a :href="site.phoneHref" class="footer-link">{{ site.phone }}</a>
        <a :href="site.emailHref" class="footer-link">{{ site.email }}</a>
        <p class="footer-link is-static">{{ site.location }}</p>
      </div>

      <div class="footer-col">
        <h2 class="footer-title">Hours</h2>
        <p v-for="h in hours" :key="h.days" class="footer-hours">
          <span>{{ h.days }}</span>
          <span :class="{ 'is-closed': !h.open }">{{ h.time }}</span>
        </p>
      </div>
    </div>

    <div class="container footer-bottom">
      <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
      <p class="footer-made">Made in Omaha · 402 forever</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-top: var(--space-8);
  padding-bottom: var(--space-5);
  background: var(--color-bg-soft);
  border-top: 1px solid var(--color-border);
}

.footer::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-flame);
  opacity: 0.7;
}

.footer-grid {
  display: grid;
  gap: var(--space-7);
  grid-template-columns: 1fr;
}

.footer-logo {
  width: 72px;
  height: auto;
  margin-bottom: var(--space-4);
  filter: drop-shadow(0 0 16px rgba(255, 35, 64, 0.35));
}

.footer-blurb {
  color: var(--color-text-dim);
  font-size: 0.95rem;
  max-width: 34ch;
  margin-bottom: var(--space-5);
}

.socials {
  display: flex;
  gap: var(--space-3);
}

.social-btn {
  display: grid;
  place-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-pill);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  color: var(--color-text-dim);
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
}

.social-btn:hover {
  color: #fff;
  background: var(--color-red);
  border-color: var(--color-red);
  transform: translateY(-3px);
}

.footer-col {
  display: flex;
  flex-direction: column;
  /* Links supply their own height for touch, so the column gap stays tight */
  gap: var(--space-1);
}

.footer-title {
  font-size: 1rem;
  letter-spacing: 0.14em;
  color: var(--color-gold);
  margin-bottom: var(--space-2);
}

.footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--color-text-dim);
  font-size: 0.95rem;
  transition: color 0.2s ease, transform 0.2s ease;
  width: fit-content;
}

.footer-link:not(.is-static):hover {
  color: var(--color-text);
  transform: translateX(3px);
}

.footer-hours {
  display: flex;
  flex-direction: column;
  padding-block: var(--space-2);
  font-size: 0.9rem;
  color: var(--color-text-dim);
}

.footer-hours span:first-child {
  color: var(--color-text);
  font-weight: 600;
}

.is-closed {
  color: var(--color-red);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-7);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
  font-size: 0.82rem;
  color: var(--color-text-mute);
}

@media (min-width: 700px) {
  .footer-grid {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: var(--space-6);
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
