// Libraries
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  addMessageInputValue,
  changeMessageInputValue,
  clearMessageInputValue,
} from 'src/apps/Chat/redux';

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
  const text = useSelector((state: RootState) => state.chat.text);

  const dispatch = useDispatch();

  const [isSmileOpen, setIsSmileOpen] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [text]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeMessageInputValue(event.target.value));
  };

  const handleSmileClick = () => {
    setIsSmileOpen(!isSmileOpen);
  };

  const handleEmoji = (event: React.MouseEvent, emojiObject: IEmojiData) => {
    dispatch(addMessageInputValue(emojiObject.emoji));
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const textToReadable = text.trim();
    if (!textToReadable) {
      dispatch(clearMessageInputValue());
      return;
    }
    dispatch(changeMessageInputValue(textToReadable));
    socket.emit('chatMsg', {
      username,
      text,
      photoUrl: photoURL,
    });
    dispatch(clearMessageInputValue());
  };

  const handleDocumentClick = useCallback((event: MouseEvent) => {
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
  }, [isSmileOpen]);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [handleDocumentClick, isSmileOpen]);

  return (
    <form className={styles.wrapper}>
      <textarea value={text} onChange={handleChange} ref={inputRef} />
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
