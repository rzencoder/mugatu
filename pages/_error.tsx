import { Layout, ErrorLayout } from '@/components/layouts'
import { NextPageContext } from 'next'
import Head from 'next/head'

function Error({ statusCode }: { statusCode: string }): JSX.Element {
  return (
    <>
      <Head>
        <title>Latest Women&apos;s and Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ErrorLayout message={`sorry an unexpected error occurred ${statusCode}`} />
      </Layout>
    </>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
