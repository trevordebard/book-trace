import axios from "axios";

interface markBookCompleteResponse {
  success: boolean,
  errorMessage?: string
}

export async function toggleBookComplete(bookId: number, complete: boolean): Promise<markBookCompleteResponse> {
  try {
    await axios.put('http://localhost:3000/api/book', { id: bookId, complete })
    return { success: true }
  } catch (e) {
    return { success: false, errorMessage: `There was a problem completing book` }
  }
}