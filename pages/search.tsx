import { Search } from 'components/Search';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

export default Search;

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
    props: {},
  };
};
