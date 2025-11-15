import Link from 'next/link';
import { Button, Container, Stack, Text } from '@mantine/core';

export default function NotFound() {
  return (
    <Container
      size='sm'
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack align='center' gap='md'>
        <Text>Not Found</Text>
        <Text>찾을 수 없는 페이지입니다.</Text>
        <Button component={Link} href='/' size='md' px='xl'>
          홈으로
        </Button>
      </Stack>
    </Container>
  );
}
