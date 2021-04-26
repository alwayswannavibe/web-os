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
  TerminalMessage,
} from 'redux/slices/terminalSlice';
import { openSettings } from 'redux/slices/settingsSlice';
import { setLocale } from 'redux/slices/localeSlice';
import { setTheme } from 'redux/slices/themeSlice';
import { setWindowActive } from 'redux/slices/appsSlice';
import { clearToDo, openToDo } from 'redux/slices/toDoSlice';

// import Types
import { Apps } from 'types/apps';
import { Themes } from 'types/themes';
import { Locales } from 'types/locales';

// Hooks
import { useTerminal } from 'hooks/useTerminal';

// Assets
import imgSource from 'assets/images/icons/terminal.svg';

// Styles
import styles from './style.module.css';
import { openCalculator } from '../../redux/slices/calculatorSlice';

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
    switch (text) {
      case 'settings': {
        dispatch(addTerminalHistory('> Settings opened'));
        dispatch(openSettings());
        break;
      }
      case 'calculator': {
        dispatch(addTerminalHistory('> Calculator opened'));
        dispatch(openCalculator());
        break;
      }
      case 'todo': {
        dispatch(addTerminalHistory('> ToDo opened'));
        dispatch(openToDo());
        break;
      }
      case 'clear': {
        dispatch(clearTerminalHistory());
        break;
      }
      case 'help': {
        dispatch(addTerminalHistory('> Available commands: settings, todo, calculator, clear, change'));
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
      case 'change -t car': {
        dispatch(setTheme(Themes.Car));
        break;
      }
      case 'change -t tree': {
        dispatch(setTheme(Themes.Tree));
        break;
      }
      case 'change -t road': {
        dispatch(setTheme(Themes.Road));
        break;
      }
      case 'change -t dynamic': {
        dispatch(setTheme(Themes.Dynamic));
        break;
      }
      case 'change -t dynamic2': {
        dispatch(setTheme(Themes.Dynamic2));
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
      case 'calculator --help':
      case 'help calculator':
      case 'calculator -h': {
        dispatch(addTerminalHistory('> This command opens calculator'));
        break;
      }
      case 'todo --help':
      case 'help todo':
      case 'todo -h': {
        dispatch(addTerminalHistory('> This command opens todo'));
        dispatch(addTerminalHistory('> Available commands: clear'));
        break;
      }
      case 'todo clear': {
        dispatch(clearToDo());
        dispatch(addTerminalHistory('> todo list cleared'));
        break;
      }
      case 'change --help':
      case 'help change':
      case 'change -h': {
        dispatch(addTerminalHistory('> This command change locales or themes'));
        dispatch(addTerminalHistory('> "change -t" changes themes'));
        dispatch(addTerminalHistory('> available options: planet, sea, car, road, tree, dynamic, dynamic2'));
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
    </>
  );
};
