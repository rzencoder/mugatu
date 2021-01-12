const buildQueryUrl = (filterQuery) => {
  const query = filterQuery
    .filter((el) => el.query.length !== 0)
    .map((el) => {
      return `${el.name}=${el.query}&`
    })
  const urlQuery = query.join('').slice(0, -1)
  return urlQuery
}

export default buildQueryUrl
