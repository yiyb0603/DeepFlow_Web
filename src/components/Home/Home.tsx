import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import RecentPost from './RecentPost';

const style = require('./Home.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Home = (): JSX.Element => {
  return (
    <div className={cx('Home')}>
      <RecentPost />
    </div>
  );
};

export default Home;
