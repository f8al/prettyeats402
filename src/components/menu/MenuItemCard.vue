<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})

/** `choices` may be one group or several — normalise so the template has one shape. */
const choiceGroups = computed(() => {
  const { choices } = props.item
  if (!choices) return []
  return Array.isArray(choices) ? choices : [choices]
})

const hasDetails = computed(() => {
  const { includes, extras, steps, note } = props.item
  return Boolean(
    choiceGroups.value.length || includes?.length || extras?.length || steps?.length || note,
  )
})
</script>

<template>
  <article class="item">
    <div
      class="item-inner"
      :class="{ 'item-inner--solo': !hasDetails, 'item-inner--steps': item.steps?.length }"
    >
      <div class="item-main">
        <div class="item-head">
          <h3 class="item-name">{{ item.name }}</h3>
          <span class="item-leader" aria-hidden="true" />
          <p class="item-pricing">
            <span class="item-price">{{ item.price }}</span>
            <span v-if="item.size" class="item-size">{{ item.size }}</span>
          </p>
        </div>
        <p class="item-desc">{{ item.description }}</p>
      </div>

      <div v-if="hasDetails" class="item-side">
        <ol v-if="item.steps?.length" class="steps" role="list">
          <li v-for="step in item.steps" :key="step.order" class="step">
            <p class="step-head">
              <span class="step-order">{{ step.order }}</span>
              <span class="step-label">{{ step.label }}</span>
            </p>
            <p class="step-title">{{ step.title }}</p>
            <ul class="options" role="list">
              <li v-for="option in step.options" :key="option" class="option">
                {{ option }}
              </li>
            </ul>
          </li>
        </ol>

        <div v-for="group in choiceGroups" :key="group.label" class="detail">
          <p class="detail-label">{{ group.label }}</p>
          <ul class="options" role="list">
            <li v-for="option in group.options" :key="option" class="option">
              {{ option }}
            </li>
          </ul>
        </div>

        <div v-if="item.includes?.length" class="detail">
          <p class="detail-label">Comes with</p>
          <ul class="includes" role="list">
            <li v-for="inc in item.includes" :key="inc" class="include">{{ inc }}</li>
          </ul>
        </div>

        <ul v-if="item.extras?.length" class="extras" role="list">
          <li v-for="extra in item.extras" :key="extra.label" class="extra">
            <span>{{ extra.label }}</span>
            <span class="extra-price">{{ extra.price }}</span>
          </li>
        </ul>

        <p v-if="item.note" class="item-note">{{ item.note }}</p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.item {
  /* The card is the query container; .item-inner reacts to its width, so a
     card that lands in a wide slot splits in two without a viewport guess. */
  container-type: inline-size;
  position: relative;
  padding: var(--space-5) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg-soft) 100%);
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

/* Accent hairline across the top — grows on hover, transform only */
.item::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent, var(--color-red)), transparent);
  opacity: 0.6;
  transform: scaleX(0.3);
  transform-origin: left center;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

/* Soft accent wash in the corner, stands in for photography */
.item::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    70% 80% at 100% 0%,
    var(--accent-soft, var(--color-red-soft)),
    transparent 65%
  );
  pointer-events: none;
}

.item:hover,
.item:focus-within {
  transform: translateY(-3px);
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-lift);
}

.item:hover::before,
.item:focus-within::before {
  transform: scaleX(1);
  opacity: 1;
}

.item-inner {
  position: relative;
  display: grid;
  gap: var(--space-4);
}

/* ---- Name / price row ---- */

.item-head {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
}

.item-name {
  flex: 1 1 auto;
  min-width: 0;
  font-size: clamp(1.25rem, 5.2vw, 1.6rem);
  line-height: 1.05;
}

.item-leader {
  flex: 1 1 1.5rem;
  min-width: 1rem;
  height: 0;
  border-bottom: 1px dashed var(--color-border-strong);
}

.item-pricing {
  flex: 0 0 auto;
  text-align: right;
}

.item-price {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 7vw, 2.15rem);
  line-height: 0.95;
  color: var(--color-gold);
}

.item-size {
  display: block;
  margin-top: 0.2rem;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-mute);
}

.item-desc {
  margin-top: var(--space-3);
  max-width: 46ch;
  font-size: 0.95rem;
  color: var(--color-text-dim);
}

/* ---- Choices / includes / extras ---- */

.item-side {
  display: grid;
  gap: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

.detail-label {
  margin-bottom: var(--space-2);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-text-mute);
}

/* ---- Build-your-own steps ---- */

.steps {
  display: grid;
  gap: var(--space-4);
}

.step {
  position: relative;
  padding-left: var(--space-4);
  border-left: 2px solid var(--accent, var(--color-red));
}

.step-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}

.step-order {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  color: var(--accent, var(--color-red));
}

.step-label {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-mute);
}

.step-title {
  margin-bottom: var(--space-2);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.item-note {
  font-size: 0.82rem;
  color: var(--color-text-mute);
  font-style: italic;
}

.options,
.includes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.option {
  padding: 0.4rem 0.8rem;
  border-radius: var(--radius-pill);
  background: var(--accent-soft, var(--color-red-soft));
  border: 1px solid var(--accent-soft, var(--color-red-soft));
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text);
}

.include {
  padding: 0.3rem 0.7rem;
  border-radius: var(--radius-pill);
  border: 1px dashed var(--color-border-strong);
  font-size: 0.8rem;
  color: var(--color-text-dim);
}

.extras {
  display: grid;
  gap: var(--space-1);
  padding-top: var(--space-3);
  border-top: 1px dashed var(--color-border);
}

.extra {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  font-size: 0.82rem;
  color: var(--color-text-mute);
}

.extra-price {
  font-weight: 700;
  color: var(--color-gold);
}

@media (min-width: 640px) {
  .item {
    padding: var(--space-5);
  }
}

@media (min-width: 900px) {
  .item {
    padding: var(--space-6);
  }
}

/* ---- Wide cards split in two, driven by the card's own width ---- */

@container (min-width: 36rem) {
  .item-inner {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    gap: var(--space-6);
    align-items: start;
  }

  .item-inner--solo {
    grid-template-columns: minmax(0, 1fr);
  }

  .item-side {
    padding-top: 0;
    padding-left: var(--space-5);
    border-top: 0;
    border-left: 1px solid var(--color-border);
  }

  /*
   * A build-your-own item carries three option groups — far too tall for the
   * narrow side column, which would strand a column of dead space beside it.
   * Let it keep the full width and run the steps side by side instead.
   */
  .item-inner--steps {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-5);
  }

  .item-inner--steps .item-side {
    padding-left: 0;
    padding-top: var(--space-4);
    border-left: 0;
    border-top: 1px solid var(--color-border);
  }

  .item-inner--steps .steps {
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: var(--space-5);
    align-items: start;
  }
}
</style>
