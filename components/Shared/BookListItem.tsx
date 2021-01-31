import { Box, Divider, Stack, StackItem, Text } from '@chakra-ui/react';
import { FunctionComponent, PropsWithChildren } from 'react';

interface BookListItemProps {
  title: string;
  author?: string;
}

export const BookListItem: FunctionComponent<BookListItemProps> = ({
  children,
  title,
  author = '',
}: PropsWithChildren<BookListItemProps>) => (
  <>
    <StackItem>
      <Stack
        justify="space-between"
        overflow="hidden"
        direction={['column', 'row']}
      >
        <Box>
          <Text
            color="gray.900"
            fontWeight="bold"
            maxW={[200, null, 400]}
            isTruncated
          >
            {title}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {author}
          </Text>
        </Box>
        {children}
      </Stack>
    </StackItem>
    <StackItem>
      <Divider />
    </StackItem>
  </>
);
