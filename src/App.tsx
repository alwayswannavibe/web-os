// Libraries
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Redux
import store from 'src/redux/store';

// Components
import { TopBar } from 'src/components/TopBar';
import { Main } from 'src/components/Main';
import { BottomPanel } from 'src/components/BottomPanel';
import { LoginForm } from 'src/components/LoginForm';
import { RegistrationForm } from 'src/components/RegistrationForm';

const App = () => (
  <Suspense fallback="">
    <div className="darkTheme">
      <Provider store={store}>
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
      </Provider>
    </div>
  </Suspense>
);

export default App;
