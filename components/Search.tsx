import { Flex, Heading, Stack, HStack, Input, Button, Text, Box, Divider, StackItem } from "@chakra-ui/react";
import { Fragment, FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";
import { OpenLibraryBook } from "types";
import { searchBook } from 'lib/searchBook'
import { addBookToList } from "lib/addBookToList";
import { useUser } from "lib/User/useUser";

export const Search: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<null | OpenLibraryBook[]>(null)

  const handleChange = e => setSearchValue(e.target.value)

  const handleSearch = async e => {
    e.preventDefault()
    if (searchValue) {
      setErrorMessage(null)
      setLoading(true)
      let res = await searchBook(searchValue)
      setLoading(false)
      if (res.error) {
        setErrorMessage(res.error)
      }
      else if (res.books) {
        setSearchResult(res.books)
      }
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
                <Button isLoading={loading} colorScheme="orange" onClick={handleSearch} disabled={loading}>
                  Search
                  </Button>
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


const SearchResult: FunctionComponent<{ result: OpenLibraryBook[] }> = ({ result }) => {
  const { username } = useUser()
  return (
    <Box >
      <Stack spacing={3}>
        {result.map((book, i) => (
          <Fragment key={`${book.title}-${Math.random()}`}>
            <StackItem >
              <HStack justify="space-between">
                <Box>
                  <Text color="gray.900" fontWeight="bold" maxW={400} isTruncated>{book.title}</Text>
                  <Text color="gray.500" fontSize="sm">{book.author_name}</Text>
                </Box>
                <Button size="sm" onClick={() => addBookToList(username, book)}>Add to list</Button>
              </HStack>
            </StackItem>
            <StackItem key={`${book.id_amazon}-${i}`}>
              <Divider />
            </StackItem>
          </Fragment>
        ))}
        {result.length === 0 && <Text color="red.500">No Results Found</Text>}
      </Stack>
    </Box>
  )
}