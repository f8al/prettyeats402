import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**
 * Hash history keeps deep links working on GitHub Pages without a
 * server-side rewrite or the 404.html SPA hack.
 */
const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: "Pretty's Eats | Omaha's Loaded Rice Bowl & Baked Potato Food Truck" } },
  {
    path: '/menu',
    name: 'menu',
    component: () => import('../views/MenuView.vue'),
    meta: { title: "Menu | Pretty's Eats" },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: "Our Story | Pretty's Eats" },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: "Contact | Pretty's Eats" },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: "Page not found | Pretty's Eats" },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    /*
     * In-page anchors are left to the view that owns them. Scrolling to `el`
     * here would ignore the target's scroll-margin-top and land it under the
     * fixed header — and it runs after the view has already placed the jump,
     * so it would win and undo it. The view can also re-land the jump once
     * webfonts reflow the page, which this cannot.
     */
    if (to.hash) return false
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = to.meta.title
})

export default router
