<script setup>
import { site } from '../data/site'
import logo from '../assets/images/logo.webp'
</script>

<template>
  <section class="notfound">
    <div class="container nf-inner">
      <div class="nf-mark">
        <p class="nf-code" aria-hidden="true">404</p>
        <img :src="logo" alt="" class="nf-logo" width="120" height="118" decoding="async" />
      </div>

      <p class="eyebrow">Page not found</p>
      <h1 class="nf-title">You pulled up to the <span class="text-gradient">wrong window</span></h1>

      <p class="nf-lead">
        Whatever you came for isn't parked here. Maybe we drove off with it. Either way, the food is
        two taps away.
      </p>

      <div class="nf-actions">
        <RouterLink to="/" class="btn btn-primary nf-btn">Back to home</RouterLink>
        <RouterLink to="/menu" class="btn btn-outline nf-btn">See the menu</RouterLink>
      </div>

      <p class="nf-help">
        Still stuck? Call the truck at
        <a :href="site.phoneHref" class="nf-link">{{ site.phone }}</a>.
      </p>
    </div>
  </section>
</template>

<style scoped>
.notfound {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: 72vh;
  padding-block: var(--space-8);
}

.notfound::before {
  content: '';
  position: absolute;
  inset: auto -30% -35% -30%;
  height: 460px;
  background: radial-gradient(45% 55% at 50% 60%, rgba(255, 35, 64, 0.22), transparent 70%);
  pointer-events: none;
}

.nf-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: rise 0.5s ease-out both;
}

.nf-mark {
  display: grid;
  place-items: center;
}

.nf-code {
  grid-area: 1 / 1;
  font-family: var(--font-display);
  font-size: clamp(9rem, 44vw, 20rem);
  line-height: 0.8;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 2px var(--color-border-strong);
  user-select: none;
  pointer-events: none;
}

.nf-logo {
  grid-area: 1 / 1;
  width: clamp(72px, 21vw, 116px);
  height: auto;
  filter: drop-shadow(0 0 24px rgba(255, 35, 64, 0.5));
  animation: bob 4.5s ease-in-out infinite;
}

.eyebrow {
  margin-top: var(--space-5);
}

.nf-title {
  margin-top: var(--space-3);
  max-width: 16ch;
  font-size: clamp(2.4rem, 11vw, 5rem);
}

.nf-lead {
  margin-top: var(--space-4);
  max-width: 44ch;
  font-size: clamp(1rem, 3.8vw, 1.12rem);
  color: var(--color-text-dim);
}

.nf-actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: var(--space-3);
  width: 100%;
  max-width: 320px;
  margin-top: var(--space-6);
}

.nf-btn {
  min-height: 50px;
}

.nf-btn:focus-visible {
  border-radius: var(--radius-pill);
}

.nf-help {
  margin-top: var(--space-5);
  font-size: 0.9rem;
  color: var(--color-text-mute);
}

.nf-link {
  color: var(--color-gold);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  white-space: nowrap;
}

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

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@media (min-width: 640px) {
  .nf-actions {
    flex-direction: row;
    justify-content: center;
    max-width: none;
  }

  .nf-code {
    -webkit-text-stroke-width: 3px;
  }
}
</style>
