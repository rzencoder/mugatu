import Head from 'next/head'
import { Layout } from '../components'
import { Box, Flex, Heading, Button } from '@chakra-ui/react'
import { useGender } from '../context/genderContext'

export default function Home() {
  const { gender } = useGender()
  console.log(gender)

  return (
    <div>
      <Head>
        <title>Mugatu</title>
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
            color="white"
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
              <Button bg="transparent" borderRadius="0" border="2px solid white" marginTop="50px">
                Shop Sale
              </Button>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </div>
  )
}
