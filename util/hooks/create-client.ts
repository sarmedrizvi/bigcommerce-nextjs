import { createClient } from 'contentful'

const CreateClient = async (item: Object) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  })
  const res = await client.getEntries(item)
  return res
}

export default CreateClient
