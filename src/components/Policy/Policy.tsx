import { useState, useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EPolicy } from 'lib/enum/policy';
import { PERSONAL_POLICY } from 'lib/models/policy/personalPolicy';
import { SERVICE_POLICY } from 'lib/models/policy/servicePolicy';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PolicyTab from './PolicyTab';
import usePathName from 'hooks/util/usePathName';

const style = require('./Policy.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Policy = (): JSX.Element => {
  const pathName: string = usePathName();
  
  const { PERSONAL, SERVICE } = EPolicy;
  const [policyTab, setPolicyTab] = useState<EPolicy>(PERSONAL);

  const lastPathName: string = useMemo(() => {
    return pathName.substring(pathName.lastIndexOf('/') + 1, pathName.length);
  }, [pathName]);

  const onChangePolicyTab = useCallback((policyTab: EPolicy): void => {
    setPolicyTab(policyTab);
  }, []);

  const initPolicyTab = useCallback((): void => {
    if (lastPathName === 'personal') {
      setPolicyTab(PERSONAL);
    } else if (lastPathName === 'service') {
      setPolicyTab(SERVICE);
    }
  }, [PERSONAL, SERVICE, lastPathName]);

  useEffect(() => {
    initPolicyTab();
  }, [initPolicyTab]);

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