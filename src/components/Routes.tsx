import { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const HomePage = lazy(() => import('pages/Home'));

const NoticeListPage = lazy(() => import('pages/Notice/NoticeListPage'));
const NoticeViewPage = lazy(() => import('pages/Notice/NoticeViewPage'));
const NoticeFormPage = lazy(() => import('pages/NoticeForm'));

const QuestionListPage = lazy(() => import('pages/Question/QuestionList'));
const QuestionViewPage = lazy(() => import('pages/Question/QuestionView'));

const QuestionFormPage = lazy(() => import('pages/QuestionForm'));

const SignPage = lazy(() => import('pages/Sign'));
const UserInfoPage = lazy(() => import('pages/UserInfo'));
const UserListPage = lazy(() => import('pages/UserList'));
const TagsPage = lazy(() => import('pages/Tags'));
const TagQuestionsPage = lazy(() => import('pages/TagQuestions'));
const TempPage = lazy(() => import('pages/Temp'));
const UserRecommandPage = lazy(() => import('pages/UserRecommand'));
const SearchQuestionsPage = lazy(() => import('pages/SearchQuestions'));
const PolicyPage = lazy(() => import('pages/Policy'));
const NotFoundPage = lazy(() => import('pages/NotFound'));

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/github-login' component={SignPage} />
      <Route exact path='/notice' component={NoticeListPage} />
      <Route exact path='/notice/:idx' component={NoticeViewPage} />
      <Route exact path='/notice-form' component={NoticeFormPage} />
      <Route exact path='/notice-form/:idx' component={NoticeFormPage} />
      
      <Route exact path='/questions' component={QuestionListPage} />
      <Route exact path='/question/:idx' component={QuestionViewPage} />
      <Route exact path='/question-form' component={QuestionFormPage} />
      <Route exact path='/question-form/:idx' component={QuestionFormPage} />

      <Route exact path='/search-questions' component={SearchQuestionsPage} />
      <Route exact path='/users' component={UserListPage} />
      <Route exact path='/user/:idx' component={UserInfoPage} />
      <Route exact path='/user-recommand/:idx' component={UserRecommandPage} />

      <Route exact path='/temp' component={TempPage} />
      <Route exact path='/tags' component={TagsPage} />
      <Route exact path='/tag-questions/:tag' component={TagQuestionsPage} />
      <Route exact path='/policy' component={PolicyPage} />
      <Route exact path='/not-found' component={NotFoundPage} />

      <Redirect to='/not-found' />
    </Switch>
  );
}

export default Routes;