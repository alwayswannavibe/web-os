// Libraries
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// Redux
import { RootState } from 'src/redux/store';

// Firebase
import { firestore } from 'src/firebase-state/firebase';

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
  const username = useSelector((state: RootState) => state.user.username);

  const [text, setText] = useState('');
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
      <Icon imgSource={imgSource} type={Apps.Chat} />
      <Window type={Apps.Chat}>
        <MessagesList />
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" ref={inputEl} className={styles.input} onChange={handleChange} value={text} autoFocus />
          <button className={styles.sendBtn} type="submit">
            <i className="fas fa-paper-plane" />
          </button>
        </form>
      </Window>
    </>
  );
};
