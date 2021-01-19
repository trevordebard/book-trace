import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/dist/next-server/lib/router/router"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Book Trace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
