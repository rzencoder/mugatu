import { useProducts } from '@/context/productsContext'
import { Flex, Box } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { Jumbotron, Featured, Carousel, Banner } from '../../components'
import { Layout } from '../../components/layouts'

const items = [
  {
    name: 'shirts',
    link: '/men/catalog?category=shirt&gender=male',
    imageUrl: '/landing/men/shirt.jpg',
    rotate: 4,
  },
  {
    name: 'jeans',
    link: '/men/catalog?category=jeans&gender=male',
    imageUrl: '/landing/men/jeans.jpg',
    rotate: -3,
  },
  {
    name: 'knitwear',
    link: '/men/catalog?category=knitwear&gender=male',
    imageUrl: '/landing/men/jumper.jpg',
    rotate: 2.5,
  },
  {
    name: 'coats & jackets',
    link: '/men/catalog?category=coat&gender=male',
    imageUrl: '/landing/men/jacket.jpg',
    rotate: -3.5,
  },
]

export default function Men() {
  const { updateGender } = useProducts()

  useEffect(() => {
    updateGender('male')
  }, [])

  return (
    <>
      <Head>
        <title>Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex direction="column">
          <Jumbotron
            imageUrl="/landing/men/men-header.jpg"
            buttonText="Shop Now"
            bgColor="#137571"
            gender="men"
          >
            Latest styles now in
          </Jumbotron>
          <Box color="mainBlack" bg="mainWhite" p={3} textTransform="uppercase" textAlign="center">
            get 15% off all new orders{' '}
          </Box>
          <Featured items={items} gender="male" />
          <Banner
            colour="#116bc7"
            bgColour="#137571"
            imageSrc="banner-bg-men.jpg"
            text="dress to impress"
            linkHref="/men/catalog"
          >
            20% off all jackets
          </Banner>
          <Carousel />
        </Flex>
      </Layout>
    </>
  )
}
