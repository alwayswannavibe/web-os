// React
import React, { FC, useEffect, useRef, useState } from 'react';

// Components
import { Window } from 'components/Window';
import { Icon } from 'components/Icon';

// Redux
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { changeChatCoord, changeChatIconCoord } from 'redux/slices/chatSlice';

// import Types
import { Apps } from 'types/apps';

// Hooks
import { useChat } from 'hooks/useChat';

// Assets
import imgSource from 'assets/images/icons/chat.svg';

// Styles
import { Message } from 'types/message';
import { firestore } from 'firebase-state/firebase';
import firebase from 'firebase';
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const Chat: FC<PropsType> = () => {
  // Selectors
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
  const isChatCollapsed = useSelector((state: RootState) => state.chat.isChatCollapsed);
  const chatIconTopCoord = useSelector((state: RootState) => state.chat.chatIconTopCoord);
  const chatIconLeftCoord = useSelector((state: RootState) => state.chat.chatIconLeftCoord);
  const chatTopCoord = useSelector((state: RootState) => state.chat.chatTopCoord);
  const chatLeftCoord = useSelector((state: RootState) => state.chat.chatLeftCoord);
  const apps = useSelector((state: RootState) => state.apps.apps);
  const messages = useSelector((state: RootState) => state.chat.messages);

  // Init
  const [text, setText] = useState('');
  const { handleChatCollapseToggle, handleOpenChat, handleCloseChat } = useChat();
  const username = useSelector((state: RootState) => state.user.username);
  const inputEl = useRef<HTMLInputElement>(null);
  const photoURL = useSelector((state: RootState) => state.user.photo);
  const locale = useSelector((state: RootState) => state.locale.locale);

  // Handlers
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

  useEffect(() => {
    const messagesList = document.getElementsByClassName(styles.otherMsg);
    messagesList[messagesList.length - 1]?.scrollIntoView();
  }, [messages]);

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
      {isChatOpen && !isChatCollapsed && (
        <Window
          handleClose={handleCloseChat}
          handleCollapse={handleChatCollapseToggle}
          title={Apps.Chat}
          topCoord={chatTopCoord}
          leftCoord={chatLeftCoord}
          changeCoord={changeChatCoord}
          zIndexProp={100 - apps.indexOf(Apps.Chat)}
          appType={Apps.Chat}
        >
          <ul className={styles.messagesList}>
            {messages.map((message: Message) => (
              <li
                className={`${styles.msgContainer} ${username === message.username ? styles.myMsg : ''}`}
                key={message.id}
              >
                <img
                  src={
                    message.photo ||
                    'https://d11a6trkgmumsb.cloudfront.net/original/3X/d/8/d8b5d0a738295345ebd8934b859fa1fca1c8c6ad.jpeg'
                  }
                  alt="avatar"
                  width="60px"
                  height="60px"
                  className={styles.avatar}
                />
                <div className={styles.nameAndMsgContainer}>
                  <div className={styles.ownerAndDateContainer}>
                    <p className={styles.msgOwner}>{message.username || 'anonymous'}</p>
                    <p className={styles.msgDate}>
                      {message.date?.toLocaleDateString(locale, {
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      }) || ''}
                    </p>
                  </div>
                  <p className={styles.otherMsg}>{message.text}</p>
                </div>
              </li>
            ))}
          </ul>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" ref={inputEl} className={styles.input} onChange={handleChange} value={text} />
            <button className={styles.sendBtn} type="submit">
              <i className="fas fa-paper-plane" />
            </button>
          </form>
        </Window>
      )}
    </>
  );
};
