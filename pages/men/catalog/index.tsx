import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Layout } from '../../../components'
import { useGender } from '../../../context/genderContext'

export default function Catelog() {
  const [products, setProducts] = useState(null)
  const { setGender } = useGender()

  useEffect(() => {
    setGender('male')
    async function fetchProducts() {
      const response = await fetch(`../api/search?gender=male`)
      const { data } = await response.json()
      console.log(data)
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <Head>
        <title>Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          margin="20px auto"
          maxWidth={['600px', '1000px']}
        >
          {products &&
            products.map((el) => {
              return (
                <Flex
                  key={el.name}
                  width={['50%', '33%']}
                  minWidth={['150px', '250px']}
                  p={2}
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Image width={300} height={450} src={el.image.url} alt={el.name} />
                  <Flex flexDirection="column">
                    <Box color="#777" fontSize="14px" textDecoration="line-through">
                      £{el.rrp}
                    </Box>
                    <Box color="#f00">£{el.price}</Box>
                  </Flex>
                  <Link fontSize="sm" href={`/product/${el.slug}`}>
                    {el.name}
                  </Link>
                </Flex>
              )
            })}
        </Flex>
      </Layout>
    </>
  )
}
