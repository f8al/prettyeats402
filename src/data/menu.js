/**
 * Menu data — the single source of truth for the menu page and the home page.
 *
 * Transcribed from the current Pretty's Eats menu (Canva, "Pretty's Loaded Baked
 * Potato & Loaded Rice Bowls"). Prices, sizes and flavors are exactly as printed;
 * only spelling and capitalisation are tidied for the web.
 *
 * Item shape:
 *   name, price, size?, description?
 *   steps?   — ordered build-your-own groups: { order, label, title, options[] }
 *   choices? — one option group { label, options[] }, or an array of them
 *   includes?— "comes with" list
 *   extras?  — price modifiers: { label, price }
 *   note?    — a short plain-language footnote
 */

/** Shared between both lemonade sizes — edit once, both update. */
const LEMONADE_FLAVORS = [
  'Classic',
  'Cherry',
  'Strawberry',
  'Mango',
  'Pineapple',
  'Blue Raspberry',
  'Grape',
]

const BOBA_FLAVORS = ['Strawberry', 'Mango', 'Peach', 'Pineapple']

export const menu = [
  {
    id: 'build-your-own',
    name: 'Build Your Own',
    kicker: 'The house signature',
    blurb:
      'Pick your base, pick your protein, then pick four toppings. One price, built exactly how you want it.',
    accent: 'red',
    items: [
      {
        name: 'Loaded Baked Potato, Rice Bowl or Nachos',
        price: '$15',
        description:
          'Three steps, one plate: start with a base, add a protein, then load it up with four toppings.',
        steps: [
          {
            order: 'First',
            label: 'Pick one',
            title: "Pretty's Base",
            options: ["Pretty's Baked Potato", "Pretty's White Rice", "Pretty's Loaded Nachos"],
          },
          {
            order: 'Second',
            label: 'Pick 1 protein',
            title: "Pretty's Protein",
            options: [
              'Chili',
              'Steak',
              'Chicken',
              'Black Bean',
              'Shrimp',
              'Pork Asada Steak',
              'Bacon Bits',
              'Sausage',
            ],
          },
          {
            order: 'Third',
            label: 'Pick 4 toppings',
            title: "Pretty's Toppings",
            options: [
              'Butter',
              'Ranch',
              'Chives',
              'Salsa',
              'Spicy Ranch',
              'Crispy Onion',
              'Broccoli',
              'Jalapeño',
              'Shredded Cheese',
              'Sautéed Peppers & Onion',
              'Nacho Cheese Dip',
              'Sour Cream',
            ],
          },
        ],
        extras: [
          { label: 'Each additional protein', price: '+$5' },
          { label: 'Each additional topping', price: '+$1' },
        ],
      },
    ],
  },
  {
    id: 'lemonades',
    name: 'Shake-Up Lemonade',
    kicker: 'Shaken to order',
    blurb: 'Hand-shaken, ice cold, and the fastest way to fix an Omaha summer.',
    accent: 'gold',
    items: [
      {
        name: 'Shake-Up Lemonade',
        price: '$8',
        size: '24 oz',
        description: 'Shaken to order over ice.',
        choices: [
          { label: 'Flavors', options: LEMONADE_FLAVORS },
          { label: 'Boba flavors', options: BOBA_FLAVORS },
        ],
        extras: [{ label: 'Add boba', price: '+$3' }],
      },
      {
        name: 'Large Shake-Up Lemonade',
        price: '$10',
        size: '32 oz',
        description: 'Same shake-up, more of it.',
        choices: [
          { label: 'Flavors', options: LEMONADE_FLAVORS },
          { label: 'Boba flavors', options: BOBA_FLAVORS },
        ],
        extras: [{ label: 'Add boba', price: '+$3' }],
      },
    ],
  },
  {
    id: 'snow-cones',
    name: 'Snow Cones',
    kicker: 'Ten flavors deep',
    blurb: 'Fluffy shaved ice, drenched in whichever flavor you point at.',
    accent: 'teal',
    items: [
      {
        name: 'Snow Cone',
        price: '$8',
        size: '24 oz',
        description: 'Shaved ice packed and poured over.',
        choices: {
          label: 'Flavors',
          options: [
            'Cherry',
            'Strawberry',
            'Pineapple',
            'Orange',
            'Grape',
            'Lemon-Lime',
            'Blue Raspberry',
            'Fruit Punch',
            'Sassy Apple',
            'Tiger Blood',
          ],
        },
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
        price: '$8',
        size: '24 oz',
        description: 'Blended fresh to order.',
        choices: {
          label: 'Flavors',
          options: ['Wildberry', 'Strawberry', 'Strawberry Banana', 'Mango', 'Peach'],
        },
        note: 'Whipped topping available.',
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
        price: '$8',
        size: '24 oz',
        description: 'Hand-spun, spoon-thick.',
        choices: {
          label: 'Flavors',
          options: ['Vanilla', 'Chocolate', 'Strawberry', 'Butterscotch'],
        },
        note: 'Whipped topping available.',
      },
    ],
  },
  {
    id: 'floats-and-water',
    name: 'Floats & Water',
    kicker: 'Cold and simple',
    blurb: 'The old-school one, and something to wash it all down.',
    accent: 'gold',
    items: [
      {
        name: 'A&W Root Beer Float',
        price: '$8',
        size: '24 oz',
        description: 'Root beer and ice cream, the way it has always been done.',
      },
      {
        name: 'Bottled Water',
        price: '$3',
        size: '20 oz',
        description: 'Ice cold.',
      },
    ],
  },
]

export const menuNote =
  'Prices and options match what we serve out the window. Cash and card both welcome.'
