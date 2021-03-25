import { Route, Switch } from 'react-router';
import { useRecoilValue } from 'recoil';
import 'semantic-ui-css/semantic.min.css';
import { ETheme } from 'lib/enum/theme';
import { themeState } from 'atom/theme';
import SignPage from 'pages/Sign';
import HomePage from 'pages/Home';
import NoticePage from 'pages/Notice';
import PostPage from 'pages/Post';
import PostFormPage from 'pages/PostForm';
import UserListPage from 'pages/UserList';
import UserInfoPage from 'pages/UserInfo';

const App = (): JSX.Element => {
  const { LIGHT } = ETheme;
  const theme: ETheme = useRecoilValue(themeState);

  return (
    <div className={theme === LIGHT ? 'light' : 'dark'}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/github-login' component={SignPage} />
        <Route exact path='/notice' component={NoticePage} />
        <Route exact path='/post-form' component={PostFormPage} />
        <Route exact path='/post-form/:idx' component={PostFormPage} />
        <Route exact path='/post/:idx' component={PostPage} />
        <Route exact path='/users' component={UserListPage} />
        <Route exact path='/user/:idx' component={UserInfoPage} />
      </Switch>
    </div>
  );
}

export default App;
