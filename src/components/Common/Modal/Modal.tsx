import { ReactNode, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscChromeClose } from 'react-icons/vsc';

const style = require('./Modal.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface ModalProps {
  width: string;
  height: string;
  title: string;
  onChangeIsModal: () => void;
  children?: ReactNode;
}

const Modal = ({
  width,
  height,
  title,
  onChangeIsModal,
  children,
}: ModalProps): JSX.Element => {
  return (
    <div className={cx('Modal')} data-testid='modal'>
      <div
        data-testid='modal-close'
        className={cx('Modal-Overlay')}
        onClick={onChangeIsModal}
      ></div>

      <div className={cx('Modal-Box')} style={{ width, height }}>
        <div className={cx('Modal-Box-Top')}>
          <div className={cx('Modal-Box-Top-Title')}>{title}</div>
          <VscChromeClose
            data-testid='modal-close'
            className={cx('Modal-Box-Top-Close')}
            onClick={onChangeIsModal}
          />
        </div>

        {children && children}
      </div>
    </div>
  );
};

export default memo(Modal);
