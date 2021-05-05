import { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SecureLS from 'secure-ls';

const style = require('./TagsItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagsItemProps {
  name: string;
  description: string;
  count: number;
}

const TagsItem = ({
  name,
  description,
  count,
}: TagsItemProps): JSX.Element => {
  const history: History = useHistory();
  const ls: SecureLS = useMemo(() => new SecureLS({ encodingType: 'aes' }), []);

  const handlePushToTagPosts = useCallback((): void => {
    ls.set('tagInfo', { name, description, count });
    history.push(`/tag-questions/${name}`);
  }, [count, description, history, ls, name]);

  return (
    <div className={cx('TagsItem')}>
      <div className={cx('TagsItem-Top')}>
        <div
          className={cx('TagsItem-Top-Name')}
          onClick={handlePushToTagPosts}
        >
          {name}
        </div>

        <div className={cx('TagsItem-Top-Description')}>
          {description}
        </div>
      </div>

      <div className={cx('TagsItem-Count')}>총 {count}개의 포스트</div>
    </div>
  );
};

export default TagsItem;
