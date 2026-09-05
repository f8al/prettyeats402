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

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Our Story', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
