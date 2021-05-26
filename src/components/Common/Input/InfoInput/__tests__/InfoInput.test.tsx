import { ChangeEvent } from 'react';
import { render } from '@testing-library/react';
import InfoInput, { InfoInputProps } from '../InfoInput';

describe('InfoInput', () => {
  const initialSetup = (props: Partial<InfoInputProps> = {}) => {
    const initialProps: InfoInputProps = {
      value: '',
      onChange: (e: ChangeEvent<HTMLInputElement>) => {},
      placeholder: '',
      icon: <></>,
      ...props,
    };
    
    return render(<InfoInput {...initialProps} />);
  };
  
  it('render correctly', () => {
    const { container } = initialSetup();
    expect(container).toMatchSnapshot();
  });
});