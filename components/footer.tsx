import { Box, Flex, useColorMode } from '@chakra-ui/react'

export default function Footer(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <footer>
      <Flex justifyContent="space-between" fontSize="12px" padding="5px 30px">
        <Box>(c) 2020</Box>
        <Box>Github Repo</Box>
      </Flex>
    </footer>
  )
}
