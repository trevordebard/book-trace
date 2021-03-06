import { Box } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

const Home: FunctionComponent = () => (
  <Box as="main">This page will never appear</Box>
);
export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: '/list',
    },
  };
};
