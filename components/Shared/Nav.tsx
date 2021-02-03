import {
  Box,
  Button,
  Heading,
  HStack,
  StackItem,
  useBreakpointValue,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { FC } from 'react';

export const Nav: FC = () => {
  const largeScreen = useBreakpointValue({ sm: true });
  return (
    <Box as="nav" w="100%" bg="gray.100">
      <HStack
        py={8}
        maxW="90vw"
        w={['md', 'lg', '2xl']}
        justifyContent={['center', 'space-between']}
        mx="auto"
        fontWeight="500"
      >
        {largeScreen && <Heading size="md">Book Trace</Heading>}
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
      </HStack>
    </Box>
  );
};
