import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostButtonProps {
  text: string;
  color: 'Blue' | 'Gray';
  onClick: () => void;
}

const PostButton = ({ text, color, onClick }: PostButtonProps): JSX.Element => {
  return (
    <button
      className={cx('PostButton', `PostButton-${color}`)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PostButton;
