import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';

const style = require('./ModifyInfoModal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ModifyInfoModalProps {
  onChangeIsModifyModal: () => void;
}

const ModifyInfoModal = ({
  onChangeIsModifyModal,
}: ModifyInfoModalProps): JSX.Element => {
  return (
    <Modal
      width='15%'
      height='50%'
      title='내 정보 수정'
      onChangeIsModal={onChangeIsModifyModal}
    >
      sdfdfdsf
    </Modal>
  );
};

export default ModifyInfoModal;
