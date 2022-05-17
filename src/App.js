import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import IndexPage from './components/IndexPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
        <IndexPage/>
    </ChakraProvider>
  );
}

export default App;
