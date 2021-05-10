import { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SecureLS from 'secure-ls';
import { historySingleton } from 'lib/singleton/history';

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
  const ls: SecureLS = useMemo(() => new SecureLS({ encodingType: 'aes' }), []);

  const handlePushToTagPosts = useCallback((): void => {
    ls.set('tagInfo', { name, description, count });
    historySingleton.push(`/tag-questions/${name}`);
  }, [count, description, ls, name]);

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
