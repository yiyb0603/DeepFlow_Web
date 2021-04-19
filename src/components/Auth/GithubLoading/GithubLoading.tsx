import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeLoader from 'react-spinners/FadeLoader';
import { palette } from 'styles/Palette/Palette';
import Helmet from 'components/Common/Helmet';

const style = require('./GithubLoading.scss');
const cx: ClassNamesFn = classNames.bind(style);

const GithubLoading = (): JSX.Element => {
  return (
    <div className={cx('GithubLoading')}>
      <Helmet title='회원가입 / 로그인' />
      <div className={cx('GithubLoading-Title')}>Github와 연결중입니다!</div>
      <div className={cx('GithubLoading-SubTitle')}>잠시만 기다려주세요!</div>
      <FadeLoader color={palette.main} />
    </div>
  );
};

export default memo(GithubLoading);
