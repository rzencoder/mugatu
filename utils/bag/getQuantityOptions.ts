const getQuantityOptions = (item) => {
  const options = []
  const size = item.sizes.find((el) => el.size === item.selectedSize)
  for (let i = 1; i <= size.stock; i++) {
    if (i > 10) break
    options.push(i)
  }
  return options
}

export default getQuantityOptions
