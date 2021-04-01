import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';
import { History } from 'history';
import { tagSortState } from 'atom/tag';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ETagSort } from 'lib/enum/tag';
import { ITagTap, tagTaps } from 'lib/models/tagTaps';
import SelectTab from 'components/Common/SelectTab';

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
