// Libraries
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Redux
import { logout } from 'src/features/user/redux';

// Types
import { Apps } from 'src/types/apps';
import { RootState } from 'src/redux/store';

// Components
import { BottomTab } from 'src/components/BottomTab';

// Styles
import styles from './style.module.css';

interface Props {
  children?: never;
}

export const BottomPanel: FC<Props> = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const loading = useSelector((state: RootState) => state.user.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    dispatch(logout());
  };

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div className={styles.container}>
      <BottomTab
        type={Apps.Terminal}
        iconName="terminal"
      />
      <BottomTab
        type={Apps.Settings}
        iconName="cogs"
      />
      <BottomTab
        type={Apps.Calculator}
        iconName="calculator"
      />
      <BottomTab
        type={Apps.ToDo}
        iconName="clipboard-list"
      />
      <BottomTab
        type={Apps.Chat}
        iconName="comment-dots"
      />
      <BottomTab
        type={Apps.Simon}
        iconName="th-large"
      />
      {!loading &&
        (!/^User-[\w]{8}$/.test(username) ? (
          <button onClick={handleLogout} type="button" className={styles.logBtn}>
            <i className="fa fa-sign-out" />
          </button>
        ) : (
          <button onClick={handleLogin} type="button" className={styles.logBtn}>
            <i className="fas fa-user" />
          </button>
        ))}
    </div>
  );
};
