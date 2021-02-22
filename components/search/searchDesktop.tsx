import { useSearch } from '@/context/searchContext'
import { formatSearchResult } from '../../utils/'
import { ArrowForwardIcon, CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Button, Input, Link, useColorMode } from '@chakra-ui/react'
import NextLink from 'next/link'
import { SearchResults } from '@/types/searchResults'
import { MutableRefObject } from 'react'

interface SearchDesktopProps {
  showSearch: boolean
  setShowSearch: (showSearch: boolean) => void
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  inputRef: MutableRefObject<HTMLInputElement>
}

const SearchDesktop = ({
  showSearch,
  setShowSearch,
  handleSearchSubmit,
  inputRef,
}: SearchDesktopProps): JSX.Element => {
  const { searchInput, setSearchInput, searchResults } = useSearch()
  const { colorMode } = useColorMode()

  return (
    <Flex position="relative" display={['none', null, 'flex']}>
      <Box opacity={showSearch ? '1' : '0'} transition="opacity 0.3s">
        <form onSubmit={handleSearchSubmit}>
          <Input
            ref={inputRef}
            width={[showSearch ? '400px' : '0']}
            aria-label="search input"
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
                aria-label="clear search value"
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
                aria-label="submit search"
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
          boxShadow={`3px 3px 5px ${colorMode === 'light' ? '#ddd' : '#222'}`}
        >
          <Flex direction="column">
            {searchResults.map((result: SearchResults, index: number) => {
              const productNames = formatSearchResult(searchInput, result)
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

export default SearchDesktop
