import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/Home';
import NoticePage from 'pages/Notice';
import PostPage from 'pages/Post';
import PostFormPage from 'pages/PostForm';
import SignPage from 'pages/Sign';
import UserInfoPage from 'pages/UserInfo';
import UserListPage from 'pages/UserList';
import QuestionPage from 'pages/Question';
import TagsPage from 'pages/Tags';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/github-login' component={SignPage} />
      <Route exact path='/notice' component={NoticePage} />
      <Route exact path='/post-form' component={PostFormPage} />
      <Route exact path='/post-form/:idx' component={PostFormPage} />
      <Route exact path='/post/:idx' component={PostPage} />
      <Route exact path='/users' component={UserListPage} />
      <Route exact path='/user/:idx' component={UserInfoPage} />
      <Route exact path='/questions' component={QuestionPage} />
      <Route exact path ='/tags' component={TagsPage} />
    </Switch>
  );
}

export default Routes;