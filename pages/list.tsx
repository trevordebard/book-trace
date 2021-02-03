import { Book, PrismaClient } from '@prisma/client';
import { ReadingList } from 'components/ReadingList';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';

export default ReadingList;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const prisma = new PrismaClient();
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  let books: Book[];
  try {
    books = await prisma.book.findMany({
      where: { User: { email: { equals: session.user.email } } },
      orderBy: { title: 'asc' },
    });
  } catch (e) {
    books = [];
  }
  return {
    props: {
      books,
    },
  };
};
