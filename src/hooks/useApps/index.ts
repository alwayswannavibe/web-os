// React, redux
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';

// Types
import { Apps } from 'src/types/apps';

const useApps = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);

  const isIncludeApp = (app: Apps) => apps.includes(app);

  const getAppIndex = (app: Apps) => apps.indexOf(app);

  return { isIncludeApp, getAppIndex };
};

export { useApps };
