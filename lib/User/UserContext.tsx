import { createContext } from "react";

const User = {
  username: '',
  setUsername: (username: string) => { }
}
export const UserContext = createContext(User);