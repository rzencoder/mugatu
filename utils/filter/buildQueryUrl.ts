const buildQueryUrl = (productPage, gender, filterData) => {
  const query = filterData
    .filter((el) => el.query.length !== 0)
    .map((el) => {
      if (el.name === 'product' && productPage !== 'home') {
        return `$product=${productPage}&`
      } else {
        return `${el.name}=${el.query}&`
      }
    })
  const filterQuery = query.join('').slice(0, -1)
  const urlQuery = `gender=${gender}&${filterQuery}`
  if (urlQuery.includes(productPage) || productPage === 'home') {
    return urlQuery
  } else {
    return `${urlQuery}&product=${productPage}`
  }
}

export default buildQueryUrl
