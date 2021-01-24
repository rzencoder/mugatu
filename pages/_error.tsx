import { Layout, ErrorLayout } from '@/components/layouts'
import Head from 'next/head'

function Error({ statusCode }) {
  return (
    <>
      <Head>
        <title>Latest Women&apos;s and Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ErrorLayout message="sorry an unexpected error occurred" />
      </Layout>
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
