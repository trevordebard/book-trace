import { Box, Button, Flex, FormLabel, Heading, HStack, Input, localStorageManager, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { Card } from "components/Shared/Card";
import { useRouter } from 'next/router'
import { useUser } from "lib/User/useUser";


export const Landing: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null)
  const { setUsername: setGlobalUsername } = useUser()
  const [username, setUsername] = useState<string>('')
  const router = useRouter()
  const handleChange = e => setUsername(e.target.value)

  const handleClick = e => {
    e.preventDefault()
    if (username) {
      setGlobalUsername(username)
      router.push('/decision')
    }
    else {
      setErrorMessage("A username has not been set")
    }
  }

  return (
    <>
      <Flex
        height="100vh"
        justify="center"
        align="center"
        direction="column"
        bg="gray.100"
      >
        <Card>
          <Stack spacing={10}>
            <Heading size="3xl">Book Trace</Heading>
            <Box>
              <FormLabel>Type a Username to Begin</FormLabel>
              <HStack>
                <Input placeholder="Username" value={username} onChange={handleChange} />
                <Button colorScheme="orange" onClick={handleClick}>Go</Button>
              </HStack>
              {errorMessage && <Text color="red.500">{errorMessage}</Text>}
            </Box>
          </Stack>
        </Card>
      </Flex>
    </>
  )
}