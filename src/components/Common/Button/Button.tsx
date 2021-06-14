import { CSSProperties, ReactNode, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import palette from 'styles/palette';
import LoadingSpinner from '../Loading/LoadingSpinner';

const style = require('./Button.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface ButtonProps {
  width?: string;
  height?: string;
  backgroundColor: string;
  color?: string;
  children: ReactNode;
  handleClick: () => void | Promise<void>;
  isLoading?: boolean;
  padding?: string;
  margin?: string;
  customStyle?: CSSProperties;
}

const Button = ({
  width,
  height = '35px',
  backgroundColor,
  color = palette.white,
  children,
  handleClick,
  isLoading = false,
  padding = '0',
  margin = '0',
  customStyle,
}: ButtonProps): JSX.Element => {
  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      ...customStyle,
      width,
      height,
      color,
      backgroundColor,
      margin,
      padding,
    };
  }, [backgroundColor, color, customStyle, height, margin, padding, width]);

  const onClick = useCallback((): void => {
    if (isLoading) {
      return;
    }

    handleClick();
  }, [handleClick, isLoading]);

  return (
    <button
      data-testid='button'
      className={cx('Button')}
      style={buttonStyle}
      onClick={onClick}
    >
      {
        isLoading ? <LoadingSpinner /> : children
      }
    </button>
  );
};

export default Button;
