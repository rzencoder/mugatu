import { Box, Flex } from '@chakra-ui/react'

const Banner = ({ colour, bgColour, imageSrc, text, children }) => {
  return (
    <Box
      height={['160px', '200px', '250px', '300px']}
      fontFamily="Montserrat"
      fontSize="80px"
      color="white"
      textAlign="center"
      position="relative"
    >
      <Box height="100%" backgroundImage={`url(${imageSrc})`} backgroundSize="cover"></Box>
      <Box top="0" width="100%" height="100%" bg={bgColour} opacity="0.6" position="absolute"></Box>
      <Flex
        position="absolute"
        top="0"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Flex display="column" justifyContent="center" textAlign="center" m="35px 0 15px">
          <Box
            bg={colour}
            transform="skewX(-5deg)"
            fontSize={['24px', '35px', '50px', '60px']}
            p="0 20px"
            width="fit-content"
            m="0 auto"
          >
            {text}
          </Box>
          <Box fontSize={['28px', '40px', '60px', '80px']} m="20px auto 5px">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Banner
