import { useState, useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { EPolicy } from 'lib/enum/policy';
import { PERSONAL_POLICY } from 'lib/models/policy/personalPolicy';
import { SERVICE_POLICY } from 'lib/models/policy/servicePolicy';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PolicyTab from './PolicyTab';
import useQueryString from 'hooks/util/useQueryString';

const style = require('./Policy.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Policy = (): JSX.Element => {
  const { PERSONAL } = EPolicy;
  const history: History = useHistory();
  const query = useQueryString();
  const [policyTab, setPolicyTab] = useState<EPolicy>(query.tab as EPolicy || PERSONAL);

  const onChangePolicyTab = useCallback((policyTab: EPolicy): void => {
    history.push(`?tab=${policyTab}`);
    setPolicyTab(policyTab);
  }, [history]);

  return (
    <div className={cx('Policy')}>
      <PolicyTab
        policyTab={policyTab}
        onChangePolicyTab={onChangePolicyTab}
      />

      <MarkdownRender
        contents={policyTab === PERSONAL ? PERSONAL_POLICY : SERVICE_POLICY}
      />
    </div>
  )
}

export default Policy;