import useRegister from 'hooks/useRegister';
import { groupingState } from 'converter/groupingState';
import SignUp from 'components/Auth/SignUp';
import GithubLoading from 'components/Auth/GithubLoading';

const SignUpContainer = (): JSX.Element => {
  const {
    request,
    isLoading,
    onChangeDescription,
    onChangeLocation,
    onChangeBlog,
    onChangePosition,
    onChangeGeneration,
    onChangeMajor,
    requestRegister,
  } = useRegister();

  const { description, location, blog, position, generation, major } = request;

  return (
    <>
    {
      request.githubId === '' ? <GithubLoading /> :
      <SignUp
        isLoading={isLoading}
        request={request}
        descriptionState={groupingState('description', description, onChangeDescription)}
        locationState={groupingState('location', location, onChangeLocation)}
        blogState={groupingState('blog', blog, onChangeBlog)}
        positionState={groupingState('position', position, onChangePosition)}
        generationState={groupingState('generation', generation, onChangeGeneration)}
        majorState={groupingState('major', major, onChangeMajor)}
        requestRegister={requestRegister}
      />
    }
    </>
  );
};

export default SignUpContainer;