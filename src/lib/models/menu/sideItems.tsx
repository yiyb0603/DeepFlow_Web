import { VscHome, VscSaveAs } from 'react-icons/vsc';
import { FaStackOverflow } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { VscInfo } from 'react-icons/vsc';
import { AiOutlineTags } from 'react-icons/ai';

export interface ISideItem {
  menuName: string;
  icon: JSX.Element;
  link: string;
  mustToken?: boolean;
}

const ICON_CLASS: string = 'LeftSidebarItem-Icon';
export const sideItems: ISideItem[] = [
  {
    menuName: '메인',
    icon: <VscHome className={ICON_CLASS} />,
    link: '/',
  },

  {
    menuName: '질문글',
    icon: <FaStackOverflow className={ICON_CLASS} />,
    link: '/questions',
  },

  {
    menuName: '멤버 목록',
    icon: <MdCardMembership className={ICON_CLASS} />,
    link: '/users',
  },

  {
    menuName: '태그 목록',
    icon: <AiOutlineTags className={ICON_CLASS} />,
    link: '/tags',
  },

  {
    menuName: '공지사항',
    icon: <HiOutlineSpeakerphone className={ICON_CLASS} />,
    link: '/notice',
  },

  {
    menuName: '이용약관',
    icon: <VscInfo className={ICON_CLASS} />,
    link: '/policy'
  },

  {
    menuName: '임시저장',
    icon: <VscSaveAs className={ICON_CLASS} />,
    link: '/temp',
    mustToken: true,
  },
];