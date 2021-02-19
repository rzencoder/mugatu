import { FilterOptions } from './../../types/filterOptions'

const getFilterOptions = (
  options: FilterOptions[][],
  path: string,
  gender: string
): FilterOptions[] => {
  const optionsForGender = gender === 'female' ? options[0] : options[1]
  const splitPath = path.split('/')
  if (splitPath.length > 3) {
    return optionsForGender.filter((el) => el.name !== 'product')
  }
  return optionsForGender
}

export default getFilterOptions
