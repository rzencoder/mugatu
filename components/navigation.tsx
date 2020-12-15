import { Box, Flex, Image, useColorMode } from '@chakra-ui/react'
import { invertScale } from 'framer-motion/types/value/use-inverted-scale'

export default function Navigation(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { colorMode, toggleColorMode } = useColorMode()
  console.log(colorMode)
  return (
    <nav>
      <Flex
        bg={colorMode === 'light' ? '#fff' : '#000'}
        justifyContent="space-around"
        alignItems="center"
        p={3}
      >
        <Box>WOMEN</Box>
        <Image
          filter={colorMode === 'dark' ? 'invert()' : 'none'}
          src="/logo.png/"
          alt="logo"
          boxSize="100px"
          marginLeft="-20px"
        />
        <Box>MEN</Box>
      </Flex>
      <Flex bg="#444" height="40px" padding="5px">
        <Flex margin="0 auto" width="90%" alignItems="center" justifyContent="space-between">
          <Box
            backgroundImage="url(/icons/search.png)"
            backgroundSize="contain"
            width="25px"
            height="25px"
            padding="5px"
            margin="0 10px"
          />
          <Flex>
            <Box
              backgroundImage="url(/icons/account.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
            />
            <Box
              backgroundImage="url(/icons/heart.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
            />
            <Box
              backgroundImage="url(/icons/bag.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
            />
            <Box
              backgroundImage="url(/icons/moon.png)"
              backgroundSize="contain"
              width="25px"
              height="25px"
              padding="5px"
              margin="0 10px"
              onClick={toggleColorMode}
            />
          </Flex>
        </Flex>
      </Flex>
    </nav>
  )
}
