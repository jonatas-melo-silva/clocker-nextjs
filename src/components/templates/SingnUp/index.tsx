/* eslint-disable react/no-children-prop */
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


import { useFormik } from 'formik';
import * as yup from 'yup';

import { useAuth } from '../../../contexts/AuthUserContext';

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

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
  username: yup.string().required('Nome de usuário é obrigatório'),
});

const SingnUp: React.FC = () => {
  const { createUserWithEmailAndPassword, authUser, loading} = useAuth();
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
  } = useFormik({
    onSubmit: async (values, form) => {
      try {
        await createUserWithEmailAndPassword(values.email, values.password);
        if (!loading && !authUser) router.push('/');
        console.log('Sucesso. O usuário é criado no Firebase');
      } catch (error) {
        console.log(`ERROR: ${error}`);
      }
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
            loadingText='Submetendo'
            colorScheme='blue'
          >
            Cadastrar
          </Button>
        </Box>
      </Box>

      <Link href='/'>Já tem uma conta? Acesse!</Link>
    </Container>
  );
};

export default SingnUp;
