import { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { historySingleton } from 'lib/singleton/history';
import App from 'components/App';

import 'styles/util.scss';
import 'styles/font.scss';
import 'styles/palette/palette.scss';

const Root = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Router history={historySingleton}>
        <Suspense fallback={null}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
};

export default Root;