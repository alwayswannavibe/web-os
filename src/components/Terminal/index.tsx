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
  clearTerminalHistory,
  closeTerminal,
  openTerminal,
  toggleCollapseTerminal,
} from 'redux/slices/terminalSlice';

// import Types
import { Apps } from 'types/apps';

// Assets
import imgSource from 'assets/images/icons/terminal.svg';

// Styles
import styles from './style.module.css';

// Types
type PropsType = {
  children?: never;
};

export const Terminal: FC<PropsType> = () => {
  // Init
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const inputEl = useRef<HTMLInputElement>(null);

  // Selectors
  const isTerminalOpen = useSelector((state: RootState) => state.terminal.isTerminalOpen);
  const isTerminalCollapsed = useSelector((state: RootState) => state.terminal.isTerminalCollapsed);
  const terminalHistory = useSelector((state: RootState) => state.terminal.terminalHistory);
  const terminalIconTopCoord = useSelector((state: RootState) => state.terminal.terminalIconTopCoord);
  const terminalIconLeftCoord = useSelector((state: RootState) => state.terminal.terminalIconLeftCoord);
  const terminalTopCoord = useSelector((state: RootState) => state.terminal.terminalTopCoord);
  const terminalLeftCoord = useSelector((state: RootState) => state.terminal.terminalLeftCoord);

  useEffect(() => {
    inputEl.current?.scrollIntoView();
  }, [text]);

  // Handlers
  const handleClose = () => {
    dispatch(closeTerminal());
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
    } else {
      dispatch(openTerminal());
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setText(text.trim().toLowerCase());
    dispatch(addTerminalHistory(`< ${text}`));
    switch (text) {
      case 'clear': {
        dispatch(clearTerminalHistory());
        break;
      }
      case 'help': {
        dispatch(addTerminalHistory('< Available commands: settings, clear'));
        break;
      }
      case 'settings --help':
      case 'help settings':
      case 'settings -h': {
        dispatch(addTerminalHistory('< This command opens settings'));
        break;
      }
      case 'clear --help':
      case 'help clear':
      case 'clear -h': {
        dispatch(addTerminalHistory('< This command clears terminal history'));
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
    <>
      <Icon
        title={Apps.Terminal}
        topCoord={terminalIconTopCoord}
        leftCoord={terminalIconLeftCoord}
        handleClick={handleIconClick}
        imgSource={imgSource}
      />
      {isTerminalOpen && !isTerminalCollapsed && (
        <Window
          handleClose={handleClose}
          handleCollapse={handleCollapse}
          title={Apps.Terminal}
          topCoord={terminalTopCoord}
          leftCoord={terminalLeftCoord}
        >
          <div className={styles.terminalText} id="terminalHistory">
            {terminalHistory.map((el) => (
              <p key={el} className="historyItem">
                {el}
              </p>
            ))}
          </div>
          <pre className={styles.pre}>
            {'root < '}
            <form onSubmit={handleSubmit}>
              <input type="text" ref={inputEl} className={styles.input} onChange={handleChange} value={text} />
            </form>
          </pre>
        </Window>
      )}
    </>
  );
};
