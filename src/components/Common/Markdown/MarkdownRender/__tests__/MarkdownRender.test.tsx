import { render } from '@testing-library/react';
import MarkdownRender, { MarkdownRenderProps } from '../MarkdownRender';

describe('MarkdownRender', () => {
  const initialSetup = (props: Partial<MarkdownRenderProps> = {}) => {
    const initialProps: MarkdownRenderProps = {
      contents: '',
      ...props,
    };

    return render(<MarkdownRender {...initialProps} />);
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });
});