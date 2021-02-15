import Head from 'next/head'
import { Layout, Catalog } from '../../../components/layouts'

export default function WomenCatalog() {
  return (
    <>
      <Head>
        <title>Women&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Catalog productPage="home" />
      </Layout>
    </>
  )
}
