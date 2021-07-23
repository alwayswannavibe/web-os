// React, redux
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { firestore } from 'src/firebase-state/firebase';
import { changeIconPos, changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

// Hooks
import { useApp } from 'src/hooks/useApp';

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
  const isChatOpen = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].isOpened);
  const isChatCollapsed = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].isCollapsed);
  const chatIconTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].iconPos.top);
  const chatIconLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].iconPos.left);
  const chatTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].windowPos.top);
  const chatLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Chat].windowPos.left);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const username = useSelector((state: RootState) => state.user.username);

  const [text, setText] = useState('');
  const { handleToggleCollapse, handleOpen, handleClose } = useApp(Apps.Chat);
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
      date: new Date(),
    });
    setText('');
  };

  return (
    <>
      <Icon
        title={Apps.Chat}
        topCoord={chatIconTopCoord}
        leftCoord={chatIconLeftCoord}
        handleClick={handleOpen}
        imgSource={imgSource}
        changeCoord={changeIconPos}
        type={Apps.Chat}
      />
      <Window
        handleClose={handleClose}
        handleCollapse={handleToggleCollapse}
        title={Apps.Chat}
        topCoord={chatTopCoord}
        leftCoord={chatLeftCoord}
        changeCoord={changeWindowPos}
        zIndexProp={100 - apps.indexOf(Apps.Chat)}
        type={Apps.Chat}
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
