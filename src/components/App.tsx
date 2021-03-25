import { useRecoilValue } from 'recoil';
import { ETheme } from 'lib/enum/theme';
import { themeState } from 'atom/theme';
import Routes from './Routes';

import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import 'styles/util.scss';
import 'styles/Palette/Palette.scss';

const App = (): JSX.Element => {
  const { LIGHT } = ETheme;
  const theme: ETheme = useRecoilValue(themeState);

  return (
    <div className={theme === LIGHT ? 'light' : 'dark'}>
      <Routes />
    </div>
  );
}

export default App;
