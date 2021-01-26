import { Book, PrismaClient } from '@prisma/client';
import { ReadingList } from 'components/ReadingList'
import { GetServerSideProps } from 'next';
export default ReadingList

export const getServerSideProps: GetServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const username = context.query.username?.toString()
  let books: Book[];
  try {
    books = await prisma.book.findMany({ where: { User: { username } }, orderBy: { title: 'asc' } })
  } catch (e) {
    books = []
  }
  return {
    props: {
      books
    }
  }
}