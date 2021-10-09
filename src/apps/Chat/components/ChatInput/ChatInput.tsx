// Libraries
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import Picker, { IEmojiData } from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons';

// Redux
import {
  addMessageInputValue,
  changeMessageInputValue,
  clearMessageInputValue, sendMessage,
} from '@Chat/redux/chatSlice/chatSlice';

// Types
import { RootState } from '@Types/rootState.type';

// Interface
import { ChildrenNever } from '@Interfaces/childrenNever.interface';

// Styles
import styles from './chatInput.module.css';

const ChatInput: FC<ChildrenNever> = () => {
  const text = useSelector((state: RootState) => state.chat.text);
  const activeChat = useSelector((state: RootState) => state.chat.activeChat);

  const dispatch = useDispatch();

  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [isSmileOpen, setIsSmileOpen] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, [text]);

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    dispatch(changeMessageInputValue(event.target.value));
  }

  function handleSmileClick(): void {
    setIsSmileOpen(!isSmileOpen);
  }

  function handleEmoji(event: React.MouseEvent, emojiObject: IEmojiData): void {
    dispatch(addMessageInputValue(emojiObject.emoji));
  }

  function handleSubmit(event?: React.SyntheticEvent): void {
    if (event) event.preventDefault();
    const textToReadable = text.trim();
    if (!textToReadable) {
      dispatch(clearMessageInputValue());
      return;
    }
    dispatch(sendMessage(textToReadable));
    dispatch(clearMessageInputValue());
  }

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

  function handleKeyDown(event: React.KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  if (activeChat === -1) {
    return null;
  }

  return (
    <form className={styles.wrapper}>
      <textarea value={text} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef} placeholder="Напишите сообщение..." />
      <FontAwesomeIcon icon={faSmile} className={`${styles.smileBtn} ${styles.btn}`} onClick={handleSmileClick} />
      <FontAwesomeIcon icon={faPaperPlane} className={`${styles.sendBtn} ${styles.btn}`} onClick={handleSubmit} />
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
