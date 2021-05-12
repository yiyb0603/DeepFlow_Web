import { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import { checkLoggedIn } from 'util/checkLoggedIn';
import useDeleteEmoji from 'hooks/commentEmoji/useDeleteEmoji';
import useCreateEmoji from 'hooks/commentEmoji/useCreateEmoji';

const style = require('./EmojiItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface EmojiItemProps {
  count: number;
  emoji: string;
  users: ICommentEmojiInfo[];
  commentIdx: number;
}

const EmojiItem = ({
  count,
  emoji,
  users,
  commentIdx,
}: EmojiItemProps): JSX.Element => {
  const { requestCreateEmoji } = useCreateEmoji();
  const { requestDeleteEmoji } = useDeleteEmoji();
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  
  const existEmoji: ICommentEmojiInfo | undefined = useMemo(() => {
    return users.find((user) => user.user.idx === (myInfo && myInfo.idx));
  }, [myInfo, users]);

  const onClickEmojiItem = useCallback((): void => {
    if (!checkLoggedIn()) {
      return;
    }

    if (existEmoji === undefined) {
      requestCreateEmoji(emoji, commentIdx);
    } else {
      requestDeleteEmoji(existEmoji!.idx, commentIdx, emoji);
    }
  }, [commentIdx, emoji, existEmoji, requestCreateEmoji, requestDeleteEmoji]);

  return (
    <div className={cx('EmojiItem')} onClick={onClickEmojiItem}>
      <div className={cx('EmojiItem-Emoji')}>{emoji}</div>
      <div className={cx('EmojiItem-Count')}>{count}</div>
    </div>
  );
};

export default EmojiItem;
