import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useTagList from 'hooks/tag/useTagList';
import { ETagSort } from 'lib/enum/tag';
import { ISortTab, sortTabs } from 'lib/models/tabs/sortTabs';
import SelectTab from 'components/Common/SelectTab';
import Helmet from 'components/Common/Helmet';

const style = require('./TagsTap.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TagsTap = (): JSX.Element => {
  const { sortRule, onChangeSortRule } = useTagList();

  return (
    <div className={cx('TagsTap')}>
      <Helmet title={`태그 (${sortRule === ETagSort.POPULAR ? '인기순' : '이름순'})`} />
      {
        sortTabs.map(({ idx, name, route }: ISortTab) => (
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

export default memo(TagsTap);