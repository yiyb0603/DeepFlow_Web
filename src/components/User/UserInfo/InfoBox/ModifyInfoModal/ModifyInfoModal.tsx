import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineMail, AiOutlineLink } from 'react-icons/ai';
import { VscSymbolNamespace } from 'react-icons/vsc';
import { HiCode } from 'react-icons/hi';
import { CgHello } from 'react-icons/cg';
import { BiBuilding } from 'react-icons/bi';
import useModifyInfo from 'hooks/user/useModifyInfo';
import InfoInput from 'components/Common/Input/InfoInput';
import Modal from 'components/Common/Modal';
import GenerationSelect from 'components/Common/Select/GenerationSelect';
import MajorSelect from 'components/Common/Select/MajorSelect';
import ModifySubmit from '../ModifySubmit';

const style = require('./ModifyInfoModal.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ModifyInfoModal = (): JSX.Element => {
  const {
    modifyInfo,
    onChangeIsModifyModal,
    onChangeRequest,
    requestModifyInfo,
  } = useModifyInfo();

  const {
    avatar,
    name,
    email,
    location,
    position,
    description,
    major,
    blog,
    generation,
  } = modifyInfo;

  return (
    <Modal
      width='30%'
      height='55%'
      title='내 정보 수정'
      onChangeIsModal={onChangeIsModifyModal}
    >
      <div className={cx('ModifyInfoModal')}>
        <div className={cx('ModifyInfoModal-Center')}>
          <div className={cx('ModifyInfoModal-Center-LeftContents')}>
            <img
              src={avatar}
              className={cx('ModifyInfoModal-Center-LeftContents-ProfileImage')}
              alt='profile'
            />
          </div>

          <div className={cx('ModifyInfoModal-Center-Inputs')}>
            <div className={cx('ModifyInfoModal-Center-Inputs-Title')}>
              프로필 내용
            </div>

            <InfoInput
              name='name'
              value={name}
              onChange={onChangeRequest}
              placeholder='이름을 입력하세요'
              icon={<VscSymbolNamespace />}
            />
            
            <InfoInput
              name='description'
              value={description}
              onChange={onChangeRequest}
              placeholder='한줄소개를 입력하세요'
              icon={<CgHello />}
            />

            <InfoInput
              name='position'
              value={position}
              onChange={onChangeRequest}
              placeholder='개발 포지션을 입력하세요'
              icon={<HiCode />}
            />
            
            <InfoInput
              name='location'
              value={location}
              onChange={onChangeRequest}
              placeholder='직장을 입력하세요'
              icon={<BiBuilding />}
            />
          </div>
        </div>

        <div className={cx('ModifyInfoModal-BottomInputs')}>
          <InfoInput
            width='100%'
            name='email'
            value={email}
            onChange={onChangeRequest}
            placeholder='이메일을 입력하세요'
            icon={<AiOutlineMail />}
          />

          <InfoInput
            width='100%'
            name='blog'
            value={blog}
            onChange={onChangeRequest}
            placeholder='개인 링크를 입력하세요.'
            icon={<AiOutlineLink />}
          />
        </div>

        <div className={cx('ModifyInfoModal-BottomSelect')}>
          <GenerationSelect
            generation={generation}
            onChangeGeneration={onChangeRequest}
          />

          <MajorSelect
            major={major}
            onChangeMajor={onChangeRequest}
          />
        </div>

        <ModifySubmit requestModifyInfo={requestModifyInfo} />
      </div>
    </Modal>
  );
};

export default ModifyInfoModal;
