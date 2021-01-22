import Head from 'next/head'
import { Layout } from '../components/layouts'
import { Bag } from '../components'

export default function BagPage() {
  return (
    <>
      <Head>
        <title>Shopping Bag | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Bag />
      </Layout>
    </>
  )
}
