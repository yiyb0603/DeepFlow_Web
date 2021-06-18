import { ETheme } from 'lib/enum/theme';
import useTheme from 'hooks/common/theme/useTheme';
import Routes from './Routes';

const App = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <div className={theme === ETheme.LIGHT ? 'light' : 'dark'}>
      <Routes />
    </div>
  );
}

export default App;
