import { Text } from '@chakra-ui/react';
import { Card } from 'components/Shared/Card';

export default function Custom404() {
  return (
    <Card>
      <Text fontWeight="bold" color="red.500" textAlign="center">
        404 - This page could not be found.
      </Text>
    </Card>
  );
}
