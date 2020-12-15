import { Box, Flex } from '@chakra-ui/react'

export default function Footer(): JSX.Element {
  return (
    <footer>
      <Flex bg="grey">
        <Box>About</Box>
        <Box>Delivery</Box>
        <Box>Mens</Box>
      </Flex>
    </footer>
  )
}
