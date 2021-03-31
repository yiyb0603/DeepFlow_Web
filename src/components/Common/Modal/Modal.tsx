import { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscChromeClose } from 'react-icons/vsc';

const style = require('./Modal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ModalProps {
  title: string;
  onChangeIsModal: () => void;
  children?: ReactNode;
}

const Modal = ({
  title,
  onChangeIsModal,
  children,
}: ModalProps): JSX.Element => {
  return (
    <div className={cx('Modal')}>
      <div className={cx('Modal-Overlay')} onClick={onChangeIsModal}></div>

      <div className={cx('Modal-Box')}>
        <div className={cx('Modal-Box-Top')}>
          <div className={cx('Modal-Box-Top-Title')}>{title}</div>
          <VscChromeClose
            className={cx('Modal-Box-Top-Close')}
            onClick={onChangeIsModal}
          />
        </div>

        {children && children}
      </div>
    </div>
  );
};

export default Modal;
