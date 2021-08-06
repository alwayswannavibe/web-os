// Libraries
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useSelector } from 'react-redux';

// Firebase
import { firestore } from 'src/firebase-state/firebase';

// Types
import { RootState } from 'src/redux/store';

// Styles
import styles from './chatInput.module.css';

interface Props {
  children?: never;
}

const ChatInput: FC<Props> = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const photoURL = useSelector((state: RootState) => state.user.photo);
  const socket = useSelector((state: RootState) => state.websocket.socket);

  const [isSmileOpen, setIsSmileOpen] = useState(false);
  const [text, setText] = useState('');

  const pickerRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSmileClick = () => {
    setIsSmileOpen(!isSmileOpen);
  };

  const handleEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    setText(`${text}${emojiObject.emoji}`);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const textToReadable = text.trim();
    if (!textToReadable) {
      setText('');
      return;
    }
    setText(textToReadable);
    firestore.collection('chat').add({
      username,
      text,
      photoURL,
      date: new Date(),
    });
    socket.emit('chatMsg', {
      username,
      text,
      photoUrl: photoURL,
    });
    setText('');
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (!pickerRef.current) {
      return;
    }

    const clientRect = pickerRef.current?.getBoundingClientRect();

    if (
      event.clientX > clientRect.left
      && event.clientX < clientRect.right
      && event.clientY < clientRect.bottom
      && event.clientY > clientRect.top
    ) {
      return;
    }

    if (isSmileOpen) {
      setIsSmileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isSmileOpen]);

  return (
    <form className={styles.wrapper}>
      <textarea value={text} onChange={handleChange} />
      <i
        className={`fas fa-smile ${styles.smileBtn} ${styles.btn}`}
        onClick={handleSmileClick}
      />
      <i
        className={`fas fa-paper-plane ${styles.sendBtn} ${styles.btn}`}
        onClick={handleSubmit}
      />
      {isSmileOpen && (
        <div
          className={styles.smilePicker}
          ref={pickerRef}
        >
          <Picker onEmojiClick={handleEmoji} />
        </div>
      )}
    </form>
  );
};

export { ChatInput };
