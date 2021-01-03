import { Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Layout, Products, Sort, Loader, Filter } from '../../../components'
import { useGender } from '../../../context/genderContext'

export default function Catelog() {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const { setGender } = useGender()

  useEffect(() => {
    setGender('female')
    async function fetchProducts() {
      setLoading(true)
      const response = await fetch(`../api/search?gender=female`)
      const { data } = await response.json()
      setProducts(data)
      setLoading(false)
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
        <Flex justify="space-between" align="center" bg="#eee" padding=" 5px 30px">
          <Filter />
          <Sort />
        </Flex>
        {loading ? <Loader /> : <Products gender="female" products={products} />}
      </Layout>
    </>
  )
}
