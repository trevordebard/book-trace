import { Box, BoxProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";


export const Card: FunctionComponent<BoxProps> = ({ children, ...props }) => (
  <Box
    width="2xl"
    maxW="90vw"
    mx="auto"
    padding={[8, 16]}
    borderWidth="1px"
    borderRadius="xl"
    bg="white"
    boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
    {...props}
    maxH="80vh"
  >
    {children}
  </Box>
)