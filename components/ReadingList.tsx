
import { Flex, Heading, Stack, HStack, Button, Text, Box, Divider, StackItem } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Card } from "components/Shared/Card";
import { Book } from "@prisma/client";
import { BookListItem } from "./Shared/BookListItem";

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


const ReadingItems: FunctionComponent<{ books: Book[] }> = ({ books }) => (
  <Box >
    <Stack spacing={3}>
      {books.map((book, i) => (
        <BookListItem title={book.title} author={book.author_name[0]} key={`${book.title}-${Math.random()}`}>
          <Button size="sm">Mark as Read</Button>
        </BookListItem>
      ))}
      {books.length === 0 && <Text color="red.500">No Books Found</Text>}
    </Stack>
  </Box >
)