import { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import { historySingleton } from 'lib/singleton/history';
import PageTemplate from 'components/Template/PageTemplate';
import App from 'components/App';

import 'styles/util.scss';
import 'styles/font.scss';
import 'styles/Palette/Palette.scss';

const Root = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Router history={historySingleton}>
        <Suspense fallback={<PageTemplate></PageTemplate>}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Suspense>
      </Router>
    </RecoilRoot>
  );
};

export default Root;