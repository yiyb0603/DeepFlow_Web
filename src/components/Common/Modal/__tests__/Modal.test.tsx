import { fireEvent, render } from '@testing-library/react';
import Modal, { ModalProps } from '../Modal';

describe('Modal', () => {
  const initialSetup = (props: Partial<ModalProps> = {}) => {
    const initialProps: ModalProps = {
      width: '100px',
      height: '100px',
      title: '제목',
      onChangeIsModal: () => {},
      ...props,
    };

    const utils = render(<Modal {...initialProps} />);
    const modalClose: HTMLElement[] = utils.getAllByTestId('modal-close');

    return {
      ...utils,
      modalClose,
    };
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('well handling click', () => {
    const { modalClose } = initialSetup();
    
    for (const close of modalClose) {
      fireEvent.click(close);
    }
  });
});