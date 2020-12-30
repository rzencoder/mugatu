import { useState, useContext, createContext } from 'react'

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

  return {
    products,
  }
}
