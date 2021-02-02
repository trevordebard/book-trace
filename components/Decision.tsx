import { Heading, Stack, Link } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import NextLink from 'next/link';
import { Card } from 'components/Shared/Card';

export const Decision: FunctionComponent = () => {
  return (
    <Card>
      <Heading size="3xl">I would like to...</Heading>
      <Stack spacing={5} pt={10}>
        <NextLink href="/search" passHref>
          <Link color="orange.500" fontWeight="bold">
            Search for a book
          </Link>
        </NextLink>
        <NextLink href="/list" passHref>
          <Link color="orange.500" fontWeight="bold">
            View my reading list
          </Link>
        </NextLink>
      </Stack>
    </Card>
  );
};
