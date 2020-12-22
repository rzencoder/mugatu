import Head from 'next/head'
import { useEffect } from 'react'
import { Layout } from '../components'
import { useGender } from '../context/genderContext'
import { fetchContent } from '../utils/contentful'

export async function getStaticProps() {
  const response = await fetchContent(`
        {
            productCollection {
                items {
                name
                image {
                  url (transform: {width: 200})
                }
            }
          }
      }
  `)
  return {
    props: {
      products: response.productCollection.items,
    },
  }
}

export default function Men({ products }) {
  const { setGender } = useGender()

  useEffect(() => {
    setGender('male')
  }, [])

  return (
    <div>
      <Head>
        <title>Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {products.map((el) => {
          return <img src={el.image.url} alt={el.name} key={el.name} />
        })}
      </Layout>
    </div>
  )
}
