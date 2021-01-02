import { Box, Flex } from '@chakra-ui/react'

export default function Footer(): JSX.Element {
  return (
    <footer>
      <Flex justifyContent="space-between" fontSize="12px" padding="5px 30px">
        <Box>&copy; {new Date().getFullYear()}</Box>
        <Box>Github Repo</Box>
      </Flex>
    </footer>
  )
}
