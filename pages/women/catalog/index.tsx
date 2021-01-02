import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Layout, Products, Sort } from '../../../components'
import { useGender } from '../../../context/genderContext'

export default function Catelog() {
  const [products, setProducts] = useState(null)
  const { setGender } = useGender()

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
        <Products gender="female" products={products} />
      </Layout>
    </>
  )
}
