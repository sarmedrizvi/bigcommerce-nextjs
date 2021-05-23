import React from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'
import CreateClient from '@hooks/create-client'
import get from 'lodash/get'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetServerSideProps } from 'next'

interface Props {
  data: String
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
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await CreateClient({
    'sys.contentType.sys.id': 'deliveryInformation',
  })
  return {
    props: { data: res },
  }
}

Contact.Layout = Layout
