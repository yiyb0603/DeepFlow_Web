import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import PageTemplate from 'components/Template/PageTemplate';
import App from 'components/App';

import 'styles/util.scss';
import 'styles/font.scss';
import 'styles/Palette/Palette.scss';

const Root = (): JSX.Element => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={<PageTemplate></PageTemplate>}>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Root;