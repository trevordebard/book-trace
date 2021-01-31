import { Flex } from '@chakra-ui/react';
import { FunctionComponent, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
export const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => (
  <Flex
    justify="center"
    align="center"
    direction="column"
    bg="gray.100"
    py={10}
  >
    {children}
  </Flex>
);
