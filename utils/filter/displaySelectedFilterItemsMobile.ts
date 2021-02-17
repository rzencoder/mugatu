const displaySelectedFilterItemsMobile = (option, queries) => {
  const item = [...queries].find((el) => el.name === option)
  let selectedOptions
  if (option === 'price') {
    if (item.query[0] === 0 && item.query[1] === 150) {
      return null
    } else {
      selectedOptions = '£' + item.query.join('-£')
    }
  } else {
    selectedOptions = item.query.join(', ')
  }
  return selectedOptions
}

export default displaySelectedFilterItemsMobile
