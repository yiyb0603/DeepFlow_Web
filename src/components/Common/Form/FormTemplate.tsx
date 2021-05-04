import { ChangeEvent, ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import TitleForm from './TitleForm';

const style = require('./FormTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface FormTemplateProps {
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  children: ReactNode;
}

const FormTemplate = ({
  title,
  onChangeTitle,
  children,
}: FormTemplateProps): JSX.Element => {
  return (
    <div className={cx('FormTemplate')}>
      <TitleForm
        title={title}
        onChangeTitle={onChangeTitle}
      />

      {children}
    </div>
  );
}

export default FormTemplate;