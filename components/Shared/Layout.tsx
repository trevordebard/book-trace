import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const Layout: FunctionComponent = ({ children }) => (
  <Flex
    minH="100vh"
    justify="center"
    align="center"
    direction="column"
    bg="gray.100"
    py={10}
  >
    {children}
  </Flex>
)