// React, redux
import { FC } from 'react';
import { RootState } from 'src/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'src/redux/slices/userSlice';
import firebase from 'firebase';
// eslint-disable-next-line import/no-cycle
import { auth } from 'src/firebase-state/firebase';

// Hooks
import { useTerminal } from 'src/hooks/useTerminal';
import { useSettings } from 'src/hooks/useSettings';
import { useCalculator } from 'src/hooks/useCalculator';
import { useChat } from 'src/hooks/useChat';
import { useToDo } from 'src/hooks/useToDo';
import { useSimon } from 'src/hooks/useSimon';

// Types
import { Apps } from 'src/types/apps';

// Components
import { BottomTab } from 'src/components/BottomTab';

// Styles
import styles from './style.module.css';

type PropsType = {
  children?: never;
};

export const BottomPanel: FC<PropsType> = () => {
  const { handleTerminalCollapseToggle, handleOpenTerminal } = useTerminal();
  const { handleSettingsCollapseToggle, handleOpenSettings } = useSettings();
  const { handleCalculatorCollapseToggle, handleOpenCalculator } = useCalculator();
  const { handleToDoCollapseToggle, handleOpenToDo } = useToDo();
  const { handleChatCollapseToggle, handleOpenChat } = useChat();
  const { handleSimonCollapseToggle, handleOpenSimon } = useSimon();

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
      <BottomTab
        handleOpen={handleOpenSimon}
        handleCollapse={handleSimonCollapseToggle}
        type={Apps.Simon}
        iconName="th-large"
      />
      {!loading &&
        (!/^User-[\w]{8}$/.test(username) ? (
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
