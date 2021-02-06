import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from 'components/Shared/Layout';
import '../styles.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';
import { Provider } from 'next-auth/client'


Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Head>
          <title>Book Trace</title>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
