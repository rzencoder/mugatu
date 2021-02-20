import { useSearch } from '@/context/searchContext'
import { useMediaQuery } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { MutableRefObject, useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import SearchMobile from './searchMobile'
import SearchDesktop from './searchDesktop'
import searchOptions from '../../config/search'

interface SearchProps {
  showSearch: boolean
  setShowSearch: (showSearch: boolean) => void
  inputRef: MutableRefObject<HTMLInputElement>
}

const Search = ({ showSearch, setShowSearch, inputRef }: SearchProps): JSX.Element => {
  const { searchInput, searchData, setSearchResults, setLoadSearchProducts } = useSearch()
  const fuse = new Fuse(searchData, searchOptions)
  const router = useRouter()
  // 767px is the third breakpoint with the chakra styling
  const [isLargerThan767] = useMediaQuery('(min-width: 767px)')
  const [screenDesktop, setScreenDesktop] = useState(false)
  // Handle updating search results on search input change
  useEffect(() => {
    if (searchInput.length > 1) {
      const result = fuse.search(searchInput)
      setSearchResults(result)
    } else if (searchInput.length === 0) {
      setSearchResults([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  useEffect(() => {
    setScreenDesktop(isLargerThan767)
  }, [isLargerThan767])

  // handle updating matching search products on submitting a search input
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoadSearchProducts(true)
    setShowSearch(false)
    router.push('/search')
  }

  if (screenDesktop) {
    return (
      <SearchDesktop
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        handleSearchSubmit={handleSearchSubmit}
        inputRef={inputRef}
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
