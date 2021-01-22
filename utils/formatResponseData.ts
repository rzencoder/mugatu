const formatResponseData = (data) => {
  return data.map((item) => {
    const newObj = { ...item, id: item.sys.id }
    delete newObj['sys']
    return newObj
  })
}

export default formatResponseData
