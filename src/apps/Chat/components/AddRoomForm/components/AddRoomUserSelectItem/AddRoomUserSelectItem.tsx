// Libraries
import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

// Redux
import { addUserToNewRoom, removeUserFromNewRoom } from '@Chat/redux/chatRoomsSlice/chatRooms';

// Interface
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './addRoomUserSelectItem.module.css';

interface Props extends ChildrenNever {
  username: string;
  id: number;
}

const AddRoomUserSelectItem: FC<Props> = ({ username, id }: Props) => {
  const [isIncluded, setIsIncluded] = useState(false);
  const dispatch = useDispatch();

  function toogleUserIncluded() {
    if (isIncluded) {
      dispatch(removeUserFromNewRoom(id));
      setIsIncluded(false);
    } else {
      dispatch(addUserToNewRoom(id));
      setIsIncluded(true);
    }
  }

  return (
    <div className={`${styles.userSelectItem} ${isIncluded ? styles.selectedItem : ''}`}>
      <p>{username}</p>
      <button
        type="button"
        onClick={toogleUserIncluded}
        className={styles.userSelectButton}
      >
        {isIncluded ? '-' : '+'}
      </button>
    </div>
  );
};

export { AddRoomUserSelectItem };
