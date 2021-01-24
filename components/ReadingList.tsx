
import { Flex, Heading, Stack, HStack, Button, Text, Box, Divider, StackItem } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";
import { Book } from "types";

interface ReadingListResponse {
  books: Book[]
}

const mockResponse: ReadingListResponse = {
  books: [
    { title: "Deep Work", author_name: "Cal Newport", id_amazon: "120391", subject: ["Self Help"] },
    { title: "Slaughterhouse 5", author_name: "Kurt Vonnegut", id_amazon: "120323491", subject: ["fiction"] },
    { title: "Sapiens", author_name: "Yuval Noah Harari", id_amazon: "12032541391", subject: ["fiction"] },
  ]
}

export const ReadingList: FunctionComponent = () => {
  const [searchResult, setSearchResult] = useState<ReadingListResponse>(mockResponse)

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
            <ReadingItems books={searchResult.books} />
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
        <>
          <StackItem key={book.id_amazon}>
            <HStack justify="space-between">
              <Box>
                <Text color="gray.900" fontWeight="bold">{book.title}</Text>
                <Text color="gray.500" fontSize="sm">{book.author_name}</Text>
              </Box>
              <Button size="sm" >Mark as Read</Button>
            </HStack>
          </StackItem>
          <StackItem>
            <Divider />
          </StackItem>
        </>
      ))}
    </Stack>
  </Box>
)