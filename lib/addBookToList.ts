import axios from 'axios';
import { OpenLibraryBook } from 'types';

interface addBookToListResponse {
  success: boolean;
  errorMessage?: string;
}

export async function addBookToList(
  email: string,
  book: OpenLibraryBook,
): Promise<addBookToListResponse> {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
      email,
      ...book,
    });
    return { success: true };
  } catch (e) {
    return {
      success: false,
      errorMessage: `There was a problem adding ${book.title}`,
    };
  }
}
