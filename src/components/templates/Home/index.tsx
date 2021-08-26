/* eslint-disable react/no-children-prop */
import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Container,
  Box,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';

import { Logo } from '../../elements/Logo';
import { FareBase } from '../../../config/firebase/index'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  username: yup.string().required('Nome de usuário é obrigatório'),
});

// import { Container } from './styles';

const Home: React.FC = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useFormik({
    onSubmit: (values, form) => {
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
  });
  return (
    <Container p={4} centerContent>
      <Logo />

      <Box p={4} mt={8} size='lg'>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id='email' isRequired p={4}>
          <FormLabel>Endereço de email</FormLabel>
          <Input
            size='lg'
            type='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Digite seu email'
          />
          <FormHelperText textColor={`#e74c3c`}>
            {touched.email && errors.email}
          </FormHelperText>
        </FormControl>

        <FormControl id='password' isRequired p={4}>
          <FormLabel>Senha</FormLabel>
          <Input
            size='lg'
            type='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Digite sua senha'
          />
          <FormHelperText textColor={`#e74c3c`}>
            {errors.password && touched.password && errors.password}
          </FormHelperText>
        </FormControl>

        <FormControl id='username' isRequired p={4}>
          <InputGroup size='lg'>
            <InputLeftAddon children={'clock.work/'} />
            <Input
              type='username'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Digite seu nome'
            />
          </InputGroup>
          <FormHelperText textColor={`#e74c3c`}>
            {errors.username && touched.username && errors.username}
          </FormHelperText>
        </FormControl>

        <Box p={4}>
          <Button
            type='submit'
            width='100%'
            onClick={() => handleSubmit()}
            isLoading={isSubmitting}
            loadingText="Submetendo"
            colorScheme="blue"
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
