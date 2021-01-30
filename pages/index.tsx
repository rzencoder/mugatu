import Head from 'next/head'
import { Layout } from '../components/layouts'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Latest Women&apos;s and Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Box>
          <Box height={['450px', '500px', '550px']} position="relative">
            <Box
              backgroundImage="url('/jumbotron.jpg')"
              backgroundSize="cover"
              backgroundPosition={['30%', 'center']}
              height="inherit"
              width="inherit"
              alignItems="center"
              justifyContent="center"
            />
            <Box
              height="inherit"
              width="100%"
              position="absolute"
              top="0"
              bg="#c000ff"
              opacity="0.2"
            />
            <Flex
              position="absolute"
              top="0"
              alignItems="center"
              justifyContent="center"
              color="mainWhite"
              height="inherit"
              width="100%"
            >
              <Box textAlign="center" marginTop="50px">
                <Heading
                  textTransform="uppercase"
                  as="h2"
                  fontSize={['48px', '66px', '80px', '100px']}
                  width={['fit-content', null, null, '800px']}
                  p={['10px', '10px 20px']}
                  fontFamily="Montserrat"
                  textAlign="center"
                >
                  So Hot Right Now
                </Heading>
                <Button
                  borderRadius="0"
                  border="2px solid"
                  borderColor="mainWhite"
                  marginTop="50px"
                  fontSize={['28px', '34px']}
                  p={['15px 40px']}
                  bg="rgba(255, 255, 255, 0.1)"
                  height="fit-content"
                  width="fit-content"
                >
                  Shop Sale
                </Button>
              </Box>
            </Flex>
          </Box>
          <Box height="300px"></Box>
          <Flex direction={['column', null, 'row']} color="mainWhite">
            <Box
              position="relative"
              width={['100%', null, '50%']}
              height={['450px', '500px', '550px', '600px']}
              bg="url(shop-women.jpg)"
              backgroundSize="cover"
              backgroundPosition="top center"
            >
              <Box
                position="absolute"
                top="0"
                bg="#ff006a"
                opacity="0"
                width="100%"
                height="100%"
              />
              <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
                <Box fontSize="50px" fontWeight="700">
                  latest women&apos;s
                </Box>
                <Button mt="20px" borderColor="mainWhite">
                  Shop Now
                </Button>
              </Flex>
            </Box>
            <Box
              position="relative"
              width={['100%', null, '50%']}
              height={['450px', '500px', '550px', '600px']}
              bg="url(shop-men.jpg)"
              backgroundSize="cover"
              backgroundPosition="top center"
            >
              <Box position="absolute" top="0" bg="#000" width="100%" height="100%" opacity="0.2" />
              <Flex
                position="absolute"
                top="0"
                direction="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <Box fontSize="50px" fontWeight="700">
                  latest men&apos;s
                </Box>
                <Button mt="20px" borderColor="mainWhite">
                  Shop Now
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  )
}
