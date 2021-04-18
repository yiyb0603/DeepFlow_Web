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
import TagPostsPage from 'pages/TagPosts';
import TempPage from 'pages/Temp';
import UserRecommandPage from 'pages/UserRecommand';
import SearchPostsPage from 'pages/SearchPosts';
import PolicyPage from 'pages/Policy';

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/github-login' component={SignPage} />
      <Route exact path='/notice' component={NoticePage} />
      <Route exact path='/post-form' component={PostFormPage} />
      <Route exact path='/post-form/:idx' component={PostFormPage} />
      <Route exact path='/post/:idx' component={PostPage} />
      <Route exact path='/search-posts' component={SearchPostsPage} />
      <Route exact path='/users' component={UserListPage} />
      <Route exact path='/user/:idx' component={UserInfoPage} />
      <Route exact path='/user-recommand/:idx' component={UserRecommandPage} />
      <Route exact path='/questions' component={QuestionPage} />
      <Route exact path='/temp' component={TempPage} />
      <Route exact path='/tags' component={TagsPage} />
      <Route exact path='/tag-posts/:tag' component={TagPostsPage} />
      <Route exact path='/policy' component={PolicyPage} />
    </Switch>
  );
}

export default Routes;