import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ListItem from 'components/Common/Post/ListItem';
import { INotice } from 'types/notice.types';
import Sample from 'assets/images/sample.png';
import useNoticeList from 'hooks/notice/useNoticeList';
import NoItems from 'components/Common/NoItems';
import PageTitle from 'components/Common/PageTitle';
import Helmet from 'components/Common/Helmet';

const style = require('./Notice.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Notice = (): JSX.Element => {
  const { noticeList } = useNoticeList();

  return (
    <div className={cx('Notice')}>
      <Helmet title='공지사항' />
      <PageTitle title='공지사항' subTitle='공지사항 목록이 여기에 표시됩니다.' />
      {
        noticeList.length > 0 ? noticeList.map((notice: INotice) => {
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
        }) : <NoItems text={'공지사항이 없습니다.'} />
      }
    </div>
  );
};

export default Notice;
