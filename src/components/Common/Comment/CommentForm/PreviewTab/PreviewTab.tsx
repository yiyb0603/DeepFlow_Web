import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { commentTabs, ICommentTab } from 'lib/models/commentTabs';
import PreviewTabItem from './PreviewTabItem';

const style = require('./PreviewTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PreviewTab = (): JSX.Element => {
  return (
    <div className={cx('PreviewTab')}>
      {
        commentTabs.map(({ id, name, icon }: ICommentTab) => (
          <PreviewTabItem
            key={id}
            id={id}
            name={name}
            icon={icon}
          />
        ))
      }
    </div>
  );
};

export default PreviewTab;
