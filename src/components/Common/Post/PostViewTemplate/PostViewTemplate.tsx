import { ReactNode } from 'react';
import FadeIn from 'react-fade-in';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostViewTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostViewTemplateProps {
  children: ReactNode;
}

const PostViewTemplate = ({
  children,
}: PostViewTemplateProps): JSX.Element => {
  return (
    <FadeIn>
      <div className={cx('PostViewTemplate')}>
        {children}
      </div>
    </FadeIn>
  );
};

export default PostViewTemplate;
