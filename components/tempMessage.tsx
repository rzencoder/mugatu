import { Box, Flex, Link, useColorMode } from '@chakra-ui/react'
import Image from 'next/image'

const TempMessage = () => {
  const { colorMode } = useColorMode()

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="500px"
      padding="50px"
      textAlign="center"
      fontSize="18px"
    >
      <Box fontSize="32px" fontWeight="700" p="0 0 30px">
        thanks for checking out the site
      </Box>
      <Box mt="20px">you can find the code on Github or view my other work on my portfolio...</Box>
      <Flex justifyContent="space-between" width="200px" m="30px 0 10px">
        <Link href="https://github.com/rzencoder/mugatu" rel="noreferrer noopener" target="_blank">
          <Box filter={colorMode === 'dark' ? 'invert()' : 'none'}>
            <Image src="/icons/github.png" width="40" height="40" />
          </Box>
        </Link>
        <Link href="https://ahamer.netlify.app" rel="noreferrer noopener" target="_blank">
          <Box filter={colorMode === 'dark' ? 'invert()' : 'none'}>
            <Image src="/icons/portfolio.png" width="40" height="40" />
          </Box>
        </Link>
      </Flex>
      <Flex direction="column" p="10px" mt="20px">
        <Box>or continue to browse the site</Box>
        <Flex
          justifyContent="space-between"
          p="10px"
          width={['300px', null, '500px']}
          textTransform="uppercase"
          fontWeight="700"
          fontSize="24px"
        >
          <Link href="/women">women</Link>
          <Link href="/">home</Link>
          <Link href="/men">men</Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TempMessage
