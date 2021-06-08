import { lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import RestrictRoute from './RestrictRoute';

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
      <RestrictRoute
        exact
        isAllow
        path='/'
        component={HomePage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/github-login'
        component={SignPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/notice'
        component={NoticeListPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/notice/:idx'
        component={NoticeViewPage}
      />

      <RestrictRoute
        exact
        path='/notice-form'
        isAllow={false}
        component={NoticeFormPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/notice-form/:idx'
        component={NoticeFormPage}
      />
      
      <RestrictRoute
        exact
        isAllow
        path='/questions'
        component={QuestionListPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/question/:idx'
        component={QuestionViewPage}
      />

      <RestrictRoute
        exact
        isAllow={false}
        path='/question-form'
        component={QuestionFormPage}
      />

      <RestrictRoute
        exact
        isAllow={false}
        path='/question-form/:idx'
        component={QuestionFormPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/search-questions'
        component={SearchQuestionsPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/users'
        component={UserListPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/user/:idx'
        component={UserInfoPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/user-recommand/:idx'
        component={UserRecommandPage}
      />

      <RestrictRoute
        exact
        isAllow={false}
        path='/temp'
        component={TempPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/tags'
        component={TagsPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/tag-questions/:tag'
        component={TagQuestionsPage}
      />

      <RestrictRoute
        exact
        isAllow
        path='/policy'
        component={PolicyPage}
      />
      
      <RestrictRoute
        exact
        isAllow
        path='/not-found'
        component={NotFoundPage}
      />

      <Redirect to='/not-found' />
    </Switch>
  );
}

export default Routes;