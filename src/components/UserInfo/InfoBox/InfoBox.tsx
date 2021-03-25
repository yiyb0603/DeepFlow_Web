import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineGithub, AiOutlineHome } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

const style = require('./InfoBox.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface InfoBoxProps {
  avatar: string;
  name: string;
  githubId: string;
  email: string;
  description: string;
  position: string;
  blog: string;
}

const InfoBox = ({
  avatar,
  name,
  githubId,
  email,
  description,
  position,
  blog,
}: InfoBoxProps): JSX.Element => {
  return (
    <div className={cx('InfoBox')}>
      <div className={cx('InfoBox-Left')}>
        <img
          src={avatar}
          className={cx('InfoBox-Left-Profile')}
          alt='avatar'
        />

        <div className={cx('InfoBox-Left-Contents')}>
          <div className={cx('InfoBox-Left-Contents-NameId')}>
            <div className={cx('InfoBox-Left-Contents-NameId-Name')}>{name}</div>
            <div className={cx('InfoBox-Left-Contents-NameId-Id')}>({githubId})</div>
          </div>
          <div className={cx('InfoBox-Left-Contents-Description')}>{description}</div>
          <div className={cx('InfoBox-Left-Contents-Position')}>{position}</div>
        </div>
      </div>

      <div className={cx('InfoBox-Right')}>
        <a href={`https://github.com/${githubId}`} target='_blank' rel="noopener noreferrer">
          <AiOutlineGithub />
        </a>

        <a href={blog} target='_blank' rel="noopener noreferrer">
          <AiOutlineHome />
        </a>

        <a href={`mailto:${email}`}>
          <MdEmail />
        </a>
      </div>
    </div>
  );
};

export default InfoBox;
