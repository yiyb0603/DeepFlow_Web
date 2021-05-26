import { ChangeEvent } from 'react';
import { fireEvent, render } from '@testing-library/react';
import TitleForm, { TitleFormProps } from '../TitleForm';

describe('TitleForm', () => {
  const initialSetup = (props: Partial<TitleFormProps> = {}) => {
    const initialProps: TitleFormProps = {
      title: '',
      onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => {},
      ...props,
    };

    return render(<TitleForm {...initialProps} />)
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('props render correctly', () => {
    const wrapper = initialSetup({ title: '제목' });
    expect(wrapper.getByPlaceholderText('제목을 입력하세요')).toMatchSnapshot();
  });

  it('well handling change', () => {
    const titleForm: HTMLElement | null = document.getElementById('titleFormInput');
    if (titleForm !== null) {
      fireEvent.change(titleForm);
    }
  });
});