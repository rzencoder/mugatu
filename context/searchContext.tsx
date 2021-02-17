import { useState, useContext, createContext, useEffect } from 'react'

const searchContext = createContext({})

export function ProvideSearch({ children }): JSX.Element {
  const search = useProvideSearch()
  return <searchContext.Provider value={search}>{children}</searchContext.Provider>
}

export const useSearch = (): any => {
  return useContext(searchContext)
}

const useProvideSearch = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchData, setSearchData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchProducts, setSearchProducts] = useState([])
  const [loadSearchProducts, setLoadSearchProducts] = useState(false)

  async function fetchSearchProducts() {
    try {
      const url = `/api/searchResults?search=${searchInput}`
      const response = await fetch(url)
      const { data } = await response.json()
      setSearchProducts(data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  async function fetchSearchData() {
    try {
      const url = `/api/searchdata`
      const response = await fetch(url)
      const { data } = await response.json()
      setSearchData(data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSearchData()
  }, [])

  useEffect(() => {
    if (loadSearchProducts) {
      fetchSearchProducts()
      setLoadSearchProducts(false)
    }
  }, [searchInput, loadSearchProducts])

  return {
    searchInput,
    setSearchInput,
    searchData,
    searchResults,
    setSearchResults,
    searchProducts,
    setSearchProducts,
    setLoadSearchProducts,
    loading,
    error,
  } as const
}
