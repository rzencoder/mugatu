import { Box, Flex, Link, Heading, Button } from '@chakra-ui/react'

export default function Jumbotron({ bgColor, imageUrl, buttonText, children }): JSX.Element {
  return (
    <Link height="600px" width="100%" href="/women/catalog" position="relative">
      <Box
        bgImage={`url('${imageUrl}')`}
        bgPosition="top"
        bgRepeat="no-repeat"
        bgSize="cover"
        height="inherit"
      />
      <Box
        position="absolute"
        top="0"
        height="inherit"
        width="inherit"
        backgroundColor={bgColor}
        opacity="0.2"
      ></Box>
      <Flex
        position="absolute"
        top="0"
        height="inherit"
        width="inherit"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" margin="0 auto" width={['92%', '80%', '70%']}>
          <Heading
            as="h2"
            color="white"
            fontFamily="Montserrat"
            fontWeight="900"
            fontStyle="italic"
            textTransform="uppercase"
            textAlign="center"
            fontSize={['42px', '55px', '65px', '80px']}
          >
            {children}
          </Heading>
          <Button
            color="white"
            fontSize={['md', 'lg', 'xl']}
            width={['50%', '45%', '40%', '30%']}
            margin="50px auto 0"
          >
            {buttonText}
          </Button>
        </Flex>
      </Flex>
    </Link>
  )
}
