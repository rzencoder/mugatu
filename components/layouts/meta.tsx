import Head from 'next/head'

interface MetaProps {
  title: string
  description?: string
  favicon?: string
}

const Meta = ({
  title,
  description = 'Get the latest designer clothes for women and men',
  favicon = '/favicon.ico',
}: MetaProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <link rel="icon" href={favicon} />
      </Head>
    </>
  )
}

export default Meta
