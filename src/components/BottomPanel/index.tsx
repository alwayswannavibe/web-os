// React, Redux
import React, { FC } from 'react';

// Components
import { BottomTab } from 'components/BottomTab';

// Hooks
import { useTerminal } from 'hooks/useTerminal';
import { useSettings } from 'hooks/useSettings';
import { useCalculator } from 'hooks/useCalculator';

// Types
import { Apps } from 'types/apps';

// Styles
import { useToDo } from 'hooks/useToDo';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux/slices/userSlice';
// eslint-disable-next-line import/no-cycle
import { auth } from 'firebase-state/firebase';
import { RootState } from 'redux/store';
import styles from './style.module.css';
import { useChat } from '../../hooks/useChat';

type PropsType = {
  children?: never;
};

const BottomPanel: FC<PropsType> = () => {
  const { handleTerminalCollapseToggle, handleOpenTerminal } = useTerminal();
  const { handleSettingsCollapseToggle, handleOpenSettings } = useSettings();
  const { handleCalculatorCollapseToggle, handleOpenCalculator } = useCalculator();
  const { handleToDoCollapseToggle, handleOpenToDo } = useToDo();
  const { handleChatCollapseToggle, handleOpenChat } = useChat();

  const username = useSelector((state: RootState) => state.user.username);
  const loading = useSelector((state: RootState) => state.user.loading);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  const handleLogout = async () => {
    auth.signOut();
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      <BottomTab
        handleOpen={handleOpenTerminal}
        handleCollapse={handleTerminalCollapseToggle}
        type={Apps.Terminal}
        iconName="terminal"
      />
      <BottomTab
        handleOpen={handleOpenSettings}
        handleCollapse={handleSettingsCollapseToggle}
        type={Apps.Settings}
        iconName="cogs"
      />
      <BottomTab
        handleOpen={handleOpenCalculator}
        handleCollapse={handleCalculatorCollapseToggle}
        type={Apps.Calculator}
        iconName="calculator"
      />
      <BottomTab
        handleOpen={handleOpenToDo}
        handleCollapse={handleToDoCollapseToggle}
        type={Apps.ToDo}
        iconName="clipboard-list"
      />
      <BottomTab
        handleOpen={handleOpenChat}
        handleCollapse={handleChatCollapseToggle}
        type={Apps.Chat}
        iconName="comment-dots"
      />
      {!loading &&
        (username ? (
          <button onClick={() => handleLogout()} type="button" className={styles.logBtn}>
            <i className="fa fa-sign-out" />
          </button>
        ) : (
          <button onClick={() => handleLogin()} type="button" className={styles.logBtn}>
            <i className="fas fa-user" />
          </button>
        ))}
    </div>
  );
};

export { BottomPanel };
