import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));
const NoticePage = lazy(() => import('pages/Notice'));
const NoticeFormPage = lazy(() => import('pages/NoticeForm'));
const PostPage = lazy(() => import('pages/Post'));
const PostFormPage = lazy(() => import('pages/PostForm'));
const SignPage = lazy(() => import('pages/Sign'));
const UserInfoPage = lazy(() => import('pages/UserInfo'));
const UserListPage = lazy(() => import('pages/UserList'));
const QuestionPage = lazy(() => import('pages/Question'));
const TagsPage = lazy(() => import('pages/Tags'));
const TagPostsPage = lazy(() => import('pages/TagPosts'));
const TempPage = lazy(() => import('pages/Temp'));
const UserRecommandPage = lazy(() => import('pages/UserRecommand'));
const SearchPostsPage = lazy(() => import('pages/SearchPosts'));
const PolicyPage = lazy(() => import('pages/Policy'));
const NotFoundPage = lazy(() => import('pages/NotFound'));

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/github-login' component={SignPage} />
      <Route exact path='/notice' component={NoticePage} />
      <Route exact path='/notice-form' component={NoticeFormPage} />
      <Route exact path='/notice-form/:idx' component={NoticeFormPage} />
      <Route exact path='/post/:idx' component={PostPage} />
      <Route exact path='/post-form' component={PostFormPage} />
      <Route exact path='/post-form/:idx' component={PostFormPage} />
      <Route exact path='/search-posts' component={SearchPostsPage} />
      <Route exact path='/users' component={UserListPage} />
      <Route exact path='/user/:idx' component={UserInfoPage} />
      <Route exact path='/user-recommand/:idx' component={UserRecommandPage} />
      <Route exact path='/questions' component={QuestionPage} />
      <Route exact path='/temp' component={TempPage} />
      <Route exact path='/tags' component={TagsPage} />
      <Route exact path='/tag-posts/:tag' component={TagPostsPage} />
      <Route exact path='/policy' component={PolicyPage} />
      <Route exact path='/not-found' component={NotFoundPage} />

      <Redirect to='/not-found' />
    </Switch>
  );
}

export default Routes;