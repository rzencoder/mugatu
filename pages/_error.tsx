import { Layout, ErrorLayout, Meta } from '@/components/layouts'
import { NextPageContext } from 'next'

function Error({ statusCode }: { statusCode: string }): JSX.Element {
  return (
    <>
      <Meta title="Latest Women's and Men's Fashion | Mugatu" />
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
