const calculateNumOfItems = (bag) => {
  return bag.reduce((acc, cur) => {
    return acc + parseInt(cur.quantity)
  }, 0)
}

export default calculateNumOfItems
