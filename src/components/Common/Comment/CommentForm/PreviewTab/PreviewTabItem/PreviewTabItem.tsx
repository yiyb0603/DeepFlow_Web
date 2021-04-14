import { Dispatch, SetStateAction, useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ECommentTab } from 'lib/enum/comment';

const style = require('./PreviewTabItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PreviewTabItemProps {
  id: ECommentTab;
  name: string;
  icon: JSX.Element;
  commentTab: ECommentTab;
  setCommentTab: Dispatch<SetStateAction<ECommentTab>>;
}

const PreviewTabItem = ({
  id,
  name,
  icon,
  commentTab,
  setCommentTab,
}: PreviewTabItemProps): JSX.Element => {
  const onChangeCommentTab = useCallback((): void => {
    setCommentTab(id);
  }, [id, setCommentTab]);

  return (
    <div className={cx('PreviewTabItem', {
      'PreviewTabItem-Selected': id === commentTab,
    })} onClick={onChangeCommentTab}>
      {icon}
      <div>{name}</div>
    </div>
  );
};

export default PreviewTabItem;
