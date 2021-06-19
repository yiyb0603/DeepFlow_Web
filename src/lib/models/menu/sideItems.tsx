import { VscHome, VscSaveAs } from 'react-icons/vsc';
import { FaStackOverflow } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { VscInfo } from 'react-icons/vsc';
import { AiOutlineTags } from 'react-icons/ai';

export interface ISideItem {
  idx: number;
  menuName: string;
  icon: JSX.Element;
  link: string;
  mustToken?: boolean;
}

const ICON_CLASS: string = 'LeftSidebarItem-Icon';
export const sideItems: ISideItem[] = [
  {
    idx: 0,
    menuName: '메인',
    icon: <VscHome className={ICON_CLASS} />,
    link: '/',
  },

  {
    idx: 1,
    menuName: '질문글',
    icon: <FaStackOverflow className={ICON_CLASS} />,
    link: '/questions',
  },

  {
    idx: 2,
    menuName: '멤버 목록',
    icon: <MdCardMembership className={ICON_CLASS} />,
    link: '/users',
  },

  {
    idx: 3,
    menuName: '태그 목록',
    icon: <AiOutlineTags className={ICON_CLASS} />,
    link: '/tags',
  },

  {
    idx: 4,
    menuName: '공지사항',
    icon: <HiOutlineSpeakerphone className={ICON_CLASS} />,
    link: '/notice',
  },

  {
    idx: 5,
    menuName: '이용약관',
    icon: <VscInfo className={ICON_CLASS} />,
    link: '/policy'
  },

  {
    idx: 6,
    menuName: '임시저장',
    icon: <VscSaveAs className={ICON_CLASS} />,
    link: '/temp',
    mustToken: true,
  },
];