// React, redux
import { useDispatch, useSelector } from 'react-redux';
import { closeSimon, openSimon, toggleCollapseSimon } from 'src/redux/slices/appsSlicesBus/simonSlice';
import { addWindow, deleteWindow, setWindowActive } from 'src/redux/slices/appsSlice';
import { RootState } from 'src/redux/store';

// Types
import { Apps } from 'src/types/apps';

const useSimon = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isSimonCollapsed = useSelector((state: RootState) => state.simon.isSimonCollapsed);
  const isSimonOpen = useSelector((state: RootState) => state.simon.isSimonOpen);

  const dispatch = useDispatch();

  const handleSimonCollapseToggle = () => {
    if (isSimonCollapsed) {
      dispatch(setWindowActive(Apps.Simon));
    } else if (apps.indexOf(Apps.Simon) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseSimon());
  };

  const handleOpenSimon = () => {
    if (isSimonCollapsed && isSimonOpen) {
      dispatch(toggleCollapseSimon());
      dispatch(setWindowActive(Apps.Simon));
    } else if (!isSimonOpen) {
      dispatch(openSimon());
      dispatch(addWindow(Apps.Simon));
    }
  };

  const handleCloseSimon = () => {
    if (!isSimonOpen) {
      return;
    }
    dispatch(closeSimon());
    dispatch(deleteWindow(Apps.Simon));
  };

  return {
    handleSimonCollapseToggle,
    handleOpenSimon,
    handleCloseSimon,
  };
};

export { useSimon };
