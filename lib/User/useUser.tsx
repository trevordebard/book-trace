import { useContext } from 'react'
import { UserContext } from './UserContext'

export function useUser() {
  const { username, setUsername } = useContext(UserContext)
  return { username, setUsername }
}
