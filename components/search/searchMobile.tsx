import { useSearch } from '@/context/searchContext'
import { formatSearchResult } from '../../utils/'
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  DrawerCloseButton,
  Input,
  Flex,
  Link,
  Button,
  useColorMode,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { SearchResults } from '@/types/searchResults'
import { useRef } from 'react'

interface SearchMobileProps {
  showSearch: boolean
  setShowSearch: (showSearch: boolean) => void
  handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const SearchMobile = ({
  showSearch,
  setShowSearch,
  handleSearchSubmit,
}: SearchMobileProps): JSX.Element => {
  const { searchResults, searchInput, setSearchInput } = useSearch()
  const { colorMode } = useColorMode()
  const searchFieldRef = useRef()

  return (
    <Drawer
      isOpen={showSearch}
      placement="left"
      onClose={() => setShowSearch(false)}
      initialFocusRef={searchFieldRef}
    >
      <DrawerOverlay>
        <DrawerContent bg={colorMode === 'light' ? 'mainWhite' : 'mainBlack'}>
          <DrawerHeader>
            <Box>search</Box>
            <DrawerCloseButton top="15px" right="18px" />
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={handleSearchSubmit}>
              <Box position="relative">
                <Input
                  value={searchInput}
                  aria-label="search input"
                  onChange={(e) => setSearchInput(e.target.value)}
                  ref={searchFieldRef}
                />
                <Button
                  type="submit"
                  aria-label="submit search query"
                  variant="icon"
                  color={colorMode === 'light' ? '#333' : 'mainWhite'}
                  position="absolute"
                  top="8px"
                  right="-4px"
                  zIndex="10"
                >
                  <SearchIcon />
                </Button>
              </Box>
            </form>
            <Flex display="column" p="10px 0">
              <Flex display="column" p="10px 0">
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
                            p="5px 0"
                          >
                            <Box width="75%">
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
              {searchInput.length > 1 && (
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
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}

export default SearchMobile
