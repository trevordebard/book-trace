import { Box, Button, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { FunctionComponent } from 'react';
import { Card } from 'components/Shared/Card';
import { useSession, signIn, signOut } from 'next-auth/client';
import Link from 'next/link';

export const Login: FunctionComponent = () => {
  const [session, loading] = useSession();
  if (loading) {
    return null;
  }
  if (session) {
    return (
      <Card flexDirection="column">
        <Text>You are already logged in!</Text>
        <Link href="/list">View List</Link>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </Card>
    );
  }
  return (
    <Card>
      <Stack spacing={[5, 10]}>
        <Heading size="3xl" textAlign="center">
          Book Trace
        </Heading>
        <Box>
          <VStack justify="center" align="center" spacing={3}>
            <Button
              alignItems="center"
              justifyContent="center"
              leftIcon={<FaGoogle />}
              onClick={() => signIn('google')}
            >
              Continue with Google
            </Button>
          </VStack>
        </Box>
      </Stack>
    </Card>
  );
};
