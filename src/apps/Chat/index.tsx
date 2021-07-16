// React, redux
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { changeChatCoord, changeChatIconCoord } from 'src/redux/slices/appsSlicesBus/chatSlice';
import { firestore } from 'src/firebase-state/firebase';
import firebase from 'firebase';

// Hooks
import { useChat } from 'src/hooks/useChat';

// Assets
import imgSource from 'src/assets/images/icons/chat.svg';

// Types
import { Apps } from 'src/types/apps';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';
import { MessagesList } from './components/MessagesList';

// Styles
import styles from './chat.module.css';

type PropsType = {
  children?: never;
};

export const Chat: FC<PropsType> = () => {
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
  const isChatCollapsed = useSelector((state: RootState) => state.chat.isChatCollapsed);
  const chatIconTopCoord = useSelector((state: RootState) => state.chat.chatIconTopCoord);
  const chatIconLeftCoord = useSelector((state: RootState) => state.chat.chatIconLeftCoord);
  const chatTopCoord = useSelector((state: RootState) => state.chat.chatTopCoord);
  const chatLeftCoord = useSelector((state: RootState) => state.chat.chatLeftCoord);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const username = useSelector((state: RootState) => state.user.username);

  const [text, setText] = useState('');
  const { handleChatCollapseToggle, handleOpenChat, handleCloseChat } = useChat();
  const inputEl = useRef<HTMLInputElement>(null);
  const photoURL = useSelector((state: RootState) => state.user.photo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const textToReadable = text.trim().toLowerCase();
    if (!textToReadable) return;
    setText(textToReadable);
    firestore.collection('chat').add({
      username,
      text,
      photoURL,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText('');
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <>
      <Icon
        title={Apps.Chat}
        topCoord={chatIconTopCoord}
        leftCoord={chatIconLeftCoord}
        handleClick={handleOpenChat}
        imgSource={imgSource}
        changeCoord={changeChatIconCoord}
      />
      <Window
        handleClose={handleCloseChat}
        handleCollapse={handleChatCollapseToggle}
        title={Apps.Chat}
        topCoord={chatTopCoord}
        leftCoord={chatLeftCoord}
        changeCoord={changeChatCoord}
        zIndexProp={100 - apps.indexOf(Apps.Chat)}
        appType={Apps.Chat}
        isOpen={isChatOpen && !isChatCollapsed}
      >
        <MessagesList />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" ref={inputEl} className={styles.input} onChange={handleChange} value={text} />
          <button className={styles.sendBtn} type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </Window>
    </>
  );
};
