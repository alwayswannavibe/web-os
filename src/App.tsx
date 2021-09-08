// Libraries
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import { RootState } from 'src/redux/store';

// Types
import { Theme } from 'src/features/theme/types/theme';

// Components
import { TopBar } from 'src/components/TopBar';
import { Main } from 'src/components/Main';
import { BottomPanel } from 'src/components/BottomPanel';
import { LoginForm } from 'src/components/LoginForm';
import { RegistrationForm } from 'src/components/RegistrationForm';

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
                <LoginForm />
              </>
            )}
          />
          <Route
            exact
            path="/registration"
            render={() => (
              <>
                <RegistrationForm />
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
