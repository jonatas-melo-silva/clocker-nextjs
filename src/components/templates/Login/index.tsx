/* eslint-disable react/no-children-prop */
import React from 'react';
import Link  from 'next/link'

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
} from '@chakra-ui/react';

import { Logo } from '../../elements/Logo';
import FireBase, { PersistenceMode } from '../../../config/firebase/index';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

const Login: React.FC = () => {
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
      FireBase.auth().setPersistence(PersistenceMode)
      try {
        const user = await FireBase.auth().signInWithEmailAndPassword(
          values.email,
          values.password
        );

        console.log(user);
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

        <Box p={4}>
          <Button
            type='submit'
            width='100%'
            onClick={() => handleSubmit()}
            isLoading={isSubmitting}
            loadingText='Submetendo'
            colorScheme='blue'
          >
            Entrar
          </Button>
        </Box>
      </Box>

      <Link href='/signup'>Ainda não tem uma conta Cadastre-se</Link>
    </Container>
  );
};

export default Login;
