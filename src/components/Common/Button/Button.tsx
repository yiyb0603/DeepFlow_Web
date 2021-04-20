import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { palette } from 'styles/Palette/Palette';

const style = require('./Button.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ButtonProps {
  width?: string;
  height?: string;
  color: string;
  fontColor?: string;
  children?: ReactNode;
  onClick: () => void | Promise<void>;
  padding?: string;
  margin?: string;
  customStyle?: CSSProperties;
}

const Button = ({
  width,
  height = '35px',
  color,
  fontColor = palette.white,
  children,
  onClick,
  padding = '0.5rem',
  margin = '0 0 0 0',
  customStyle,
}: ButtonProps) => {
  const buttonStyle: CSSProperties = {
    ...customStyle,
    width,
    height,
    color: fontColor,
    backgroundColor: color,
    margin,
    padding,
  };

  return (
    <button
      className={cx('Button')}
      style={buttonStyle}
      onClick={onClick}
    >
      {children && children}
    </button>
  );
};

export default Button;
