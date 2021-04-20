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
  clearTerminalHistory,
  closeTerminal,
  openTerminal,
  TerminalMessage,
  toggleCollapseTerminal,
} from 'redux/slices/terminalSlice';
import { openSettings } from 'redux/slices/settingsSlice';
import { setLocale } from 'redux/slices/localeSlice';
import { setTheme } from 'redux/slices/themeSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';

// import Types
import { Apps } from 'types/apps';
import { Themes } from 'types/themes';
import { Locales } from 'types/locales';

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
  const inputHistory = useSelector((state: RootState) => state.terminal.inputHistory);
  const terminalIconTopCoord = useSelector((state: RootState) => state.terminal.terminalIconTopCoord);
  const terminalIconLeftCoord = useSelector((state: RootState) => state.terminal.terminalIconLeftCoord);
  const terminalTopCoord = useSelector((state: RootState) => state.terminal.terminalTopCoord);
  const terminalLeftCoord = useSelector((state: RootState) => state.terminal.terminalLeftCoord);
  const apps = useSelector((state: RootState) => state.apps.apps);

  // Init
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [inputHistoryNumber, setInputHistoryNumber] = useState(inputHistory.length);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputEl.current?.scrollIntoView();
  }, [text]);

  // Handlers
  const handleClose = () => {
    dispatch(closeTerminal());
    dispatch(deleteWindow(Apps.Terminal));
    dispatch(clearTerminalHistory());
  };

  const handleCollapse = () => {
    dispatch(toggleCollapseTerminal());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleIconClick = () => {
    if (isTerminalCollapsed) {
      dispatch(toggleCollapseTerminal());
    } else if (!isTerminalOpen) {
      dispatch(openTerminal());
      dispatch(addWindow(Apps.Terminal));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 38) {
      event.preventDefault();
      setText(inputHistory[inputHistoryNumber]);
      setInputHistoryNumber((prevState) => (prevState - 1 >= 0 ? prevState - 1 : prevState));
    } else if (event.keyCode === 40) {
      event.preventDefault();
      setText(inputHistory[inputHistoryNumber]);
      setInputHistoryNumber((prevState) => (prevState + 1 < inputHistory.length ? prevState + 1 : prevState));
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
    switch (text) {
      case 'settings': {
        dispatch(addTerminalHistory('> Settings open'));
        dispatch(openSettings());
        break;
      }
      case 'clear': {
        dispatch(clearTerminalHistory());
        break;
      }
      case 'help': {
        dispatch(addTerminalHistory('> Available commands: settings, clear, change'));
        break;
      }
      case 'change -l ru': {
        dispatch(setLocale(Locales.Russian));
        break;
      }
      case 'change -l br': {
        dispatch(setLocale(Locales.Britain));
        break;
      }
      case 'change -t planet': {
        dispatch(setTheme(Themes.Planet));
        break;
      }
      case 'change -t sea': {
        dispatch(setTheme(Themes.Sea));
        break;
      }
      case 'settings --help':
      case 'help settings':
      case 'settings -h': {
        dispatch(addTerminalHistory('> This command opens settings'));
        break;
      }
      case 'clear --help':
      case 'help clear':
      case 'clear -h': {
        dispatch(addTerminalHistory('> This command clears terminal history'));
        break;
      }
      case 'change --help':
      case 'help change':
      case 'change -h': {
        dispatch(addTerminalHistory('> This command change locales or themes'));
        dispatch(addTerminalHistory('> "change -t" changes themes'));
        dispatch(addTerminalHistory('> available options: planet, sea'));
        dispatch(addTerminalHistory('> "change -l" changes locales'));
        dispatch(addTerminalHistory('> available options: ru, br'));
        break;
      }
      default: {
        dispatch(addTerminalHistory('> Unknown command'));
        dispatch(addTerminalHistory('> Type "help" to view commands'));
      }
    }
    setText('');
  };

  useEffect(() => {
    const historyItems = document.getElementsByClassName('historyItem');
    historyItems[historyItems.length - 1]?.scrollIntoView();
  }, [terminalHistory]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div onClick={() => setWindowActive(Apps.Terminal)}>
      <Icon
        title={Apps.Terminal}
        topCoord={terminalIconTopCoord}
        leftCoord={terminalIconLeftCoord}
        handleClick={handleIconClick}
        imgSource={imgSource}
        changeCoord={changeTerminalIconCoord}
      />
      {isTerminalOpen && !isTerminalCollapsed && (
        <Window
          handleClose={handleClose}
          handleCollapse={handleCollapse}
          title={Apps.Terminal}
          topCoord={terminalTopCoord}
          leftCoord={terminalLeftCoord}
          changeCoord={changeTerminalCoord}
          zIndexProp={100 - apps.indexOf(Apps.Terminal)}
          handleSetActive={() => dispatch(setWindowActive(Apps.Terminal))}
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
    </div>
  );
};
