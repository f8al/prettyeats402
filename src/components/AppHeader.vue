<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { site, navLinks } from '../data/site'
import logo from '../assets/images/logo.webp'
import SocialIcon from './SocialIcon.vue'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

const closeMenu = () => {
  menuOpen.value = false
}

watch(
  () => route.fullPath,
  () => closeMenu(),
)

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const onKeydown = (e) => {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }">
    <div class="header-inner container">
      <RouterLink to="/" class="brand" aria-label="Pretty's Eats — home">
        <img :src="logo" alt="" width="44" height="43" class="brand-logo" />
        <span class="brand-text">
          <span class="brand-name">Pretty’s</span>
          <span class="brand-sub">Eats</span>
        </span>
      </RouterLink>

      <nav class="nav-desktop" aria-label="Main">
        <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" class="nav-link">
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <a :href="site.phoneHref" class="btn btn-primary btn-sm call-btn">
          <SocialIcon name="phone" :size="16" />
          <span class="call-label">Call to order</span>
        </a>

        <button
          class="burger"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <span class="burger-bar" />
          <span class="burger-bar" />
          <span class="burger-bar" />
        </button>
      </div>
    </div>

    <!-- Mobile overlay nav -->
    <Transition name="drawer">
      <div v-if="menuOpen" id="mobile-nav" class="mobile-nav">
        <nav aria-label="Mobile">
          <RouterLink
            v-for="(link, i) in navLinks"
            :key="link.to"
            :to="link.to"
            class="mobile-link"
            :style="{ '--i': i }"
          >
            <span class="mobile-link-index">0{{ i + 1 }}</span>
            {{ link.label }}
            <SocialIcon name="arrow" :size="20" class="mobile-link-arrow" />
          </RouterLink>
        </nav>

        <div class="mobile-foot">
          <a :href="site.phoneHref" class="btn btn-primary mobile-call">
            <SocialIcon name="phone" :size="18" />
            {{ site.phone }}
          </a>
          <p class="mobile-note">Omaha, NE · Mon–Fri 11a–7p · Sat 12p–8p</p>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  transition: border-color 0.3s ease;
  border-bottom: 1px solid transparent;
}

/*
 * The blur lives on a pseudo-element rather than on .header itself. An element
 * with backdrop-filter becomes the containing block for its position: fixed
 * descendants — with it on .header, the mobile drawer inside resolved its
 * inset against the 72px header instead of the viewport and collapsed to a
 * sliver. Keeping .header filter-free keeps the drawer anchored to the screen.
 */
.header::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 12, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.header.is-scrolled::before,
.header.is-open::before {
  opacity: 1;
}

.header.is-scrolled,
.header.is-open {
  border-bottom-color: var(--color-border);
}

.header-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  height: 72px;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.brand-logo {
  width: 44px;
  height: auto;
  filter: drop-shadow(0 0 12px rgba(255, 35, 64, 0.45));
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 0.95;
  font-family: var(--font-display);
  text-transform: uppercase;
}

.brand-name {
  font-size: 1.15rem;
  letter-spacing: 0.02em;
}

.brand-sub {
  font-size: 0.8rem;
  color: var(--color-red);
  letter-spacing: 0.32em;
}

.nav-desktop {
  display: none;
  gap: var(--space-6);
}

.nav-link {
  position: relative;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text-dim);
  padding-block: var(--space-2);
  transition: color 0.2s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 2px;
  background: var(--gradient-flame);
  border-radius: 2px;
  transition: right 0.25s ease;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  right: 0;
}

.nav-link.router-link-active {
  color: var(--color-text);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.call-label {
  display: none;
}

.burger {
  display: grid;
  place-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border-strong);
}

.burger-bar {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.2s ease;
}

.is-open .burger-bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.is-open .burger-bar:nth-child(2) {
  opacity: 0;
}

.is-open .burger-bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ---- Mobile drawer ---- */

.mobile-nav {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  /* dvh tracks the shrinking viewport as iOS shows/hides its browser bars,
     so the drawer is never cut off behind them. vh is the fallback. */
  height: calc(100vh - 72px);
  height: calc(100dvh - 72px);
  background: var(--color-bg);
  padding: var(--space-6) var(--container-pad)
    calc(var(--space-7) + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.mobile-nav::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(80% 50% at 50% 0%, rgba(255, 35, 64, 0.16), transparent 70%);
  pointer-events: none;
}

.mobile-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5) 0;
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-display);
  font-size: clamp(2rem, 11vw, 2.75rem);
  text-transform: uppercase;
  line-height: 1;
  animation: slide-in 0.35s ease backwards;
  animation-delay: calc(var(--i) * 60ms);
}

.mobile-link-index {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-red);
  letter-spacing: 0.1em;
}

.mobile-link-arrow {
  margin-left: auto;
  color: var(--color-text-mute);
}

.mobile-link.router-link-active {
  color: var(--color-gold);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
}

.mobile-foot {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding-top: var(--space-6);
}

.mobile-call {
  width: 100%;
  font-size: 1.05rem;
}

.mobile-note {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-mute);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

/* ---- Desktop ---- */

@media (min-width: 900px) {
  .header-inner {
    height: 84px;
  }

  .nav-desktop {
    display: flex;
  }

  .burger {
    display: none;
  }

  .call-label {
    display: inline;
  }

  .brand-logo {
    width: 50px;
  }

  .brand-name {
    font-size: 1.35rem;
  }
}
</style>
