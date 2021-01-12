import { useState, useContext, createContext, useEffect } from 'react'
import { sortProducts } from '../utils'

const productsContext = createContext(null)

export function ProvideProducts({ children }) {
  const products = useProvideProducts()
  return <productsContext.Provider value={products}>{children}</productsContext.Provider>
}

export const useProducts = () => {
  return useContext(productsContext)
}

const useProvideProducts = () => {
  const [products, setProducts] = useState({})
  const [gender, setGender] = useState('female')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState(`../api/search?`)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const url = `../api/${query}&gender=${gender}`
        const response = await fetch(url)
        const { data } = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchProducts()
    console.log('fetching data')
  }, [query, gender])

  const getFilteredProduct = (filter) => {
    setQuery(filter)
  }

  const sort = (sortType) => {
    const sortedProducts = sortProducts(products, sortType)
    setProducts(sortedProducts)
  }

  const updateGender = (newGender) => {
    if (newGender !== gender) {
      setGender(newGender)
    }
  }

  return {
    products,
    loading,
    error,
    gender,
    updateGender,
    getFilteredProduct,
    sort,
  }
}
