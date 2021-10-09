// Libraries
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  changeActiveChat,
  changeNewMessageCount,
  fetchMessages,
  readMessages,
} from '@Chat/redux/chatSlice/chatSlice';

// Interfaces
import { ChildrenNever } from '@Interfaces/childrenNever.interface';
import { Room } from '@Apps/Chat/interfaces/room';

// Types
import { RootState } from '@Types/rootState.type';

// Components
import { getReadableLastVisitDate } from '@Chat/logic/dateProcess';
import { Loading } from '@Components/Loading/Loading';
import { Error } from '@Components/Error/Error';
import {
  changeNewMessageRoomCountToZero,
  closeAddRoomForm,
  fetchRooms,
  openAddRoomForm,
} from '@Chat/redux/chatRoomsSlice/chatRooms';
import { ChatSelectionElement } from '../ChatSelectionElement/ChatSelectionElement';

// Styles
import styles from './roomSelectionItems.module.css';

interface Props extends ChildrenNever {
  rooms: Room[],
}

const RoomSelectionItems: FC<Props> = ({ rooms }: Props) => {
  const language = useSelector((state: RootState) => state.language.language);
  const isLoading = useSelector((state: RootState) => state.chatRooms.isLoading);
  const hasError = useSelector((state: RootState) => state.chatRooms.hasError);

  const dispatch = useDispatch();

  function changeChat(chatId: number): void {
    dispatch(closeAddRoomForm());
    dispatch(changeActiveChat({ id: chatId, type: 'Room' }));
    dispatch(fetchMessages(chatId));
    dispatch(readMessages());
    dispatch(changeNewMessageCount({ id: chatId, activeType: 'Room' }));
    dispatch(changeNewMessageRoomCountToZero({ userId: chatId }));
  }

  function refetchRooms(): void {
    dispatch(fetchRooms());
  }

  function handleOpenAddRoom(): void {
    dispatch(openAddRoomForm());
  }

  if (isLoading) {
    return <Loading />;
  }

  if (hasError) {
    return <Error refetch={refetchRooms} />;
  }

  return (
    <>
      {rooms.map((room) => (
        <ChatSelectionElement
          name={room.name}
          lastVisitDate={getReadableLastVisitDate(room.lastMessage?.createdAt || room.createdAt, language)}
          avatarLink={room.image}
          countOfNewMessages={room.numberOfNewMessages}
          lastMessage={room.lastMessage}
          userId={room.id}
          key={room.name}
          changeChat={changeChat}
        />
      ))}
      <button type="button" className={styles.addButton} onClick={handleOpenAddRoom}>+</button>
    </>
  );
};

export { RoomSelectionItems };
