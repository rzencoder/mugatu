import Head from 'next/head'
import { Layout, Catalog } from '../../../components/layouts'

export default function MenCatelog() {
  return (
    <>
      <Head>
        <title>Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Catalog pageGender="male" />
      </Layout>
    </>
  )
}
