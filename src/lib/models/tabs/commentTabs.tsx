import { RiCodeSSlashLine } from 'react-icons/ri';
import { FiEye } from 'react-icons/fi';
import { ECommentTab } from 'lib/enum/comment';

export interface ICommentTab {
  id: ECommentTab;
  icon: JSX.Element;
  name: string;
}

const iconClass: string = 'PreviewTabItem-Icon';

export const commentTabs: ICommentTab[] = [
  {
    id: ECommentTab.WRITE,
    icon: <RiCodeSSlashLine className={iconClass} />,
    name: 'Write',
  },

  {
    id: ECommentTab.PREVIEW,
    icon: <FiEye className={iconClass} />,
    name: 'Preview',
  },
];