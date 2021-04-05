import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineGithub, AiOutlineHome } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';
import { CgComment } from 'react-icons/cg';
import { HiCode } from 'react-icons/hi';
import ModifyButton from './ModifyButton';
import ModifyInfoModal from './ModifyInfoModal';

const style = require('./InfoBox.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface InfoBoxProps {
  avatar: string;
  name: string;
  githubId: string;
  email: string;
  description: string;
  position: string;
  location: string;
  blog: string;
}

const InfoBox = ({
  avatar,
  name,
  githubId,
  email,
  description,
  position,
  location,
  blog,
}: InfoBoxProps): JSX.Element => {
  const [isModifyModal, setIsModifyModal] = useState<boolean>(false);

  const onChangeIsModifyModal = useCallback((): void => {
    setIsModifyModal((prevIsModifyModal: boolean) => !prevIsModifyModal);
  }, []);

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
          <div className={cx('InfoBox-Left-Contents-Info')}>
            <CgComment />
            <div>{description}</div>
          </div>
          <div className={cx('InfoBox-Left-Contents-Info')}>
            <HiCode />
            <div>{position}</div>
          </div>
          <div className={cx('InfoBox-Left-Contents-Info')}>
            <ImLocation2 />
            <div>{location}</div>
          </div>
        </div>
      </div>

      <div className={cx('InfoBox-Right')}>
        <div className={cx('InfoBox-Right-Icons')}>
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
        
        <ModifyButton onClick={onChangeIsModifyModal} />
      </div>

      {
        isModifyModal &&
        <ModifyInfoModal onChangeIsModifyModal={onChangeIsModifyModal} />
      }
    </div>
  );
};

export default InfoBox;
