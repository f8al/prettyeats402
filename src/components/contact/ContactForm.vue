<script setup>
import { nextTick, reactive, ref } from 'vue'
import { site } from '../../data/site'

/* ------------------------------------------------------------------
 * FORM_ENDPOINT — the ONE line to change to put this form on a backend.
 *
 * Leave it as '' (the default) and the form works with zero setup: it
 * validates, then composes a pre-filled mailto: link to site.email and
 * hands the message off to the visitor's mail app. Nothing is sent from
 * the page and nothing is faked — the visitor still presses send.
 *
 * Paste a form-relay endpoint here — Formspree ('https://formspree.io/f/xxxxxxxx'),
 * Getform, Basin, Formsubmit, a Worker of your own — and the same form
 * switches to a real AJAX submission: POST, JSON body, `Accept: application/json`.
 * No other code changes are needed. Those services expect exactly this shape.
 * ------------------------------------------------------------------ */
const FORM_ENDPOINT = ''

const form = reactive({ firstName: '', lastName: '', email: '', message: '' })
const errors = reactive({ firstName: '', email: '', message: '' })

const attempted = ref(false)
// 'idle' | 'sending' | 'sent' | 'handoff' | 'error'
const state = ref('idle')

const formEl = ref(null)

// Deliberately loose: catches typos and empty junk without rejecting
// perfectly legal addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const validators = {
  firstName: () => (form.firstName.trim() ? '' : 'We need a name to greet you by.'),
  email: () => {
    const value = form.email.trim()
    if (!value) return 'We need an email address to write back to.'
    return EMAIL_RE.test(value) ? '' : 'That address looks off — mind checking it?'
  },
  message: () => (form.message.trim() ? '' : 'Tell us what you need and we will take it from there.'),
}

function validateField(name) {
  errors[name] = validators[name]()
}

function validateAll() {
  Object.keys(validators).forEach(validateField)
  return !Object.values(errors).some(Boolean)
}

function onBlur(name) {
  // Don't scold someone for tabbing through an empty field they haven't filled yet.
  if (attempted.value || form[name].trim()) validateField(name)
}

function onInput(name) {
  if (errors[name]) validateField(name)
}

function describedBy(...ids) {
  const list = ids.filter(Boolean).join(' ')
  return list || undefined
}

async function focusFirstError() {
  await nextTick()
  formEl.value?.querySelector('[aria-invalid="true"]')?.focus()
}

function buildMailtoUrl() {
  const name = [form.firstName.trim(), form.lastName.trim()].filter(Boolean).join(' ')
  const subject = `Website message from ${name}`
  const body = [
    `Name: ${name}`,
    `Email: ${form.email.trim()}`,
    '',
    form.message.trim(),
  ].join('\r\n')
  return `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

async function onSubmit() {
  if (state.value === 'sending') return
  attempted.value = true

  if (!validateAll()) {
    state.value = 'idle'
    focusFirstError()
    return
  }

  // No endpoint configured: hand the message to the visitor's mail app.
  if (!FORM_ENDPOINT) {
    state.value = 'handoff'
    window.location.href = buildMailtoUrl()
    return
  }

  state.value = 'sending'
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      }),
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)

    state.value = 'sent'
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.message = ''
    attempted.value = false
  } catch (err) {
    state.value = 'error'
  }
}
</script>

<template>
  <form ref="formEl" class="form" novalidate @submit.prevent="onSubmit">
    <div class="field-row">
      <p class="field">
        <label class="field-label" for="cf-first">
          First name <span class="req" aria-hidden="true">*</span><span class="sr-only">(required)</span>
        </label>
        <input
          id="cf-first"
          v-model="form.firstName"
          class="field-input"
          type="text"
          name="firstName"
          autocomplete="given-name"
          required
          :aria-invalid="errors.firstName ? 'true' : undefined"
          :aria-describedby="describedBy(errors.firstName && 'cf-first-error')"
          @input="onInput('firstName')"
          @blur="onBlur('firstName')"
        />
        <span v-if="errors.firstName" id="cf-first-error" class="field-error">{{ errors.firstName }}</span>
      </p>

      <p class="field">
        <label class="field-label" for="cf-last">Last name</label>
        <input
          id="cf-last"
          v-model="form.lastName"
          class="field-input"
          type="text"
          name="lastName"
          autocomplete="family-name"
        />
      </p>
    </div>

    <p class="field">
      <label class="field-label" for="cf-email">
        Email <span class="req" aria-hidden="true">*</span><span class="sr-only">(required)</span>
      </label>
      <input
        id="cf-email"
        v-model="form.email"
        class="field-input"
        type="email"
        name="email"
        inputmode="email"
        autocomplete="email"
        required
        :aria-invalid="errors.email ? 'true' : undefined"
        :aria-describedby="describedBy(errors.email && 'cf-email-error')"
        @input="onInput('email')"
        @blur="onBlur('email')"
      />
      <span v-if="errors.email" id="cf-email-error" class="field-error">{{ errors.email }}</span>
    </p>

    <p class="field">
      <label class="field-label" for="cf-message">
        Message <span class="req" aria-hidden="true">*</span><span class="sr-only">(required)</span>
      </label>
      <textarea
        id="cf-message"
        v-model="form.message"
        class="field-input field-textarea"
        name="message"
        rows="6"
        required
        :aria-invalid="errors.message ? 'true' : undefined"
        :aria-describedby="describedBy(errors.message && 'cf-message-error', 'cf-message-hint')"
        @input="onInput('message')"
        @blur="onBlur('message')"
      ></textarea>
      <span id="cf-message-hint" class="field-hint">
        Catering or a booking? Give us the date, the headcount and where you want the truck.
      </span>
      <span v-if="errors.message" id="cf-message-error" class="field-error">{{ errors.message }}</span>
    </p>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary form-submit" :disabled="state === 'sending'">
        {{ state === 'sending' ? 'Sending…' : 'Send it' }}
      </button>
      <span v-if="!FORM_ENDPOINT" class="form-note">
        Opens your email app with everything filled in.
      </span>
    </div>

    <div class="form-result" role="status">
      <p v-if="state === 'sending'" class="result-line">Sending your message…</p>

      <p v-else-if="state === 'sent'" class="result-line is-good">
        Got it. Your message is with us and we'll get back to you as soon as we can.
      </p>

      <p v-else-if="state === 'handoff'" class="result-line is-good">
        Your email app should be opening with the message ready — press send there and it's on
        its way. Nothing leaves this page until you do. If nothing opened, write us at
        <a :href="site.emailHref" class="result-link">{{ site.email }}</a>.
      </p>

      <p v-else-if="state === 'error'" class="result-line is-bad">
        That didn't go through. Try again, or email us straight at
        <a :href="site.emailHref" class="result-link">{{ site.email }}</a> —
        or call <a :href="site.phoneHref" class="result-link">{{ site.phone }}</a>.
      </p>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.field-row {
  display: grid;
  gap: var(--space-5);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
}

.field-label {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-dim);
}

.req {
  color: var(--color-red);
}

.field-input {
  width: 100%;
  min-height: 50px;
  padding: 0.8rem 0.95rem;
  font-family: var(--font-body);
  /* 16px keeps iOS Safari from zooming the page on focus */
  font-size: 16px;
  line-height: 1.5;
  color: var(--color-text);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  -webkit-appearance: none;
  appearance: none;
}

.field-input::placeholder {
  color: var(--color-text-mute);
}

.field-input:hover {
  border-color: var(--color-border-strong);
}

.field-input:focus {
  border-color: var(--color-gold);
  background: var(--color-surface);
  box-shadow: 0 0 0 3px var(--color-gold-soft);
  outline: none;
}

/* The global :focus-visible rule squares corners off — keep ours */
.field-input:focus-visible {
  border-radius: var(--radius-sm);
  outline-offset: 1px;
}

.field-input[aria-invalid='true'] {
  border-color: var(--color-red);
  background: var(--color-red-soft);
}

.field-input[aria-invalid='true']:focus {
  box-shadow: 0 0 0 3px var(--color-red-soft);
}

.field-textarea {
  min-height: 160px;
  resize: vertical;
}

.field-hint {
  font-size: 0.85rem;
  color: var(--color-text-mute);
}

.field-error {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-red-bright);
  animation: error-in 0.2s ease-out;
}

@keyframes error-in {
  from {
    opacity: 0;
    transform: translateY(-3px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.form-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
}

.form-submit {
  width: 100%;
  min-height: 52px;
}

.form-submit:disabled {
  opacity: 0.65;
  cursor: progress;
  transform: none;
}

.form-submit:focus-visible {
  border-radius: var(--radius-pill);
}

.form-note {
  font-size: 0.85rem;
  color: var(--color-text-mute);
}

.form-result:empty {
  display: none;
}

.result-line {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface-2);
  font-size: 0.95rem;
  color: var(--color-text-dim);
  animation: result-in 0.25s ease-out;
}

.result-line.is-good {
  border-color: rgba(47, 216, 196, 0.45);
  background: var(--color-teal-soft);
  color: var(--color-text);
}

.result-line.is-bad {
  border-color: rgba(255, 35, 64, 0.45);
  background: var(--color-red-soft);
  color: var(--color-text);
}

.result-link {
  color: var(--color-gold);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  overflow-wrap: anywhere;
}

@keyframes result-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (min-width: 640px) {
  .field-row {
    grid-template-columns: 1fr 1fr;
  }

  .form-actions {
    flex-direction: row;
    align-items: center;
    gap: var(--space-5);
  }

  .form-submit {
    width: auto;
    min-width: 190px;
  }
}
</style>
