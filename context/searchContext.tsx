import { Item } from '@/types/item'
import { SearchData } from '@/types/searchData'
import { SearchResults } from '@/types/searchResults'
import { useState, useContext, createContext, useEffect } from 'react'

interface SearchContextInterface {
  searchInput: string
  setSearchInput: (searchInput: string) => void
  searchData: SearchData[]
  searchResults: SearchResults[]
  setSearchResults: (searchResults: SearchResults[]) => void
  searchProducts: Item[]
  setSearchProducts: (searchProducts: Item[]) => void
  setLoadSearchProducts: (loadSearchProducts: boolean) => void
  loading: boolean
  error: boolean
}

const searchContext = createContext<SearchContextInterface | null>(null)

export function ProvideSearch({ children }: { children: React.ReactNode }): JSX.Element {
  const search = useProvideSearch()
  return <searchContext.Provider value={search}>{children}</searchContext.Provider>
}

export const useSearch = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
