import { Box, Flex, Link, Heading, Divider, useColorMode } from '@chakra-ui/react'
import footerLinks from 'data/footerLinks'

export default function Footer(): JSX.Element {
  const { colorMode } = useColorMode()

  return (
    <footer>
      <Box
        color={colorMode === 'light' ? '#444' : '#ccc'}
        fontSize="14px"
        display={['none', null, 'block']}
      >
        <Divider width="95%" margin="0 auto 5px" />
        <Flex padding="5px 10px" width="92%" margin="0 auto" justifyContent="flex-start">
          {footerLinks.map((item) => {
            return (
              <Flex key={`footer-${item.title}`} direction="column" minWidth="200px" width="300px">
                <Heading as="h5" fontSize="20px" p="10px 0">
                  {item.title}
                </Heading>
                {item.links.map((link) => {
                  return (
                    <Link
                      key={`footer-link-${link.name}`}
                      href={link.href}
                      padding="1px 0"
                      margin="3px 0"
                      _hover={{
                        color: colorMode === 'light' ? '#777' : '#aaa',
                      }}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </Flex>
            )
          })}
        </Flex>
      </Box>
      <Box>
        <Divider width="95%" margin="5px auto" />
        <Flex justifyContent="space-between" fontSize="12px" padding="5px 30px">
          <Box>&copy; {new Date().getFullYear()}</Box>
          <Box>Github Repo</Box>
        </Flex>
      </Box>
    </footer>
  )
}
