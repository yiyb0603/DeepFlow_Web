import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useTagList from 'hooks/tag/useTagList';
import { ITag } from 'types/tag.types';
import PageLoading from 'components/Common/Loading/PageLoading';
import NoItems from 'components/Common/NoItems';
import TagsItem from './TagsItem';
import TagsTap from './TagsTap';

const style = require('./Tags.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Tags = (): JSX.Element => {
  const { tagLoading, tagList } = useTagList();

  return (
    <>
      {
        tagLoading && tagList.length <= 0 ? <PageLoading text='태그 목록을 불러오는중 입니다' />
        :
        <div className={cx('Tags')}>
          <TagsTap />

          <div className={cx('Tags-List')}>
            {
              tagList.length > 0 ? tagList.map(({ name, description, count }: ITag, idx: number) => (
                <TagsItem
                  key={idx}
                  name={name}
                  description={description}
                  count={count}
                />
              )) : <NoItems text='작성된 태그가 없습니다.' />
            }
          </div>
        </div>
      }
    </>
  );
};

export default memo(Tags);