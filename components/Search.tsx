import { Heading, Stack, HStack, Input, Button, Text, Box } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";
import { OpenLibraryBook } from "types";
import { searchBook } from 'lib/searchBook'
import { addBookToList } from "lib/addBookToList";
import { useUser } from "lib/User/useUser";
import { BookListItem } from "./Shared/BookListItem";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react"

export const Search: FunctionComponent = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<null | OpenLibraryBook[]>(null)
  const { username } = useUser()

  const handleChange = e => setSearchValue(e.target.value)

  const handleSearch = async e => {
    e.preventDefault()
    if (searchValue) {
      setErrorMessage('')
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
    <Card>
      <Box textAlign="center">
        <Heading size="3xl" mb={2}>Search for a Book</Heading>
        <NextLink href={`/list/${username}`} passHref>
          <Link color="orange.500" fontWeight="bold">View my list</Link>
        </NextLink>
      </Box>
      <Stack spacing={[4, 10]} pt={10}>
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
  )
}

const SearchResult: FunctionComponent<{ result: OpenLibraryBook[] }> = ({ result }) => {
  const { username } = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const handleAdd = async (book: OpenLibraryBook) => {
    if (!username) {
      setErrorMessage('You are not logged in')
    } else {
      setErrorMessage('')
      setSuccessMessage('')
      setLoading(true)
      let res = await addBookToList(username, book);
      if (res.success) {
        setSuccessMessage(`${book.title} added!`)
      } else if (res.errorMessage) {
        setErrorMessage(res.errorMessage)
      }
      setLoading(false)
    }
  }
  return (
    <Stack spacing={3} maxH={300} overflowY="scroll">
      {successMessage && <Text fontWeight="bold" color="green.500">{successMessage}</Text>}
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      {result.map((book, i) => (
        <BookListItem title={book.title} author={book.author_name[0]} key={`${book.title}-${Math.random()}`}>
          <Button size="sm" onClick={() => handleAdd(book)} isLoading={loading}>Add to list</Button>
        </BookListItem>
      ))}
      {result.length === 0 && <Text color="red.500">No Results Found</Text>}
    </Stack>
  )
}
