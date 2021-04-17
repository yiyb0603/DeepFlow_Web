import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EView } from 'lib/enum/theme';
import { ITag } from 'types/tag.types';
import SelectViewMode from 'components/Common/Post/SelectViewMode';

const style = require('./TagInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagInfoProps {
  tagInfo: ITag;
  count: number;
  viewMode: EView;
  onChangeViewMode: (viewMode: EView) => void;
}

const TagInfo = ({
  tagInfo,
  count,
  viewMode,
  onChangeViewMode,
}: TagInfoProps) => {
  const { name, description } = tagInfo;

  return (
    <div className={cx('TagInfo')}>
      <div className={cx('TagInfo-Title')}># {name}</div>
      <div className={cx('TagInfo-Description')}>{description}</div>

      <div className={cx('TagInfo-CountWrapper')}>
        <div className={cx('TagInfo-CountWrapper-Count')}>총 {count}개의 포스트</div>
        <SelectViewMode
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />
      </div>
    </div>
  );
};

export default TagInfo;
