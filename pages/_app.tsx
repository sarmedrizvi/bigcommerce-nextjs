import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { GET_CHILDREN_NAVIGATION } from '@queries/nav-bar'
const Noop: FC = ({ children }) => <>{children}</>
// provide the default query function to your app with defaultOptions
const queryClient = new QueryClient()

interface Props {
  Component: any
  pageProps: any
  navChildren: Object
}
export default function MyApp({ Component, pageProps, navChildren }: Props) {
  const Layout = (Component as any).Layout || Noop
  axios.defaults.headers.common['X-Auth-Token'] =
    process.env.NEXT_PUBLIC_AUTH_API

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <QueryClientProvider client={queryClient}>
          <Layout pageProps={pageProps} navChildren={navChildren}>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ManagedUIContext>
    </>
  )
}

MyApp.getInitialProps = async () => {
  axios.defaults.headers.common['X-Auth-Token'] =
    process.env.BIGCOMMERCE_STORE_API_TOKEN
  const navChildren = await GET_CHILDREN_NAVIGATION()

  return {
    navChildren,
  }
}
