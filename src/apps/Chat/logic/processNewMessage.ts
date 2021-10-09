import { Message } from '@Interfaces/message.interface';
import store from 'src/redux/store';
import { changeLastUserMessage, incrementNewMessageCount } from '@Chat/redux/chatUsersSlice/chatUsersSlice';
import { App } from '@Enums/app.enum';
import { addMessage, incrementNumberOfRender, readMessages } from '../redux/chatSlice/chatSlice';
import { changeLastRoomMessage, incrementRoomNewMessagesCount } from '../redux/chatRoomsSlice/chatRooms';

function processNewMessage(newMessage: Message): void {
  const { activeChat } = store.getState().chat;

  if ((newMessage.toUserId === activeChat || (newMessage.owner.id === activeChat && newMessage.toUserId !== null))
    || newMessage.toRoomId === activeChat) {
    store.dispatch(addMessage(newMessage));
    if (newMessage.toUserId !== null) {
      store.dispatch(changeLastUserMessage({ message: newMessage }));
    }
    if (newMessage.toRoomId !== null) {
      store.dispatch(changeLastRoomMessage({ message: newMessage }));
    }
    if (newMessage.owner.username !== store.getState().user.username) {
      store.dispatch(readMessages());
    }
  } else if (newMessage.toRoomId) {
    const roomIndex = store.getState().chatRooms.rooms.findIndex((room) => room.id === newMessage.toRoomId);
    store.dispatch(incrementRoomNewMessagesCount(roomIndex));
  } else {
    const userIndex = store.getState().chatUsers.users.findIndex((user) => user.id === newMessage.owner.id);
    store.dispatch(incrementNewMessageCount({ userIndex }));
  }

  if (!store.getState().apps.appsState[App.Chat].isOpened || store.getState().apps.appsState[App.Chat].isCollapsed) {
    store.dispatch(addMessage(newMessage));
  }

  store.dispatch(incrementNumberOfRender());
}

export { processNewMessage };
