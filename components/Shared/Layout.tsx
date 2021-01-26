import { Flex } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const Layout: FunctionComponent = ({ children }) => (
  <Flex
    justify="center"
    align="center"
    direction="column"
    bg="gray.100"
    py={10}
  >
    {children}
  </Flex>
)