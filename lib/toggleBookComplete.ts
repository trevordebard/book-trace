import axios from "axios";

interface markBookCompleteResponse {
  success: boolean,
  errorMessage?: string
}

export async function toggleBookComplete(bookId: number, complete: boolean): Promise<markBookCompleteResponse> {
  try {
    await axios.put(`${process.env.API_URL}/book`, { id: bookId, complete })
    return { success: true }
  } catch (e) {
    return { success: false, errorMessage: `There was a problem completing book` }
  }
}