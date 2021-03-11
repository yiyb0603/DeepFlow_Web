import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./RightSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RightSidebar = (): JSX.Element => {
  return (
    <div className={cx('RightSidebar')}>
      오른쪽 사이드바
    </div>
  );
};

export default RightSidebar;
