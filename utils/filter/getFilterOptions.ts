import { FilterOptions } from './../../types/filterOptions'

const getFilterOptions = (
  options: FilterOptions[][],
  path: string,
  gender: string
): FilterOptions[] => {
  const optionsForGender = gender === 'female' ? options[0] : options[1]
  path.split('/')
  if (path[path.length - 1] !== 'catalog') {
    return optionsForGender.filter((el) => el.name !== 'product')
  }
  return optionsForGender
}

export default getFilterOptions
