import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { UserContext } from "lib/User/UserContext";
import { useLocalStorage } from "lib/useLocalStorage";

function MyApp({ Component, pageProps }: AppProps) {
  const [username, setUsername] = useLocalStorage('username', '')
  return (
    <ChakraProvider>
      <UserContext.Provider value={{ username, setUsername }}>
        <Head>
          <title>Book Trace</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
