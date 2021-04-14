import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { tagSortState } from 'atom/tag';
import { ETagSort } from 'lib/enum/tag';
import { ITagTap, tagTaps } from 'lib/models/tagTaps';
import SelectTab from 'components/Common/SelectTab';
import Helmet from 'components/Common/Helmet';

const style = require('./TagsTap.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TagsTap = (): JSX.Element => {
  const history: History = useHistory();
  const [sortRule, setSortRule] = useRecoilState<ETagSort>(tagSortState);

  const onChangeSortRule = useCallback((sortRule: ETagSort): void => {
    history.push(`?sort=${sortRule}`);
    setSortRule(sortRule);
  }, [history, setSortRule]);

  return (
    <div className={cx('TagsTap')}>
      <Helmet title={`태그 (${sortRule === ETagSort.POPULAR ? '인기순' : '이름순'})`} />
      {
        tagTaps.map(({ name, route }: ITagTap, idx: number) => (
          <SelectTab
            key={idx}
            name={name}
            route={route}
            selectTab={sortRule}
            onChangeSelectTab={onChangeSortRule}
          />
        ))
      }
    </div>
  );
};

export default TagsTap;
