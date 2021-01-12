import { useProducts } from '@/context/productsContext'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout, Catalog } from '../../../components/layouts'

export default function WomenCatalog() {
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
        <Catalog />
      </Layout>
    </>
  )
}
