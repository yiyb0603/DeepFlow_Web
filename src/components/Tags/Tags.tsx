import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useTagList from 'hooks/post/useTagList';
import { ITag } from 'types/tag.types';
import TagsItem from './TagsItem';
import TagsTap from './TagsTap';

const style = require('./Tags.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Tags = (): JSX.Element => {
  const { tagList } = useTagList();

  return (
    <div className={cx('Tags')}>
      <TagsTap />

      <div className={cx('Tags-List')}>
        {
          tagList.map(({ name, description, count }: ITag, idx: number) => (
            <TagsItem
              key={idx}
              name={name}
              description={description}
              count={count}
            />
          ))
        }
      </div>
    </div>
  );
};

export default Tags;
