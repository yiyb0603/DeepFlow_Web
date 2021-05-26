import { render } from '@testing-library/react';
import { ChangeEvent, KeyboardEvent } from 'react';
import SearchInput, { SearchInputProps } from '../SearchInput';

describe('SearchInput', () => {
  const initialSetup = (props: Partial<SearchInputProps> = {}) => {
    const initialProps: SearchInputProps = {
      value: '',
      onChangeValue: (e: ChangeEvent<HTMLInputElement>) => {},
      onKeydown: (e: KeyboardEvent<HTMLInputElement>) => {},
      placeholder: '입력',
      ...props,
    };

    return render(<SearchInput {...initialProps} />);
  };
  
  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('props render correctly', () => {
    const wrapper = initialSetup({ value: '텍스트', placeholder: '입력' });
    expect(wrapper.getByDisplayValue('텍스트')).toMatchSnapshot();
    expect(wrapper.getByPlaceholderText('입력')).toMatchSnapshot();
  });
});