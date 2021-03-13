export const bag = [
  {
    id: 'abc',
    name: 'Blue jeans',
    slug: 'blue-jeans',
    price: 29.99,
    rrp: 39.99,
    colour: 'blue',
    category: 'jeans',
    popular: true,
    gender: 'female',
    sizes: [
      { size: '6', stock: 10 },
      { size: '8', stock: 2 },
      { size: '10', stock: 0 },
    ],
    image: {
      url: '123',
    },
    quantity: 1,
    selectedSize: '6',
  },
  {
    id: 'def',
    name: 'Black Shirt',
    slug: 'black-shirt',
    price: 19.99,
    rrp: 24.99,
    colour: 'black',
    category: 'shirt',
    popular: false,
    gender: 'male',
    sizes: [
      { size: 's', stock: 10 },
      { size: 'm', stock: 2 },
      { size: 'l', stock: 0 },
    ],
    image: {
      url: '456',
    },
    quantity: 1,
    selectedSize: 's',
  },
]
