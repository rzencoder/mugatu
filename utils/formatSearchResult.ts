const formatSearchResult = (searchInput, result) => {
  const re = new RegExp(searchInput, 'i')
  const nameExcludingInput = result.item.name.replace(re, ',')
  return nameExcludingInput.split(',')
}

export default formatSearchResult
