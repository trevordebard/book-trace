import axios, { AxiosResponse } from 'axios';
import { OpenLibraryBook } from 'types';

interface SearchOpenLibraryResponse {
  numFound: number;
  docs: OpenLibraryBook[];
}
interface SearchBookResponse {
  books: OpenLibraryBook[];
  error?: string;
}

export async function searchBook(title: string): Promise<SearchBookResponse> {
  const formattedTitle = title.replaceAll(' ', '+');
  let res: AxiosResponse<SearchOpenLibraryResponse>;
  try {
    res = await axios.get('https://openlibrary.org/search.json', {
      params: { q: formattedTitle, limit: 7 },
    });
    if (res.data.numFound > 0) {
      return { books: res.data.docs };
    }
    return { books: [] };
  } catch (e) {
    return { books: [], error: 'There was an error searching' };
  }
}
