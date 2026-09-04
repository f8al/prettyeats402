/**
 * Single source of truth for business facts used across the site.
 * All values verified against the live prettyeats402.com content.
 */

export const site = {
  name: "Pretty's Eats",
  shortName: 'Pretty’s Eats',
  tagline: 'The most based food truck in Omaha',
  city: 'Omaha, NE',
  phone: '1 (402) 676-3002',
  phoneHref: 'tel:+14026763002',
  email: 'Prettyeats402@gmail.com',
  emailHref: 'mailto:Prettyeats402@gmail.com',
  location: 'Omaha, NE, USA',
}

export const socials = [
  {
    label: 'Instagram',
    handle: '@PrettyEats402',
    url: 'https://instagram.com/PrettyEats402',
    icon: 'instagram',
  },
  {
    label: 'TikTok',
    handle: '@PrettyEats402',
    url: 'https://www.tiktok.com/@PrettyEats402',
    icon: 'tiktok',
  },
  {
    label: 'Facebook',
    handle: 'PrettyEats',
    url: 'https://www.facebook.com/PrettyEats',
    icon: 'facebook',
  },
]

/**
 * Serving hours.
 *
 * `days` / `time` are what visitors read. `weekdays` / `opens` / `closes` are what
 * the "open right now" indicator on the contact page reads, so keep them in sync:
 *   weekdays — day numbers this row covers (0 = Sunday … 6 = Saturday)
 *   opens/closes — 24-hour local time, "HH:MM"
 * A row with `open: false` needs no opens/closes.
 */
export const hours = [
  {
    days: 'Monday – Friday',
    time: '11:00 AM – 7:00 PM',
    open: true,
    weekdays: [1, 2, 3, 4, 5],
    opens: '11:00',
    closes: '19:00',
  },
  {
    days: 'Saturday',
    time: '12:00 PM – 8:00 PM',
    open: true,
    weekdays: [6],
    opens: '12:00',
    closes: '20:00',
  },
  { days: 'Sunday', time: 'Closed', open: false, weekdays: [0] },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Our Story', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
