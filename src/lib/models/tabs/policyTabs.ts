import { EPolicy } from 'lib/enum/policy';

export interface IPolicyTab {
  key: EPolicy;
  name: string;
  path: string;
}

export const policyTabs: IPolicyTab[] = [
  {
    key: EPolicy.PERSONAL,
    name: '개인정보처리방침',
    path: '/policy/personal',
  },

  {
    key: EPolicy.SERVICE,
    name: '이용약관',
    path: '/policy/service',
  },
]