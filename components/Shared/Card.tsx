import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";


export const Card: FunctionComponent = ({ children }) => (
  <Box
    width="fit-content"
    mx="auto"
    padding={16}
    borderWidth="1px"
    borderRadius="xl"
    bg="white"
    boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
  >
    {children}
  </Box>
)