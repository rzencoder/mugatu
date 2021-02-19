import { FilterQuery } from '@/types/filterQuery'

const checkAnyFilterSelected = (query: FilterQuery[], initialQuery: FilterQuery[]): boolean => {
  return !(JSON.stringify(query) === JSON.stringify(initialQuery))
}

export default checkAnyFilterSelected
