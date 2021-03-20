import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ListItem from 'components/Common/Post/ListItem';
import { INotice } from 'types/notice.types';
import Sample from 'assets/images/sample.png';

const style = require('./Notice.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoticeProps {
  noticeList: INotice[];
}

const Notice = ({ noticeList }: NoticeProps): JSX.Element => {
  return (
    <div className={cx('Notice')}>
      {
        noticeList.map((notice: INotice) => {
          const { idx, title, introduction, createdAt, updatedAt } = notice;
          return (
            <ListItem
              key={idx}
              idx={idx}
              title={title}
              introduction={introduction}
              createdAt={createdAt}
              updatedAt={updatedAt}
              thumbnail={Sample}
            />
          )
        })
      }
    </div>
  );
};

export default Notice;
