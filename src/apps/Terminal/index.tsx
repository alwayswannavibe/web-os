// React, redux
import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { addTerminalHistory, TerminalMessage } from 'src/redux/slices/appsSlicesBus/terminalSlice';
import { Apps } from 'src/types/apps';
import { processTerminalInput } from 'src/logic/terminal';
import { changeIconPos, changeWindowPos } from 'src/redux/slices/appsSlicesBus/appsStateSlice';

// Assets
import imgSource from 'src/assets/images/icons/terminal.svg';

// Hooks
import { useApp } from 'src/hooks/useApp';

// Components
import { Window } from 'src/components/Window';
import { Icon } from 'src/components/Icon';

// Styles
import styles from './terminal.module.css';

type PropsType = {
  children?: never;
};

export const Terminal: FC<PropsType> = () => {
  const isTerminalOpen = useSelector((state: RootState) => state.appsState.apps[Apps.Terminal].isOpened);
  const isTerminalCollapsed = useSelector((state: RootState) => state.appsState.apps[Apps.Terminal].isCollapsed);
  const terminalHistory = useSelector((state: RootState) => state.terminal.terminalHistory);
  const inputHistory = useSelector((state: RootState) => state.terminal.terminalInputHistory);
  const terminalIconTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Terminal].iconPos.top);
  const terminalIconLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Terminal].iconPos.left);
  const terminalTopCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Terminal].windowPos.top);
  const terminalLeftCoord = useSelector((state: RootState) => state.appsState.apps[Apps.Terminal].windowPos.left);
  const apps = useSelector((state: RootState) => state.apps.apps);

  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [inputHistoryNumber, setInputHistoryNumber] = useState(inputHistory.length);
  const { handleToggleCollapse, handleOpen, handleClose } = useApp(Apps.Terminal);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.scrollIntoView();
  }, [text]);

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
        handleClick={handleOpen}
        imgSource={imgSource}
        changeCoord={changeIconPos}
        type={Apps.Terminal}
      />
      <Window
        handleClose={handleClose}
        handleCollapse={handleToggleCollapse}
        title={Apps.Terminal}
        topCoord={terminalTopCoord}
        leftCoord={terminalLeftCoord}
        changeCoord={changeWindowPos}
        zIndexProp={100 - apps.indexOf(Apps.Terminal)}
        type={Apps.Terminal}
        isOpen={isTerminalOpen && !isTerminalCollapsed}
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
    </>
  );
};
