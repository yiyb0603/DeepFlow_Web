import { render } from '@testing-library/react';
import NoItems, { NoItemsProps } from '../NoItems';

describe('NoItems', () => {
  const initialSetup = (props: Partial<NoItemsProps> = {}) => {
    const initialProps: NoItemsProps = {
      text: '',
      imageWidth: '45%',
      ...props,
    };

    return render(<NoItems {...initialProps} />);
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('props render correctly', () => {
    const wrapper = initialSetup({ text: '목록이 없습니다.', imageWidth: '45%' });
    expect(wrapper.getByTestId('no-items-text')).toMatchSnapshot();
    expect(wrapper.getByTestId('no-items-image')).toMatchSnapshot();
  });
});