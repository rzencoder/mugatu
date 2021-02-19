import { FilterQuery } from '@/types/filterQuery'

const updateQueryData = (
  filterType: string,
  newFilterItem: string,
  filterQuery: FilterQuery[]
): FilterQuery[] => {
  console.log(newFilterItem)
  const newSearchQuery = filterQuery.map((el) => {
    if (el.name === filterType) {
      if (filterType === 'price') {
        return { ...el, query: newFilterItem.split(',') }
      } else if (newFilterItem === 'all') {
        return { ...el, query: [] }
      }
      if (el.query.includes(newFilterItem)) {
        const query = el.query.filter((item) => item !== newFilterItem)
        return { ...el, query }
      } else {
        return { ...el, query: [...el.query, newFilterItem] }
      }
    } else return el
  })
  console.log(newSearchQuery)
  return newSearchQuery
}

export default updateQueryData
