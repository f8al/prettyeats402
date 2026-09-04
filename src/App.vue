<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <AppHeader />
  <main id="main" class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<style scoped>
.app-main {
  /* Clears the fixed header */
  padding-top: 72px;
  min-height: 60vh;
}

@media (min-width: 900px) {
  .app-main {
    padding-top: 84px;
  }
}
</style>
