import {
  Heading,
  Stack,
  HStack,
  Input,
  Button,
  Text,
  Box,
  Link,
} from '@chakra-ui/react';
import { FunctionComponent, useState } from 'react';
import { Card } from 'components/Shared/Card';
import { OpenLibraryBook } from 'types';
import { searchBook } from 'lib/searchBook';
import { addBookToList } from 'lib/addBookToList';
import NextLink from 'next/link';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { BookListItem } from './Shared/BookListItem';

export const Search: FunctionComponent = () => {
  const [session, sessionLoading] = useSession();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<null | OpenLibraryBook[]>(
    null,
  );

  if (sessionLoading) {
    return null;
  }
  if (!session) {
    router.push('/login');
    return null;
  }

  const handleChange = (e) => setSearchValue(e.target.value);
  const handleKeyDown = (e) => e.key === 'Enter' && handleSearch(e);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue) {
      setErrorMessage('');
      setLoading(true);
      const res = await searchBook(searchValue);
      setLoading(false);
      if (res.error) {
        setErrorMessage(res.error);
      } else if (res.books) {
        setSearchResult(res.books);
      }
    } else {
      setErrorMessage('You must search for something');
    }
  };
  return (
    <Card>
      <Box textAlign="center">
        <Heading size="2xl" mb={2}>
          Search for a Book
        </Heading>
        <NextLink href="/list" passHref>
          <Link color="orange.500" fontWeight="bold">
            View my list
          </Link>
        </NextLink>
      </Box>
      <Stack spacing={[4, 10]} pt={4}>
        <Box>
          <HStack>
            <Input
              placeholder="Hunger Games"
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <Button
              isLoading={loading}
              colorScheme="orange"
              onClick={handleSearch}
              disabled={loading}
            >
              Search
            </Button>
          </HStack>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
        </Box>
        {searchResult && <SearchResult result={searchResult} />}
      </Stack>
    </Card>
  );
};

interface ResultProps {
  result: OpenLibraryBook[];
}
const SearchResult: FunctionComponent<ResultProps> = ({
  result,
}: ResultProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [session] = useSession();

  const handleAdd = async (book: OpenLibraryBook) => {
    if (!session?.user) {
      setErrorMessage('You are not logged in');
    } else {
      setErrorMessage('');
      setSuccessMessage('');
      setLoading(true);
      const res = await addBookToList(session.user.email, book);
      if (res.success) {
        setSuccessMessage(`${book.title} added!`);
      } else if (res.errorMessage) {
        setErrorMessage(res.errorMessage);
      }
      setLoading(false);
    }
  };
  return (
    <Box>
      {successMessage && (
        <Text fontWeight="bold" color="green.500">
          {successMessage}
        </Text>
      )}
      {errorMessage && <Text color="red.500">{errorMessage}</Text>}
      <Stack spacing={6} overflowY="scroll" maxH={300}>
        {result.map((book) => (
          <BookListItem
            title={book.title}
            author={book.author_name?.[0]}
            key={`${book.title}-${Math.random()}`}
          >
            <Button
              size="sm"
              onClick={() => handleAdd(book)}
              isLoading={loading}
            >
              Add to list
            </Button>
          </BookListItem>
        ))}
        {result.length === 0 && <Text color="red.500">No Results Found</Text>}
      </Stack>
    </Box>
  );
};
