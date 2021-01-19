import { Flex, Heading, Stack, HStack, Input, Button, Text, Box, Divider, StackItem } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";

interface SearchResponse {
  numFound: number,
  docs: Book[]
}

interface Book {
  title: string,
  author_name: string,
  id_amazon: string,
  subject: [string]
}

const mockResponse: SearchResponse = {
  numFound: 10,
  docs: [
    { title: "Deep Work", author_name: "Cal Newport", id_amazon: "120391", subject: ["Self Help"] },
    { title: "Slaughterhouse 5", author_name: "Kurt Vonnegut", id_amazon: "120323491", subject: ["fiction"] },
    { title: "Sapiens", author_name: "Yuval Noah Harari", id_amazon: "12032541391", subject: ["fiction"] },
  ]
}

export const Search: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [searchResult, setSearchResult] = useState<null | SearchResponse>(null)

  const handleChange = e => setSearchValue(e.target.value)

  const handleClick = e => {
    e.preventDefault()
    if (searchValue) {
      // TODO: Search
      setErrorMessage(null)
      setSearchResult(mockResponse)
    }
    else {
      setErrorMessage("You must search for something")
    }
  }
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
          <Heading size="3xl">Search for a Book </Heading>
          <Stack spacing={10} pt={10}>
            <Box>
              <HStack>
                <Input placeholder="Hunger Games" value={searchValue} onChange={handleChange} />
                <Button colorScheme="orange" onClick={handleClick}>Search</Button>
              </HStack>
              {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            </Box>
            {searchResult && <SearchResult result={searchResult} />}
          </Stack>
        </Card>
      </Flex>
    </>
  )
}


const SearchResult: FunctionComponent<{ result: SearchResponse }> = ({ result }) => (
  <Box >
    <Stack spacing={3}>
      {result.docs.map((book, i) => (
        <>
          <StackItem key={book.id_amazon} backgroundColor="green">
            <HStack justify="space-between" backgroundColor="blue">
              <Box>
                <Text color="gray.900" fontWeight="bold">{book.title}</Text>
                <Text color="gray.500" fontSize="sm">{book.author_name}</Text>
              </Box>
              <Button size="sm" >Add to list</Button>
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