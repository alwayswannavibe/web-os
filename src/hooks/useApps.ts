import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { Apps } from 'types/apps';

const useApps = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);

  const isIncludeApp = (app: Apps) => apps.includes(app);

  const getAppIndex = (app: Apps) => apps.indexOf(app);

  return { isIncludeApp, getAppIndex };
};

export { useApps };
