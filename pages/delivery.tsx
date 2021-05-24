import React from 'react'
import { Layout } from '@components/common'
import type { GetStaticPropsContext } from 'next'
import CreateClient from '@hooks/create-client'
import get from 'lodash/get'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { GetServerSideProps } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import { Container, Text } from '@components/ui'
import { Bag } from '@components/icons'

interface Props {
  data: String
}

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  // const res = await CreateClient({
  //   content_type: 'deliveryInformation',
  // })
  return {
    props: { pages, data: {} },
  }
}
export default function DeliveryInformation({ data }: Props) {
  const title = get(data, 'items[0].fields.title', '')
  const description = get(data, 'items[0].fields.description', {})
  return (
    <Container>
      <Text variant="pageHeading">My Orders</Text>
      <div className="flex-1 p-24 flex flex-col justify-center items-center ">
        <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 p-12 bg-primary text-primary">
          <Bag className="absolute" />
        </span>
        <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
          No orders found
        </h2>
        <p className="text-accents-6 px-10 text-center pt-2">
          Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
        </p>
      </div>
    </Container>
  )
}

DeliveryInformation.Layout = Layout
