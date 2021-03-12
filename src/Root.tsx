import { Suspense } from 'react';
import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import 'antd/dist/antd.css';
import './styles/util.scss';
import './styles/Palette/Palette.scss';

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