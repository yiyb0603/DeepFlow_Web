import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useEmoji from 'hooks/useEmoji';
import { errorToast } from 'lib/Toast';
import { useCallback, useMemo } from 'react';
import { ICommentEmojiInfo } from 'types/commentEmoji.types';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';

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
  const { requestDeleteEmoji, requestCreateEmoji } = useEmoji();
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  
  const existEmoji: ICommentEmojiInfo | undefined = useMemo(() => {
    return users.find((user) => user.user.idx === (myInfo && myInfo.idx));
  }, [myInfo, users]);

  const onClickEmojiItem = useCallback((): void => {
    if (myInfo) {
      if (existEmoji === undefined) {
        requestCreateEmoji(emoji, commentIdx);
      } else {
        requestDeleteEmoji(existEmoji!.idx, commentIdx, emoji);
      }
    } else {
      errorToast('로그인 후 가능합니다.');
    }
  }, [commentIdx, emoji, existEmoji, myInfo, requestCreateEmoji, requestDeleteEmoji]);

  return (
    <div className={cx('EmojiItem')} onClick={onClickEmojiItem}>
      <div className={cx('EmojiItem-Emoji')}>{emoji}</div>
      <div className={cx('EmojiItem-Count')}>{count}</div>
    </div>
  );
};

export default EmojiItem;
