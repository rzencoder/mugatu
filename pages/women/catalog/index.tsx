import { Box, Flex, Link } from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { Layout, Sort } from '../../../components'
import { useGender } from '../../../context/genderContext'
import { useBag } from '@/context/bagContext'

export default function Catelog() {
  const [products, setProducts] = useState(null)
  const { setGender } = useGender()
  const { bag } = useBag()

  useEffect(() => {
    setGender('female')
    async function fetchProducts() {
      const response = await fetch(`../api/search?gender=female`)
      const { data } = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Sort />
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
                  <NextLink href={`/product/${el.slug}`} passHref>
                    <Link fontSize="sm">
                      <Image width={300} height={450} src={el.image.url} alt={el.name} />
                      <Flex flexDirection="column">
                        <Box color="#777" fontSize="14px" textDecoration="line-through">
                          £{el.rrp}
                        </Box>
                        <Box color="#f00">£{el.price}</Box>
                      </Flex>

                      <Box> {el.name}</Box>
                    </Link>
                  </NextLink>
                </Flex>
              )
            })}
        </Flex>
      </Layout>
    </>
  )
}
