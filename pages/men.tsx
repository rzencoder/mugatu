import { gql } from 'graphql-request'
import Head from 'next/head'
import { useEffect } from 'react'
import { Layout } from '../components'
import { useGender } from '../context/genderContext'
import { graphQLClient } from '../graphql/client'

export async function getStaticProps() {
  const response = await graphQLClient.request(gql`
    query GetMens {
      productCollection {
        items {
          name
          slug
          image {
            url(transform: { width: 200 })
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
  console.log(products)
  useEffect(() => {
    setGender('male')
  }, [])

  return (
    <>
      <Head>
        <title>Men&apos;s Fashion | Mugatu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {products.map((el) => {
          return (
            <>
              <img src={el.image.url} alt={el.name} key={el.name} />
              <a href={`/product/${el.slug}`}>{el.name}</a>
            </>
          )
        })}
      </Layout>
    </>
  )
}
