import React from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'
import CreateClient from '@hooks/create-client'
import get from 'lodash/get'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetServerSideProps } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'

interface Props {
  data: String
}

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const res = await CreateClient({
    content_type: 'deliveryInformation',
  })
  return {
    props: { pages, data: res },
  }
}
export default function DeliveryInformation({ data }: Props) {
  const title = get(data, 'items[0].fields.title', '')
  const description = get(data, 'items[0].fields.description', {})
  return (
    <div className="mx-3">
      <h1 className="mb-5 text-center">{title}</h1>
      <span>{documentToReactComponents(description)}</span>
    </div>
  )
}

DeliveryInformation.Layout = Layout
