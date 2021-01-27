import { useSearch } from '@/context/searchContext'
import { Flex, Input, Box, useColorMode, Link, Button } from '@chakra-ui/react'
import Fuse from 'fuse.js'
import { useEffect } from 'react'
import NextLink from 'next/link'
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/dist/client/router'

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  minMatchCharLength: 0,
  // location: 0,
  threshold: 0.3,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: ['name', 'colour', 'gender'],
}

const Search = ({ showSearch, setShowSearch }) => {
  const {
    searchInput,
    setSearchInput,
    searchData,
    searchResults,
    setSearchResults,
    setLoadSearchProducts,
  } = useSearch()
  const fuse = new Fuse(searchData, options)
  const { colorMode } = useColorMode()
  const router = useRouter()

  useEffect(() => {
    if (searchInput.length > 1) {
      const result = fuse.search(searchInput)
      setSearchResults(result)
    }
  }, [searchInput])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setLoadSearchProducts(true)
    setShowSearch(false)
    router.push('/search')
  }

  return (
    <Flex position="relative" display={['none', null, 'flex']}>
      <Box opacity={showSearch ? '1' : '0'} transition="opacity 0.3s">
        <form onSubmit={handleSearchSubmit}>
          <Input
            width={[showSearch ? '400px' : '0']}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            transition="width 0.4s"
            bg="mainWhite"
            color="#333"
            height="34px"
            borderRadius="25px"
          />
          {showSearch && (
            <>
              <Button
                variant="icon"
                position="absolute"
                zIndex="10"
                top="2px"
                right="22px"
                color="#333"
                p="5px"
                fontSize="14px"
                onClick={() => {
                  setSearchInput('')
                  setShowSearch(false)
                }}
              >
                <CloseIcon />
              </Button>
              <Button
                variant="icon"
                bg="mainBlack"
                borderRadius="50%"
                position="absolute"
                top="-1px"
                zIndex="10"
                right="-17px"
                fontSize="24px"
                p="5px"
                width="36px"
                height="36px"
                type="submit"
              >
                <ArrowForwardIcon />
              </Button>
            </>
          )}
        </form>
      </Box>
      {searchInput.length > 1 && showSearch && (
        <Flex
          direction="column"
          position="absolute"
          top="36px"
          zIndex="10"
          p="20px 30px 15px"
          bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}
          minWidth="600px"
          borderRadius="30px"
        >
          <Flex direction="column">
            {searchResults.map((result, index) => {
              const re = new RegExp(searchInput, 'i')
              const nameExcludingInput = result.item.name.replace(re, ',')
              const productNames = nameExcludingInput.split(',')
              const link = `/${result.item.gender === 'female' ? 'women' : 'men'}/catalog/${
                result.item.slug
              }`
              if (index < 5) {
                return (
                  <NextLink href={link} passHref key={`search-${result.item.name}`}>
                    <Link p="5px 0">
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        textTransform="lowercase"
                      >
                        <Box>
                          <Box as="span">{productNames[0]}</Box>
                          <Box as="span" fontWeight="700">
                            {productNames[1] !== undefined && searchInput}
                          </Box>
                          <Box as="span">{productNames[1]}</Box>
                        </Box>
                        <Box fontSize="14px">
                          {result.item.gender === 'female' ? 'women' : 'men'}
                        </Box>
                      </Flex>
                    </Link>
                  </NextLink>
                )
              }
            })}
          </Flex>
          <Flex justifyContent="center" m="10px 0 0" fontSize="18px">
            {searchResults.length === 0 ? (
              'no matches found'
            ) : searchResults.length > 1 ? (
              <form onSubmit={handleSearchSubmit}>
                <Button type="submit" variant="transparentBg" fontSize="18px">
                  see all {searchResults.length} matching items
                </Button>
              </form>
            ) : (
              ''
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default Search
