
import { Heading, Stack, Button, Text, Box } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";
import { Book } from "@prisma/client";
import { BookListItem } from "./Shared/BookListItem";
import { toggleBookComplete } from "lib/toggleBookComplete";
import { useRouter } from 'next/router';
import { CheckIcon } from "@chakra-ui/icons";

interface ReadingListProps {
  books: Book[]
}
export const ReadingList: FunctionComponent<ReadingListProps> = ({ books }) => {
  return (
    <Card>
      <Heading size="3xl" textAlign="center">My List</Heading>
      <Stack spacing={10} pt={10}>
        <Box overflowY="scroll" maxH={300}>
          <ReadingItems books={books} />
        </Box>
      </Stack>
    </Card>
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
    <Stack spacing={3}>
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      {books.length === 0 && <Text color="red.500">No Books Found</Text>}
      {books.map((book, i) => (
        <BookListItem title={book.title} author={book.author_name[0]} key={`${book.title}-${Math.random()}`}>
          {book.complete ?
            <Button
              leftIcon={<CheckIcon color="green" />}
              variant="ghost"
              isLoading={loading}
              colorScheme="green"
              size="sm"
              cursor="pointer"
              onClick={() => handleToggle(book.id, false)}>
              Read
            </Button>
            : <Button isLoading={loading} size="sm" onClick={() => handleToggle(book.id, true)}>Mark as Read</Button>
          }
        </BookListItem>
      ))}
    </Stack>
  )
}