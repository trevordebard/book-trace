import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { UserContext } from "lib/User/UserContext";
import { useLocalStorage } from "lib/useLocalStorage";
import { Layout } from "components/Shared/Layout";
import '../styles.css'

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useLocalStorage('username', '')
  return (
    <ChakraProvider>
      <UserContext.Provider value={{ username, setUsername }}>
        <Head>
          <title>Book Trace</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
