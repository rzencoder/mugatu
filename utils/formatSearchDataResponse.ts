const formatSearchDataResponse = (data) => {
  const flattenedSearchData = data.reduce((acc, item) => {
    return acc.concat(Object.keys(item).map((key) => item[key]))
  }, [])
  return flattenedSearchData.filter((el, index) => index % 2 === 0)
}

export default formatSearchDataResponse
