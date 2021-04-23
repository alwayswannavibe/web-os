// React, Redux
import { useDispatch, useSelector } from 'react-redux';
import { clearTerminalHistory, closeTerminal, openTerminal, toggleCollapseTerminal } from 'redux/slices/terminalSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';
import { RootState } from 'redux/store';

// Types
import { Apps } from 'types/apps';

const useTerminal = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isTerminalCollapsed = useSelector((state: RootState) => state.terminal.isTerminalCollapsed);

  const dispatch = useDispatch();

  const handleTerminalCollapseToggle = () => {
    dispatch(toggleCollapseTerminal());
    if (isTerminalCollapsed) {
      dispatch(setWindowActive(Apps.Terminal));
    } else if (apps.indexOf(Apps.Terminal) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
  };

  const handleOpenTerminal = () => {
    dispatch(openTerminal());
    dispatch(addWindow(Apps.Terminal));
  };

  const handleCloseTerminal = () => {
    dispatch(closeTerminal());
    dispatch(deleteWindow(Apps.Terminal));
    dispatch(clearTerminalHistory());
  };

  return {
    handleTerminalCollapseToggle,
    handleOpenTerminal,
    handleCloseTerminal,
  };
};

export { useTerminal };
