import Head from 'next/head'
import { Layout } from '@/components/layouts'
import { TempMessage } from '../components'

export default function BagPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Checkout | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <TempMessage />
      </Layout>
    </>
  )
}
