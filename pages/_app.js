import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { UserContext } from "lib/User/UserContext";
import { useLocalStorage } from "lib/useLocalStorage";
import { Layout } from "components/Shared/Layout";
import '../styles.css'
import NProgress from 'nprogress';
import Router from 'next/router'
import 'nprogress/nprogress.css'; 

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
