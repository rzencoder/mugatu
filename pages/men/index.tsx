import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { Jumbotron, Layout, Featured } from '../../components'
import { useGender } from '../../context/genderContext'

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
  const { gender, setGender } = useGender()

  useEffect(() => {
    if (gender !== 'male') {
      setGender('male')
    }
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
            bgColor="#ead510"
            gender="men"
          >
            Party season is here
          </Jumbotron>
          <Featured items={items} gender="male" />
        </Flex>
      </Layout>
    </>
  )
}