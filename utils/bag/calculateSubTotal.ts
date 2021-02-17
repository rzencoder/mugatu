const calculateSubTotal = (bag) => {
  const total = bag.reduce((acc, cur) => {
    return cur.price * cur.quantity + acc
  }, 0)
  return parseFloat(total.toFixed(2))
}

export default calculateSubTotal
