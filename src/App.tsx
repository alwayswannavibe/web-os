// React, redux
import { Provider } from 'react-redux';
import store from 'src/redux/store';

// Components
import { TopBar } from 'src/components/TopBar';
import { Main } from 'src/components/Main';
import { BottomPanel } from 'src/components/BottomPanel';

const App = () => (
  <Provider store={store}>
    <TopBar />
    <Main />
    <BottomPanel />
  </Provider>
);

export default App;
