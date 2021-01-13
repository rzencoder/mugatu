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
        <Box height="500px" position="relative">
          <Box
            backgroundImage="url('/jumbotron.jpg')"
            backgroundSize="cover"
            filter="brightness(0.7)"
            height="inherit"
            width="inherit"
            alignItems="center"
            justifyContent="center"
          ></Box>
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
                size="3xl"
                fontFamily="comfortaa"
                textAlign="center"
              >
                So Hot Right Now
              </Heading>
              <Button
                bg="transparent"
                borderRadius="0"
                border="2px solid"
                borderColor="mainWhite"
                marginTop="50px"
              >
                Shop Sale
              </Button>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  )
}
