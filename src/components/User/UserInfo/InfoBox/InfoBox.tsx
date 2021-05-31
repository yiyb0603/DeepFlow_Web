import { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineGithub, AiOutlineHome } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';
import { CgComment } from 'react-icons/cg';
import { HiCode } from 'react-icons/hi';
import { modifyModalState } from 'lib/recoil/atom/user/myInfo';
import { getMyInfo } from 'util/getMyInfo';
import { IToken } from 'types/user.types';
import getGithubAddress from 'util/getGithubAddress';
import { ERank } from 'lib/enum/rank';
import ModifyButton from './ModifyButton';
import RankProfile from 'components/Common/User/RankProfile';
import ModifyInfoModal from './ModifyInfoModal';

const style = require('./InfoBox.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface InfoBoxProps {
  idx: number;
  avatar: string;
  name: string;
  githubId: string;
  email: string;
  description: string;
  position: string;
  location: string;
  blog: string;
  rank: ERank;
}

const InfoBox = ({
  idx,
  avatar,
  name,
  githubId,
  email,
  description,
  position,
  location,
  blog,
  rank,
}: InfoBoxProps): JSX.Element => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  const [isModifyModal, setIsModifyModal] = useRecoilState<boolean>(modifyModalState);

  const onChangeIsModifyModal = useCallback((): void => {
    setIsModifyModal((prevIsModifyModal: boolean) => !prevIsModifyModal);
  }, [setIsModifyModal]);

  return (
    <div className={cx('InfoBox')}>
      <div className={cx('InfoBox-Left')}>
        <RankProfile
          avatar={avatar}
          rank={rank}
        />

        <div className={cx('InfoBox-Left-Contents')}>
          <div className={cx('InfoBox-Left-Contents-NameId')}>
            <div className={cx('InfoBox-Left-Contents-NameId-Name')}>{name}</div>
            <div className={cx('InfoBox-Left-Contents-NameId-Id')}>({githubId})</div>
          </div>
          <div className={cx('InfoBox-Left-Contents-Info')}>
            <CgComment className={cx('InfoBox-Left-Contents-Info-Icon')} />
            <div className={cx('InfoBox-Left-Contents-Info-Text')}>{description}</div>
          </div>
          <div className={cx('InfoBox-Left-Contents-Info')}>
            <HiCode className={cx('InfoBox-Left-Contents-Info-Icon')} />
            <div className={cx('InfoBox-Left-Contents-Info-Text')}>{position}</div>
          </div>
          <div className={cx('InfoBox-Left-Contents-Info')}>
            <ImLocation2 className={cx('InfoBox-Left-Contents-Info-Icon')} />
            <div className={cx('InfoBox-Left-Contents-Info-Text')}>{location}</div>
          </div>
        </div>
      </div>

      <div className={cx('InfoBox-Right')}>
        <div className={cx('InfoBox-Right-Icons')}>
          <a href={getGithubAddress(githubId)} target='_blank' rel='noopener noreferrer'>
            <AiOutlineGithub />
          </a>

          <a href={blog} target='_blank' rel='noopener noreferrer'>
            <AiOutlineHome />
          </a>

          <a href={`mailto:${email}`}>
            <MdEmail />
          </a>
        </div>
        
        {
          myInfo && myInfo.idx === idx &&
          <ModifyButton onClick={onChangeIsModifyModal} />
        }
      </div>

      {
        isModifyModal &&
        <ModifyInfoModal />
      }
    </div>
  );
};

export default InfoBox;
