import { Layout, SearchPageLayout, Meta } from '@/components/layouts'
import { formatResponseData, formatSearchDataResponse } from '../utils/'
import { graphQLClient } from '@/graphql/client'
import Fuse from 'fuse.js'
import searchOptions from '@/config/search'
import { GET_ALL_PRODUCTS } from 'graphql/queries'
import { Item } from '@/types/item'
import { GetServerSideProps } from 'next'

interface SearchProps {
  products: Item[]
  query: string
}

export default function Search({ products, query }: SearchProps): JSX.Element {
  return (
    <>
      <Meta title={`Search - ${query} | Mugatu`} />
      <Layout>
        <SearchPageLayout products={products} query={query} />
      </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.search) {
    return { props: { products: [], query: '' } }
  }
  try {
    const response = await graphQLClient.request(GET_ALL_PRODUCTS)
    const data = formatResponseData(response.productCollection.items)
    const fuse = new Fuse(data, searchOptions)
    const searchData = [...fuse.search(String(query.search))]
    const formattedData = formatSearchDataResponse(searchData)
    return { props: { products: formattedData, query: query.search } }
  } catch (error) {
    console.log(error)
    return { props: { products: [], query: '' } }
  }
}
