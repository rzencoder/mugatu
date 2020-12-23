import { GraphQLClient } from 'graphql-request'

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const endpoint = `https://graphql.contentful.com/content/v1/spaces/${space}`

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
})
