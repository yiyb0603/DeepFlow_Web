import { fireEvent, render } from '@testing-library/react';
import MarkdownForm, { MarkdownFormProps } from '../MarkdownForm';

describe('MarkdownForm', () => {
  const initialSetup = (props: Partial<MarkdownFormProps> = {}) => {
    const initialProps: MarkdownFormProps = {
      contents: '',
      onChangeContents: (text: string) => {},
      onChangeIsFocus: () => {},
      ...props,
    };

    const utils = render(<MarkdownForm {...initialProps} />);
    const input = utils.getByPlaceholderText('내용을 입력하세요...');

    return {
      ...utils,
      input,
    };
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('well handling change', () => {
    const { input } = initialSetup();
    fireEvent.change(input);
  });
});