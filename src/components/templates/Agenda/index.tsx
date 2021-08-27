/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../../contexts/AuthUserContext';

const Agenda: React.FC = () => {
  const { authUser, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) router.push('/');
  }, [authUser, loading]);

  return (
    <Container p={4} centerContent>
      <Button onClick={signOut}>Sair</Button>
    </Container>
  );
};

export default Agenda;
