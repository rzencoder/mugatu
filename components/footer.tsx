import { Box, Flex, Link, Heading, Divider, useColorMode } from '@chakra-ui/react'

export default function Footer(): JSX.Element {
  const { colorMode } = useColorMode()
  return (
    <footer>
      <Box
        color={colorMode === 'light' ? '#444' : '#ccc'}
        fontSize="14px"
        display={['none', null, 'block']}
      >
        <Divider width="90%" margin="5px auto" />
        <Flex padding="5px 10px" width="85%" margin="0 auto" justifyContent="space-between">
          <Flex direction="column">
            <Heading as="h5" fontSize="20px" p="10px 0">
              Help
            </Heading>
            <Link variant="footer" href="#">
              FAQ&apos;s
            </Link>
            <Link variant="footer" href="#">
              Track Order
            </Link>
            <Link variant="footer" href="#">
              Delivery
            </Link>
            <Link variant="footer" href="#">
              Returns
            </Link>
            <Link variant="footer" href="#">
              Contact Us
            </Link>
          </Flex>
          <Flex direction="column">
            <Heading as="h5" fontSize="20px" p="10px 0">
              About
            </Heading>
            <Link variant="footer" href="#">
              About Us
            </Link>
            <Link variant="footer" href="#">
              Careers
            </Link>
            <Link variant="footer" href="#">
              Media
            </Link>
            <Link variant="footer" href="#">
              Contact Us
            </Link>
          </Flex>
          <Flex direction="column">
            <Heading as="h5" fontSize="20px" p="10px 0">
              More
            </Heading>
            <Link variant="footer" href="#">
              Legal
            </Link>
            <Link variant="footer" href="#">
              Privacy
            </Link>
            <Link variant="footer" href="#">
              Accessibility
            </Link>
          </Flex>
          <Flex></Flex>
          <Flex></Flex>
        </Flex>
      </Box>
      <Box>
        <Divider width="90%" margin="5px auto" />
        <Flex justifyContent="space-between" fontSize="12px" padding="5px 30px">
          <Box>&copy; {new Date().getFullYear()}</Box>
          <Box>Github Repo</Box>
        </Flex>
      </Box>
    </footer>
  )
}
