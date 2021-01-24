import { OpenLibraryBook } from "types";
import axios from "axios";

export async function addBookToList(username: string, book: OpenLibraryBook) {
  const res = axios.put('http://localhost:3000/api/book', { username, ...book })
}