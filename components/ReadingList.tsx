
import { Flex, Heading, Stack, HStack, Button, Text, Box, Divider, StackItem } from "@chakra-ui/react";
import { Fragment, FunctionComponent } from "react";
import { Card } from "components/Shared/Card";
import { Book } from "@prisma/client";

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
        <Fragment key={`${book.title}-${Math.random()}`}>
          <StackItem>
            <HStack justify="space-between">
              <Box>
                <Text color="gray.900" fontWeight="bold" maxW={400} isTruncated>{book.title}</Text>
                <Text color="gray.500" fontSize="sm">{book.author_name}</Text>
              </Box>
              <Button size="sm" >Mark as Read</Button>
            </HStack>
          </StackItem>
          <StackItem>
            <Divider />
          </StackItem>
        </Fragment>
      ))}
      {books.length === 0 && <Text color="red.500">No Books Found</Text>}
    </Stack>
  </Box>
)