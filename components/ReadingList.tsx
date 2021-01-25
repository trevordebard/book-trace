
import { Flex, Heading, Stack, Button, Text, Box } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";
import { Book } from "@prisma/client";
import { BookListItem } from "./Shared/BookListItem";
import { toggleBookComplete } from "lib/toggleBookComplete";
import { useRouter } from 'next/router';

interface ReadingListProps {
  books: Book[]
}
export const ReadingList: FunctionComponent<ReadingListProps> = ({ books }) => {
  return (
    <>
      <Flex
        height="100vh"
        justify="center"
        align="center"
        direction="column"
        bg="gray.100"
      >
        <Card>
          <Heading size="3xl" textAlign="center">My List</Heading>
          <Stack spacing={10} pt={10} minW={400}>
            <ReadingItems books={books} />
          </Stack>
        </Card>
      </Flex>
    </>
  )
}


const ReadingItems: FunctionComponent<{ books: Book[] }> = ({ books }) => {
  const router = useRouter()
  const refreshData = () => router.replace(router.asPath);
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleToggle = async (bookId: number, complete: boolean) => {
    setLoading(true)
    const res = await toggleBookComplete(bookId, complete)
    if (res.success) {
      refreshData()
    } else if (res.errorMessage) {
      setErrorMessage(res.errorMessage)
    }
    setLoading(false)
  }

  return (
    <Box >
      <Stack spacing={3}>
        {books.map((book, i) => (
          <BookListItem title={book.title} author={book.author_name[0]} key={`${book.title}-${Math.random()}`}>
            {book.complete ? (
              <Text cursor="pointer" _hover={{ color: "red" }} onClick={() => handleToggle(book.id, false)}>Read!</Text>
            ) : (
                <Button isLoading={loading} size="sm" onClick={() => handleToggle(book.id, true)}>Mark as Read</Button>
              )}
          </BookListItem>
        ))}
        {books.length === 0 && <Text color="red.500">No Books Found</Text>}
      </Stack>
    </Box >
  )
}