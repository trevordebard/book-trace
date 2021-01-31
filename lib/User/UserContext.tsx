/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

const User = {
  username: '',
  setUsername: (username: string) => {},
};
export const UserContext = createContext(User);
