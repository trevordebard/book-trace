import { Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { FunctionComponent, ReactNode } from 'react';
import { Nav } from './Nav';

interface LayoutProps {
  children: ReactNode;
}
export const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) {
    return null;
  }
  return (
    <Flex direction="column">
      {session && <Nav />}
      <Flex
        grow={1}
        justify={['flex-start', 'center']}
        align="center"
        direction="column"
        bg="gray.100"
        pb={10}
      >
        {children}
      </Flex>
    </Flex>
  );
};
