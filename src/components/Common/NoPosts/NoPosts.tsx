import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NoPost from 'assets/images/no-post.svg';

const style = require('./NoPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoPostsProps {
  text: string;
  imageWidth?: string;
}

const NoPosts = ({ text, imageWidth = '45%', }: NoPostsProps): JSX.Element => {
  return (
    <div className={cx('NoPosts')}>
      <img
        src={NoPost}
        className={cx('NoPosts-Image')}
        style={{ width: imageWidth }}
        alt='no-post'
      />
      <div className={cx('NoPosts-Text')}>
        {text} <br />
        <div>잠깐 혼자만의 시간을 보내는건 어떨까요?</div>
      </div>
    </div>
  );
};

export default NoPosts;
