const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

export async function fetchContent(query) {
  try {
    const res = await fetch(`https://graphql.contentful.com/content/v1/spaces/${space}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query }),
    })
    const { data } = await res.json()
    return data
  } catch (err) {
    console.error(err)
  }
}
