import axios, { AxiosResponse } from 'axios'
import { Book } from 'types';

interface SearchResponse {
  numFound: number,
  docs: Book[]
}
interface BooksResponse {
  books: Book[],
  error?: string
}

export async function searchBook(title: string): Promise<BooksResponse> {
  title = title.replaceAll(' ', '+')
  let res: AxiosResponse<SearchResponse>;
  try {
    res = await axios.get('http://openlibrary.org/search.json', { params: { q: title, limit: 5 } });
    if (res.data.numFound > 0) {
      return { books: res.data.docs }
    } else {
      return { books: [] }
    }
  } catch (e) {
    return { books: [], error: "There was an error searching" }
  }
}