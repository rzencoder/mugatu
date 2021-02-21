const filterOptions = [
  [
    {
      name: 'product',
      items: ['all', 'coat', 'dress', 'jacket', 'jeans', 'jumper', 'skirt', 'sport', 'top'],
    },
    {
      name: 'colour',
      items: ['all', 'black', 'blue', 'green', 'grey', 'pink', 'red', 'white', 'yellow'],
    },
    { name: 'size', items: ['all', '6', '8', '10', '12', '14', '16'] },
    { name: 'price', items: ['0'] },
  ],
  [
    {
      name: 'product',
      items: ['all', 'coat', 'jacket', 'jeans', 'jumper', 'shirt', 'sport'],
    },
    {
      name: 'colour',
      items: ['all', 'black', 'blue', 'brown', 'grey', 'pink', 'orange', 'white'],
    },
    { name: 'size', items: ['all', 's', 'm', 'l', 'xl'] },
    { name: 'price', items: ['0'] },
  ],
  [
    { name: 'gender', items: ['all', 'women', 'men'] },
    {
      name: 'product',
      items: [
        'all',
        'coat',
        'dress',
        'jacket',
        'jeans',
        'jumper',
        'shirt',
        'skirt',
        'sport',
        'top',
      ],
    },
    {
      name: 'colour',
      items: ['all', 'black', 'blue', 'brown', 'grey', 'pink', 'orange', 'red', 'white', 'yellow'],
    },
    { name: 'size', items: ['all', 's', 'm', 'l', 'xl', '6', '8', '10', '12', '14', '16'] },
    { name: 'price', items: ['0'] },
  ],
]

export default filterOptions
