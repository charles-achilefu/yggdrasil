import Layout from '@/components/layout'
import { store } from '@/redux/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>YggdrasilDEX</title>
        <meta name="title" content="YggdrasilDEX" />
        <meta
          name="description"
          content="An open source decentralised exchange built on THORChain."
        />
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=yes"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  )
}

export default App
