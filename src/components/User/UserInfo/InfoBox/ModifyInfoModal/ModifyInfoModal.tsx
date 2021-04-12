import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineMail, AiOutlineLink } from 'react-icons/ai';
import { VscSymbolNamespace } from 'react-icons/vsc';
import { HiCode } from 'react-icons/hi';
import { CgHello } from 'react-icons/cg';
import { BiBuilding } from 'react-icons/bi';
import InfoInput from 'components/Common/InfoInput';
import Modal from 'components/Common/Modal';
import GenerationSelect from 'components/Common/GenerationSelect';
import ModifyInfoProps from './ModifyInfo.props';
import MajorSelect from 'components/Common/MajorSelect';
import ModifySubmit from '../ModifySubmit';

const style = require('./ModifyInfoModal.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ModifyInfoModal = ({
  avatar,
  nameState,
  emailState,
  descriptionState,
  locationState,
  blogState,
  positionState,
  generationState,
  majorState,
  onChangeIsModifyModal,
  requestModifyInfo,
}: ModifyInfoProps): JSX.Element => {
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
              value={nameState.name}
              onChange={nameState.onChangeName}
              placeholder='이름을 입력하세요'
              icon={<VscSymbolNamespace />}
            />
            
            <InfoInput
              value={descriptionState.description}
              onChange={descriptionState.onChangeDescription}
              placeholder='한줄소개를 입력하세요'
              icon={<CgHello />}
            />

            <InfoInput
              value={positionState.position}
              onChange={positionState.onChangePosition}
              placeholder='개발 포지션을 입력하세요'
              icon={<HiCode />}
            />
            
            <InfoInput
              value={locationState.location}
              onChange={locationState.onChangeLocation}
              placeholder='직장을 입력하세요'
              icon={<BiBuilding />}
            />
          </div>
        </div>

        <div className={cx('ModifyInfoModal-BottomInputs')}>
          <InfoInput
            width='100%'
            value={emailState.email}
            onChange={emailState.onChangeEmail}
            placeholder='이메일을 입력하세요'
            icon={<AiOutlineMail />}
          />

          <InfoInput
            width='100%'
            value={blogState.blog}
            onChange={blogState.onChangeBlog}
            placeholder='개인 링크를 입력하세요.'
            icon={<AiOutlineLink />}
          />
        </div>

        <div className={cx('ModifyInfoModal-BottomSelect')}>
          <GenerationSelect generationState={generationState} />
          <MajorSelect majorState={majorState} />
        </div>

        <ModifySubmit requestModifyInfo={requestModifyInfo} />
      </div>
    </Modal>
  );
};

export default ModifyInfoModal;
