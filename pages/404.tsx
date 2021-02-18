import { Layout, ErrorLayout } from '@/components/layouts'
import Head from 'next/head'

export default function FourZeroFour(): JSX.Element {
  return (
    <>
      <Head>
        <title>Latest Women&apos;s and Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ErrorLayout message="sorry, we can't find the page you're looking for" />
      </Layout>
    </>
  )
}
