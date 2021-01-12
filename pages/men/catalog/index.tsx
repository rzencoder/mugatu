import { useProducts } from '@/context/productsContext'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout, Catalog } from '../../../components/layouts'

export default function MenCatalog() {
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
        <Catalog />
      </Layout>
    </>
  )
}
