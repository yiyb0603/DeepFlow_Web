import { fireEvent, render } from '@testing-library/react';
import { EView } from 'lib/enum/theme';
import SelectViewMode, { SelectViewModeProps } from '../SelectViewMode';

describe('SelectViewMode', () => {
  const initialSetup = (props: Partial<SelectViewModeProps> = {}) => {
    const initialProps: SelectViewModeProps = {
      viewMode: EView.LIST,
      onChangeViewMode: (viewMode: EView) => {},
      ...props,
    };

    const utils = render(<SelectViewMode {...initialProps} />);
    const clickItems = utils.getAllByTestId('view-mode-click');

    return {
      ...utils,
      clickItems,
    };
  };

  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });

  it('props render correctly', () => {
    const { clickItems } = initialSetup();
    for (const clickItem of clickItems) {
      fireEvent.click(clickItem);
    }
  });
});