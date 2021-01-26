import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const Layout: FunctionComponent = ({ children }) => (
  <Flex
    height="100vh"
    justify="center"
    align="center"
    direction="column"
    bg="gray.100"
  >
    {children}
  </Flex>
)