// Libraries
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
  addTerminalHistory,
  incrementAutocompleteNumber, resetAutocompleteNumber,
  TerminalMessage,
} from 'src/redux/slices/appsSlicesBus/terminalSlice';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';

// Logic
import { processTerminalInput } from 'src/logic/terminal';
import { getAvailableAutocomplete } from 'src/logic/terminal/autocomplete';

// Assets
import imgSource from 'src/assets/images/icons/terminal.svg';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';

// Styles
import styles from './terminal.module.css';

interface Props {
  children?: never;
}

export const Terminal: FC<Props> = () => {
  const terminalHistory = useSelector((state: RootState) => state.terminal.terminalHistory);
  const inputHistory = useSelector((state: RootState) => state.terminal.terminalInputHistory);

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [inputHistoryNumber, setInputHistoryNumber] = useState(inputHistory.length);

  const listRef = useRef<HTMLDivElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    dispatch(resetAutocompleteNumber());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 38) {
      event.preventDefault();
      const updatedInputHistoryNumber = inputHistoryNumber > 0 ? inputHistoryNumber - 1 : inputHistoryNumber;
      setInputHistoryNumber(updatedInputHistoryNumber);
      setText(inputHistory[updatedInputHistoryNumber] || '');
    } else if (event.keyCode === 40) {
      event.preventDefault();
      const updatedInputHistoryNumber = inputHistoryNumber < inputHistory.length - 1 ? inputHistoryNumber + 1 : inputHistoryNumber;
      setInputHistoryNumber(updatedInputHistoryNumber);
      setText(inputHistory[updatedInputHistoryNumber] || '');
    } else if (event.keyCode === 9) {
      event.preventDefault();
      const textArr = text.split(' ');
      const autocomplete = getAvailableAutocomplete(text);
      textArr[textArr.length - 1] = autocomplete;
      setText(textArr.join(' '));
      dispatch(incrementAutocompleteNumber());
    } else {
      setInputHistoryNumber(inputHistory.length);
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const textToReadable = text.trim().toLowerCase();
    if (!textToReadable) return;
    setText(textToReadable);
    dispatch(addTerminalHistory(`root:~$ ${text}`));
    processTerminalInput(text);
    setText('');
    dispatch(resetAutocompleteNumber());
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
        <div className={styles.wrapper} ref={listRef}>
          <ul className={styles.terminalText} id="terminalHistory">
            {terminalHistory.map((terminalMessage: TerminalMessage) => (
              <li key={terminalMessage.id}>
                {terminalMessage.message.startsWith('root:~$ ') ? (
                  <>
                    <span className={styles.user}>root</span>
                    :
                    <span className={styles.tilda}>~</span>
                    {'$ '}
                    {terminalMessage.message.slice(8)}
                  </>
                ) : terminalMessage.message}
              </li>
            ))}
          </ul>
          <pre className={styles.pre}>
            <span className={styles.user}>root</span>
            :
            <span className={styles.tilda}>~</span>
            {'$ '}
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
        </div>
      </Window>
    </>
  );
};
