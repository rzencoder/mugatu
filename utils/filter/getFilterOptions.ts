import { FilterOptions } from './../../types/filterOptions'

const getFilterOptions = (
  options: FilterOptions[][],
  path: string,
  gender: string
): FilterOptions[] => {
  const optionsForGender =
    gender === 'female' ? options[0] : gender === 'male' ? options[1] : options[2]
  const splitPath = path.split('/')
  if (splitPath.length > 3) {
    return optionsForGender.filter((el) => el.name !== 'product')
  }
  return optionsForGender
}

export default getFilterOptions
