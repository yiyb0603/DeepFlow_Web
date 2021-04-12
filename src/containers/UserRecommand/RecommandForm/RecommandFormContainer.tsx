import { memo } from 'react';
import RecommandForm from 'components/User/UserRecommand/RecommandForm';
import { groupingState } from 'converter/groupingState';
import useRecommand from 'hooks/useRecommand';

const RecommandFormContainer = (): JSX.Element => {
  const { reason, onChangeReason, requestCreateRecommand } = useRecommand();

  return (
    <RecommandForm
      reasonState={groupingState('reason', reason, onChangeReason)}
      requestCreateRecommand={requestCreateRecommand}
    />
  );
}

export default memo(RecommandFormContainer);