// Recact, redux
import { useDispatch, useSelector } from 'react-redux';
import {
  clearTerminalHistory,
  closeTerminal,
  openTerminal,
  toggleCollapseTerminal,
} from 'src/redux/slices/appsSlicesBus/terminalSlice';
import { addWindow, deleteWindow, setWindowActive } from 'src/redux/slices/appsSlice';
import { RootState } from 'src/redux/store';

// Types
import { Apps } from 'src/types/apps';

const useTerminal = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isTerminalCollapsed = useSelector((state: RootState) => state.terminal.isTerminalCollapsed);
  const isTerminalOpen = useSelector((state: RootState) => state.terminal.isTerminalOpen);

  const dispatch = useDispatch();

  const handleTerminalCollapseToggle = () => {
    if (isTerminalCollapsed) {
      dispatch(setWindowActive(Apps.Terminal));
    } else if (apps.indexOf(Apps.Terminal) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseTerminal());
  };

  const handleOpenTerminal = () => {
    if (isTerminalCollapsed && isTerminalOpen) {
      dispatch(toggleCollapseTerminal());
      dispatch(setWindowActive(Apps.Terminal));
    } else if (!isTerminalOpen) {
      dispatch(openTerminal());
      dispatch(addWindow(Apps.Terminal));
    }
  };

  const handleCloseTerminal = () => {
    if (!isTerminalOpen) {
      return;
    }
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
