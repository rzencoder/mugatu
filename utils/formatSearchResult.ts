import { SearchData } from '@/types/searchData'

interface ResultInterface {
  item: SearchData
  refIndex: number
}

const formatSearchResult = (searchInput: string, result: ResultInterface): string[] => {
  const re = new RegExp(searchInput, 'i')
  const nameExcludingInput = result.item.name.replace(re, ',')
  console.log(nameExcludingInput.split(','))
  return nameExcludingInput.split(',')
}

export default formatSearchResult
