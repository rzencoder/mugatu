const getPageGender = (path) => {
  return path.includes('women') ? 'female' : 'male'
}

export default getPageGender
