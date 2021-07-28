// React, redux
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { addTerminalHistory, TerminalMessage } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import { Apps } from 'src/types/apps';
import { processTerminalInput } from 'src/logic/terminal';

// Assets
import imgSource from 'src/assets/images/icons/terminal.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';

// Styles
import styles from './terminal.module.css';

type PropsType = {
  children?: never;
};

export const Terminal: FC<PropsType> = () => {
  const terminalHistory = useSelector((state: RootState) => state.terminal.terminalHistory);
  const inputHistory = useSelector((state: RootState) => state.terminal.terminalInputHistory);

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [inputHistoryNumber, setInputHistoryNumber] = useState(inputHistory.length);

  const listRef = useRef<HTMLUListElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 38) {
      event.preventDefault();
      setText(inputHistory[inputHistoryNumber]);
      setInputHistoryNumber((prevState: number) => (prevState - 1 >= 0 ? prevState - 1 : prevState));
    } else if (event.keyCode === 40) {
      event.preventDefault();
      setText(inputHistory[inputHistoryNumber]);
      setInputHistoryNumber((prevState: number) => (prevState + 1 < inputHistory.length ? prevState + 1 : prevState));
    } else {
      setInputHistoryNumber(inputHistory.length);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const textToReadable = text.trim().toLowerCase();
    if (!textToReadable) return;
    setText(textToReadable);
    dispatch(addTerminalHistory(`< ${text}`));
    processTerminalInput(text);
    setText('');
  };

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current!.scrollTop = listRef.current!.scrollHeight;
  }, [terminalHistory]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <>
      <Icon imgSource={imgSource} type={Apps.Terminal} />
      <Window type={Apps.Terminal}>
        <ul className={styles.terminalText} id="terminalHistory" ref={listRef}>
          {terminalHistory.map((terminalMessage: TerminalMessage) => (
            <li key={terminalMessage.id}>
              {terminalMessage.message}
            </li>
          ))}
        </ul>
        <pre className={styles.pre}>
          {'root < '}
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              type="text"
              className={styles.input}
              onChange={handleChange}
              value={text}
              onKeyDown={handleKeyDown}
            />
          </form>
        </pre>
      </Window>
    </>
  );
};
