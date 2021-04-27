import { useRecoilValue } from 'recoil';
import { themeState } from 'atom/theme';
import { ETheme } from 'lib/enum/theme';
import Routes from './Routes';

import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import 'styles/util.scss';
import 'styles/font.scss';
import 'styles/Palette/Palette.scss';

const App = (): JSX.Element => {
  const { LIGHT } = ETheme;
  const theme: ETheme = useRecoilValue<ETheme>(themeState);

  return (
    <div className={theme === LIGHT ? 'light' : 'dark'}>
      <Routes />
    </div>
  );
}

export default App;
