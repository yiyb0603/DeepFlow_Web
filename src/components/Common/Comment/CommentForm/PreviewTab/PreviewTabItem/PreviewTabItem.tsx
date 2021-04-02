import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { commentTabState } from 'atom/comment';
import { ECommentTab } from 'lib/enum/comment';

const style = require('./PreviewTabItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PreviewTabItemProps {
  id: ECommentTab;
  name: string;
  icon: JSX.Element;
}

const PreviewTabItem = ({
  id,
  name,
  icon,
}: PreviewTabItemProps): JSX.Element => {
  const [commentTab, setCommentTab] = useRecoilState<ECommentTab>(commentTabState);
  
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
