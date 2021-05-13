import { useRecoilValue } from 'recoil';
import { themeState } from 'lib/recoil/atom/theme';
import { ETheme } from 'lib/enum/theme';
import Routes from './Routes';

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
