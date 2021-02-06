import {
  Box,
  Button,
  Heading,
  HStack,
  Stack,
  StackItem,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { FC } from 'react';

export const Nav: FC = () => {
  return (
    <Box as="nav" w="100%" bg="gray.100">
      <Stack
        py={[5, 8]}
        maxW="90vw"
        w={['md', 'lg', '2xl']}
        justifyContent={['center', 'space-between']}
        align="center"
        mx="auto"
        fontWeight="500"
        direction={['column', 'row']}
      >
        <Box>
          <Heading fontSize={['4xl', 'xl']}>Book Trace</Heading>
        </Box>
        <HStack spacing={5}>
          <StackItem>
            <Link href="/list">
              <a>My List</a>
            </Link>
          </StackItem>
          <StackItem>
            <Link href="/search">
              <a>Search</a>
            </Link>
          </StackItem>
          <StackItem>
            <Button
              variant="ghost"
              px={0}
              fontWeight="500"
              href="/search"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </StackItem>
        </HStack>
      </Stack>
    </Box>
  );
};
