/**
 * Menu data — prices, sizes and flavors match the live prettyeats402.com menu exactly.
 * Copy (names/descriptions) is rewritten for punch; the facts are untouched.
 */

export const signatureExtras = [
  { label: 'Extra protein', price: '+$5' },
  { label: 'Extra topping', price: '+$1' },
]

export const menu = [
  {
    id: 'rice-bowls',
    name: 'Loaded Rice Bowls',
    kicker: 'The house signature',
    blurb:
      'A bed of seasoned rice buried under melted cheese and your protein of choice. The one we built this truck around.',
    accent: 'red',
    items: [
      {
        name: "Pretty's Rice Bowl",
        price: '$12',
        description:
          'Our signature bowl, loaded to the rim and finished with butter, cheese, sour cream, and chives.',
        choices: {
          label: 'Pick your protein',
          options: ['Chicken', 'Steak', 'Shrimp'],
        },
        includes: ['Butter', 'Cheese', 'Sour cream', 'Chives'],
        extras: signatureExtras,
      },
    ],
  },
  {
    id: 'baked-potatoes',
    name: 'Loaded Baked Potatoes',
    kicker: 'Comfort, maxed out',
    blurb:
      'A hot, split-open potato that disappears under toppings. Hearty enough to be dinner, rich enough to feel like a treat.',
    accent: 'gold',
    items: [
      {
        name: "Pretty's Baked Potato",
        price: '$12',
        description:
          'Oven-hot and piled high with butter, cheese, sour cream, chives, and the protein you pick.',
        choices: {
          label: 'Pick your protein',
          options: ['Chicken', 'Steak', 'Shrimp'],
        },
        includes: ['Butter', 'Cheese', 'Sour cream', 'Chives'],
        extras: signatureExtras,
      },
    ],
  },
  {
    id: 'lemonades',
    name: 'Shake-Up Lemonades',
    kicker: 'Shaken to order',
    blurb: 'Fresh-squeezed, hand-shaken, and cold enough to fix an Omaha summer.',
    accent: 'gold',
    items: [
      {
        name: 'Regular Shake-Up',
        price: '$6',
        size: '24 oz',
        description: 'Hand-shaken lemonade over ice.',
        choices: { label: 'Flavors', options: ['Classic', 'Cherry', 'Strawberry'] },
      },
      {
        name: 'Large Shake-Up',
        price: '$8',
        size: '32 oz',
        description: 'Same shake-up, more of it.',
        choices: { label: 'Flavors', options: ['Classic', 'Cherry', 'Strawberry'] },
      },
    ],
  },
  {
    id: 'twisters',
    name: "Pretty's Twisters",
    kicker: 'Fan favorite',
    blurb: 'Thick, blended, and twisted with the candy of your choice.',
    accent: 'red',
    items: [
      {
        name: "Pretty's Twister",
        price: '$6',
        size: '24 oz',
        description: 'Comes with one mix-in folded all the way through.',
        choices: {
          label: 'Mix-ins',
          options: ['Oreo', "Reese's Peanut Butter Cup", 'Kit-Kat Krumble'],
        },
        extras: [{ label: 'Additional mix-in', price: '+$2' }],
      },
    ],
  },
  {
    id: 'smoothies',
    name: 'Smoothies',
    kicker: 'Fruit-forward',
    blurb: 'Blended thick and cold — the lighter way to cool off.',
    accent: 'teal',
    items: [
      {
        name: 'Smoothie',
        price: '$6',
        size: '24 oz',
        description: 'Blended fresh to order.',
        choices: {
          label: 'Flavors',
          options: ['Wildberry', 'Strawberry', 'Strawberry Banana'],
        },
      },
    ],
  },
  {
    id: 'milkshakes',
    name: 'Milkshakes',
    kicker: 'Classic done right',
    blurb: 'Thick, creamy, and exactly what you remember.',
    accent: 'red',
    items: [
      {
        name: 'Milkshake',
        price: '$6',
        size: '24 oz',
        description: 'Hand-spun, spoon-thick.',
        choices: { label: 'Flavors', options: ['Chocolate', 'Vanilla', 'Strawberry'] },
      },
    ],
  },
  {
    id: 'snow-cones',
    name: 'Snow Cones',
    kicker: 'For the kids (and you)',
    blurb: 'Fluffy shaved ice, drenched in flavor.',
    accent: 'teal',
    items: [
      {
        name: 'Snow Cone',
        price: '$6',
        size: '24 oz',
        description: 'Shaved ice packed and poured over.',
        choices: {
          label: 'Flavors',
          options: ['Cherry', 'Lemon-Lime', 'Strawberry'],
        },
      },
    ],
  },
]

export const menuNote =
  'Prices and options match what we serve out the window. Cash and card both welcome.'
