import { Box, useColorMode } from '@chakra-ui/react'

const ImageInfo = (): JSX.Element => {
  const { colorMode } = useColorMode()
  return (
    <Box
      bg={colorMode === 'dark' ? 'mainWhite' : 'mainBlack'}
      color={colorMode === 'dark' ? 'mainBlack' : 'mainWhite'}
      pos="absolute"
      bottom="20px"
      right="0"
      fontWeight="600"
      p={2}
      borderRadius="10px 0 0 10px"
    >
      <span role="img" aria-label="">
        🔥
      </span>{' '}
      hot right now
    </Box>
  )
}

export default ImageInfo
