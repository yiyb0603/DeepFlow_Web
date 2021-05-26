import { render } from '@testing-library/react';
import PageTitle, { PageTitleProps } from '../PageTitle';

describe('PageTitle', () => {
  const initialSetup = (props: Partial<PageTitleProps> = {}) => {
    const initialProps: PageTitleProps = {
      title: '제목',
      subTitle: '부제목',
      ...props,
    };

    return render(<PageTitle {...initialProps} />);
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('props render correctly', () => {
    const wrapper = initialSetup({ title: '제목', subTitle: '부제목' });
    expect(wrapper.getByTestId('page-title')).toMatchSnapshot();
    expect(wrapper.getByTestId('page-subtitle')).toMatchSnapshot();
  });
});