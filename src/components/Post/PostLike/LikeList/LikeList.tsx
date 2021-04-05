import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Modal from 'components/Common/Modal';
import { ILike } from 'types/like.types';
import LikeItem from './LikeItem';

const style = require('./LikeList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LikeListProps {
  likeList: ILike[];
  onChangeIsModal: () => void;
}

const LikeList = ({
  likeList,
  onChangeIsModal,
}: LikeListProps): JSX.Element => {
  return (
    <Modal
      width='25%'
      height='50%'
      title='좋아요 목록'
      onChangeIsModal={onChangeIsModal}
    >
      <div className={cx('LikeList')}>
        {
          likeList.map(({ idx, user, pressedAt }: ILike) => {
            const { avatar, name, description } = user;

            return (
              <LikeItem
                key={idx}
                userIdx={user.idx}
                avatar={avatar}
                name={name}
                description={description}
                pressedAt={pressedAt}
              />
            );
          })
        }
      </div>
    </Modal>
  );
};

export default LikeList;
