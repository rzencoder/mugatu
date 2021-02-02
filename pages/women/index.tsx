import { useProducts } from '@/context/productsContext'
import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { Jumbotron, Featured, Carousel, Banner } from '../../components'
import { Layout } from '../../components/layouts'

const items = [
  {
    name: 'dresses',
    link: '/women/catalog?category=dress',
    imageUrl: '/landing/women/dress.jpg',
    rotate: 4,
  },
  {
    name: 'skirts',
    link: '/women/catalog?category=skirt',
    imageUrl: '/landing/women/skirt.jpg',
    rotate: -3,
  },
  {
    name: 'tops',
    link: '/women/catalog?category=top',
    imageUrl: '/landing/women/top.jpg',
    rotate: 2.5,
  },
  {
    name: 'coats & jackets',
    link: '/women/catalog?category=coat',
    imageUrl: '/landing/women/coat.jpg',
    rotate: -3.5,
  },
]

export default function Women() {
  const { updateGender } = useProducts()

  useEffect(() => {
    updateGender('female')
  }, [])

  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/women/women-jumbotron.jpg"
            buttonText="Shop Now"
            buttonHoverColor="#cd41d6"
            bgColor="#b0f"
            gender="women"
            buttonColor="#d219de"
          >
            Party season is here
          </Jumbotron>
          <Flex
            color="#222"
            bg="mainWhite"
            p={3}
            textTransform="lowercase"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            fontSize={['20px', '24px', '26px']}
            fontWeight="700"
          >
            <Box minWidth="60px">
              <Image src="/icons/delivery.png" width="60px" height="60px" role="presentation" />
            </Box>
            <Box ml="20px">free delivery when you spend over £40</Box>
          </Flex>
          <Featured items={items} gender="female" />
          <Banner
            colour="#fb0862"
            bgColour="#c50f53"
            imageSrc="/landing/women/banner-bg-women.jpg"
            text="dress to impress"
            linkHref="/women/catalog"
          >
            20% off all dresses
          </Banner>
          <Carousel />
        </Flex>
      </Layout>
    </>
  )
}
