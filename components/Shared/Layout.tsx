import { Flex, FlexProps } from '@chakra-ui/react';
import { useSession } from 'next-auth/client';
import { FunctionComponent, PropsWithChildren } from 'react';
import { Nav } from './Nav';

interface LayoutProps {
  contentProps: FlexProps;
}
export const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: PropsWithChildren<LayoutProps>) => {
  const [session, sessionLoading] = useSession();
  if (sessionLoading) {
    return null;
  }
  return (
    <Flex direction="column">
      {session && <Nav />}
      <Flex
        grow={1}
        justify={[session ? 'flex-start' : 'center', 'center']}
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
