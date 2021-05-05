// React
import React, { FC, useEffect, useRef, useState } from 'react';

// Components
import { Window } from 'components/Window';
import { Icon } from 'components/Icon';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import {
  addTerminalHistory,
  changeTerminalCoord,
  changeTerminalIconCoord,
  TerminalMessage,
} from 'redux/slices/terminalSlice';

// import Types
import { Apps } from 'types/apps';

// Hooks
import { useTerminal } from 'hooks/useTerminal';

// Logic
import { processTerminalInput } from 'logic/terminal';

// Assets
import imgSource from 'assets/images/icons/terminal.svg';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const Terminal: FC<PropsType> = () => {
  // Selectors
  const isTerminalOpen = useSelector((state: RootState) => state.terminal.isTerminalOpen);
  const isTerminalCollapsed = useSelector((state: RootState) => state.terminal.isTerminalCollapsed);
  const terminalHistory = useSelector((state: RootState) => state.terminal.terminalHistory);
  const inputHistory = useSelector((state: RootState) => state.terminal.terminalInputHistory);
  const terminalIconTopCoord = useSelector((state: RootState) => state.terminal.terminalIconTopCoord);
  const terminalIconLeftCoord = useSelector((state: RootState) => state.terminal.terminalIconLeftCoord);
  const terminalTopCoord = useSelector((state: RootState) => state.terminal.terminalTopCoord);
  const terminalLeftCoord = useSelector((state: RootState) => state.terminal.terminalLeftCoord);
  const apps = useSelector((state: RootState) => state.apps.apps);

  // Init
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [inputHistoryNumber, setInputHistoryNumber] = useState(inputHistory.length);
  const { handleTerminalCollapseToggle, handleOpenTerminal, handleCloseTerminal } = useTerminal();
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.scrollIntoView();
  }, [text]);

  // Handlers
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
    const historyItems = document.getElementsByClassName('historyItem');
    historyItems[historyItems.length - 1]?.scrollIntoView();
  }, [terminalHistory]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <>
      <Icon
        title={Apps.Terminal}
        topCoord={terminalIconTopCoord}
        leftCoord={terminalIconLeftCoord}
        handleClick={handleOpenTerminal}
        imgSource={imgSource}
        changeCoord={changeTerminalIconCoord}
      />
      {isTerminalOpen && !isTerminalCollapsed && (
        <Window
          handleClose={handleCloseTerminal}
          handleCollapse={handleTerminalCollapseToggle}
          title={Apps.Terminal}
          topCoord={terminalTopCoord}
          leftCoord={terminalLeftCoord}
          changeCoord={changeTerminalCoord}
          zIndexProp={100 - apps.indexOf(Apps.Terminal)}
          appType={Apps.Terminal}
        >
          <div className={styles.terminalText} id="terminalHistory">
            {terminalHistory.map((terminalMessage: TerminalMessage) => (
              <p key={terminalMessage.id} className="historyItem">
                {terminalMessage.message}
              </p>
            ))}
          </div>
          <pre className={styles.pre}>
            {'root < '}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                ref={inputEl}
                className={styles.input}
                onChange={handleChange}
                value={text}
                onKeyDown={handleKeyDown}
              />
            </form>
          </pre>
        </Window>
      )}
    </>
  );
};
