import FadeIn from 'react-fade-in';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useTabState from 'hooks/util/useTabState';
import { EPolicy } from 'lib/enum/policy';
import { PERSONAL_POLICY } from 'lib/models/policy/personalPolicy';
import { SERVICE_POLICY } from 'lib/models/policy/servicePolicy';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import Helmet from 'components/Common/Helmet';
import PolicyTab from './PolicyTab';

const style = require('./Policy.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Policy = (): JSX.Element => {
  const { PERSONAL } = EPolicy;
  const [policyTab, onChangePolicyTab] = useTabState<EPolicy>('tab', PERSONAL);

  return (
    <FadeIn>
      <div className={cx('Policy')}>
        <Helmet title={policyTab === PERSONAL? '개인정보처리방침' : '이용약관'} />
        <PolicyTab
          policyTab={policyTab}
          onChangePolicyTab={onChangePolicyTab}
        />

        <MarkdownRender
          contents={policyTab === PERSONAL ? PERSONAL_POLICY : SERVICE_POLICY}
        />
      </div>
    </FadeIn>
  )
}

export default Policy;