import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from 'components/App';

const Root = (): JSX.Element => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Root;