import React from 'react';
import { VscHome } from 'react-icons/vsc';
import { RiDashboardFill } from 'react-icons/ri';
import { FaStackOverflow } from 'react-icons/fa';
import { MdCardMembership } from 'react-icons/md';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { IoIosInformationCircleOutline } from 'react-icons/io';

export interface ISideItemsType {
  menuName: string;
  icon: JSX.Element;
  link: string;
}

const ICON_CLASS: string = 'LeftSidebarItem-Icon';
export const sideItems: ISideItemsType[] = [
  {
    menuName: '메인',
    icon: <VscHome className={ICON_CLASS} />,
    link: '/',
  },

  {
    menuName: '게시글',
    icon: <RiDashboardFill className={ICON_CLASS} />,
    link: '',
  },

  {
    menuName: '질문글',
    icon: <FaStackOverflow className={ICON_CLASS} />,
    link: '',
  },

  {
    menuName: '멤버 목록',
    icon: <MdCardMembership className={ICON_CLASS} />,
    link: '',
  },

  {
    menuName: '공지사항',
    icon: <HiOutlineSpeakerphone className={ICON_CLASS} />,
    link: '/notice',
  },

  {
    menuName: 'About',
    icon: <IoIosInformationCircleOutline className={ICON_CLASS} />,
    link: '',
  },
];