import ModifyInfoModal from 'components/UserInfo/InfoBox/ModifyInfoModal';
import { groupingState } from 'converter/groupingState';
import useModifyInfo from 'hooks/useModifyInfo';

const ModifyInfoContainer = (): JSX.Element => {
  const {
    modifyInfo,
    onChangeIsModifyModal,
    onChangeName,
    onChangeEmail,
    onChangeDescription,
    onChangeLocation,
    onChangeBlog,
    onChangePosition,
    onChangeGeneration,
    onChangeMajor,
    requestModifyInfo,
  } = useModifyInfo();

  const { name, email, location, position, description, major, blog, generation } = modifyInfo;
  
  return (
    <ModifyInfoModal
      nameState={groupingState('name', name, onChangeName)}
      emailState={groupingState('email', email, onChangeEmail)}
      descriptionState={groupingState('description', description, onChangeDescription)}
      locationState={groupingState('location', location, onChangeLocation)}
      blogState={groupingState('blog', blog, onChangeBlog)}
      positionState={groupingState('position', position, onChangePosition)}
      generationState={groupingState('generation', generation, onChangeGeneration)}
      majorState={groupingState('major', major, onChangeMajor)}
      onChangeIsModifyModal={onChangeIsModifyModal}
      requestModifyInfo={requestModifyInfo}
    />
  )
}

export default ModifyInfoContainer;