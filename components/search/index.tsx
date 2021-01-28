import { useSearch } from '@/context/searchContext'
import { useMediaQuery } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import SearchMobile from './searchMobile'
import SearchDesktop from './searchDesktop'
import searchOptions from '../../config/search'

const Search = ({ showSearch, setShowSearch }) => {
  const { searchInput, searchData, setSearchResults, setLoadSearchProducts } = useSearch()
  const fuse = new Fuse(searchData, searchOptions)
  const router = useRouter()
  // 767px is the third breakpoint with the chakra styling
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)')

  // Handle updating search results on search input change
  useEffect(() => {
    if (searchInput.length > 1) {
      const result = fuse.search(searchInput)
      setSearchResults(result)
    } else if (searchInput.length === 0) {
      setSearchResults([])
    }
  }, [searchInput])

  // handle updating matching search products on submitting a search input
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setLoadSearchProducts(true)
    setShowSearch(false)
    router.push('/search')
  }

  if (isLargerThan767) {
    return (
      <SearchDesktop
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleSearchSubmit={handleSearchSubmit}
      />
    )
  }

  return (
    <SearchMobile
      setShowSearch={setShowSearch}
      showSearch={showSearch}
      handleSearchSubmit={handleSearchSubmit}
    />
  )
}

export default Search
