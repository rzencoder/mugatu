const getPageGender = (path: string): string => {
  return path.includes('women') ? 'female' : 'male'
}

export default getPageGender
