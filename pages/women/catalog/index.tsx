import { Loader } from '../../../components/'
import { useProducts } from '@/context/productsContext'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout, Catalog } from '../../../components/layouts'

export default function WomenCatalog() {
  const { updateGender, setQuery } = useProducts()

  useEffect(() => {
    updateGender('female')
    setQuery('search?')
  }, [])

  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Catalog />
      </Layout>
    </>
  )
}
