import { Box, Divider, HStack, StackItem, Text } from "@chakra-ui/react";
import { Fragment, FunctionComponent } from "react";

interface BookListItemProps {
  title: string,
  author?: string,
}
export const BookListItem: FunctionComponent<BookListItemProps> = ({ children, title, author, ...props }) => (
  <Fragment {...props}>
    <StackItem >
      <HStack justify="space-between">
        <Box>
          <Text color="gray.900" fontWeight="bold" maxW={400} isTruncated>{title}</Text>
          <Text color="gray.500" fontSize="sm">{author}</Text>
        </Box>
        {children}
      </HStack>
    </StackItem>
    <StackItem>
      <Divider />
    </StackItem>
  </Fragment>
)