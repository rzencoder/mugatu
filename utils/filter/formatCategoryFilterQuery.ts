const formatCategoryFilterQuery = (path) => {
  let category = path[path.length - 1] !== 'catalog' ? path[path.length - 1] : ''
  if (category && category !== 'jeans') {
    if (category[category.length - 1] === 's') {
      if (category[category.length - 2] === 'e') {
        category = category.slice(0, -2)
      } else {
        category = category.slice(0, -1)
      }
    }
  }
  if (category) {
    category = `product=${category}`
  }
  return category
}

export default formatCategoryFilterQuery
