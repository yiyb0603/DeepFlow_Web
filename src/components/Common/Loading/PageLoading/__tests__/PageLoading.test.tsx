import { render } from '@testing-library/react';
import PageLoading, { PageLoadingProps } from '../PageLoading';

describe('PageLoading', () => {
  const initialSetup = (props: Partial<PageLoadingProps> = {}) => {
    const initialProps: PageLoadingProps = {
      text: '로딩중',
      ...props,
    };

    return render(<PageLoading {...initialProps} />);
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });
});