const checkAnyFilterSelected = (query, initialQuery) => {
  return !(JSON.stringify(query) === JSON.stringify(initialQuery))
}

export default checkAnyFilterSelected
