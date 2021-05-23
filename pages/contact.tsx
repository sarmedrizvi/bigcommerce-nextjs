import React from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'
import CreateClient from 'util/hooks/create-client'
import get from 'lodash/get'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

interface Props {
  data: String
}
export async function getInitialProps() {
  const res = await CreateClient({
    'sys.contentType.sys.id': 'deliveryInformation',
  })
  return {
    props: { data: res },
    revalidate: 14400,
  }
}

export default function Contact({ data }: Props) {
  const title = get(data, 'items[0].fields.title', '')
  const description = get(data, 'items[0].fields.description', {})
  return (
    <div className="mx-3">
      <h1 className="mb-5 text-center">{title}</h1>
      <span>{documentToReactComponents(description)}</span>
    </div>
  )
}

Contact.Layout = Layout
