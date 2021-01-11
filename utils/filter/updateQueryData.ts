const updateQueryData = (filterType, newFilterItem, filterQuery) => {
  const newSearchQuery = filterQuery.map((el) => {
    if (el.name === filterType) {
      if (filterType === 'price') {
        return { ...el, query: newFilterItem }
      } else if (newFilterItem === 'all') {
        return { ...el, query: [] }
      } else if (el.query.includes(newFilterItem)) {
        const query = el.query.filter((item) => item !== newFilterItem)
        return { ...el, query }
      } else {
        return { ...el, query: [...el.query, newFilterItem] }
      }
    } else return el
  })
  return newSearchQuery
}

export default updateQueryData
