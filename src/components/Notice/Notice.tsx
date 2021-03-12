import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ListItem from 'components/Common/ListItem';
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
          const { idx, title, createdAt } = notice;
          return (
            <ListItem
              key={idx}
              idx={idx}
              title={title}
              introduction={'안녕하세요 공지사항입니다....'}
              createdAt={createdAt}
              thumbnail={Sample}
            />
          )
        })
      }
    </div>
  );
};

export default Notice;
