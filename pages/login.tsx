import { Login } from 'components/Login';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/list',
      },
    };
  }
  return {
    props: {},
  };
};
