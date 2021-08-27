import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import AuthUserProvider from '../contexts/AuthUserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthUserProvider>
        <Component {...pageProps} />
      </AuthUserProvider>
    </ChakraProvider>
  );
}
export default MyApp;
