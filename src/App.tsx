// Libraries
import { Provider } from 'react-redux';
import { Suspense } from 'react';

// Redux
import store from 'src/redux/store';

// Components
import { TopBar } from 'src/components/TopBar';
import { Main } from 'src/components/Main';
import { BottomPanel } from 'src/components/BottomPanel';

const App = () => (
  <Suspense fallback="">
    <Provider store={store}>
      <TopBar />
      <Main />
      <BottomPanel />
    </Provider>
  </Suspense>
);

export default App;
