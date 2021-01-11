const displayTickOnSelected = (option, query, queries) => {
  const searchItem = queries.find((q) => q.name === option)
  if (!searchItem) return false
  if (searchItem.query.length === 0 && query === 'all') return true
  if (searchItem.query.some((el) => el === query)) {
    return true
  }
}

export default displayTickOnSelected
