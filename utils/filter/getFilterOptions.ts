const getFilterOptions = (options, router, gender) => {
  const optionsForGender = gender === 'female' ? options[0] : options[1]
  const path = router.pathname.split('/')
  if (path[path.length - 1] !== 'catalog') {
    return optionsForGender.filter((el) => el.name !== 'product')
  }
  return optionsForGender
}

export default getFilterOptions
