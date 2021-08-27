import type { NextPage } from 'next';
import { Container, Spinner } from '@chakra-ui/react';

import { useAuth } from '../contexts/AuthUserContext';

import Login from '../components/templates/Login';
import Agenda from '../components/templates/Agenda';

const Home: NextPage = () => {
  const { authUser, loading } = useAuth();

  if (loading) {
    return (
      <Container p={4} centerContent>
        <Spinner />
      </Container>
    )
  }

  return authUser ? <Agenda /> : <Login />;
};

export default Home;
