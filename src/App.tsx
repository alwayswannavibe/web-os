// Libraries
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Types
import { Theme } from '@Features/theme/types/theme';
import { RootState } from '@Types/rootState.type';

// Components
import { TopBar } from '@Components/TopBar/TopBar';
import { BottomPanel } from '@Components/BottomPanel/BottomPanel';

// Pages
import { Login } from '@Pages/Login/Login';
import { Registration } from '@Pages/Registration/Registration';
import { Main } from '@Pages/Main/Main';

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    // eslint-disable-next-line no-nested-ternary
    <div className={theme === Theme.Dark ? 'darkTheme' : theme === Theme.Light ? 'lightTheme' : theme === Theme.Blue ? 'blueTheme' : 'greenTheme'}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={() => (
              <>
                <Login />
              </>
            )}
          />
          <Route
            exact
            path="/registration"
            render={() => (
              <>
                <Registration />
              </>
            )}
          />
          <Route
            path="/"
            render={() => (
              <>
                <TopBar />
                <Main />
                <BottomPanel />
              </>
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
