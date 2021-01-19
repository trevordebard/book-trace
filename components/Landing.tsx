import { Button, Flex, FormControl, FormLabel, Heading, HStack, Input, Stack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Card } from "components/Shared/Card";
import Link from "next/link";

export const Landing: FunctionComponent = () => (
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
          <FormControl id="first-name">
            <FormLabel>Type a Username to Begin</FormLabel>
            <HStack>
              <Input placeholder="Username" />
              <Button colorScheme="orange">Go</Button>
            </HStack>
          </FormControl>
        </Stack>
      </Card>
    </Flex>
  </>
)