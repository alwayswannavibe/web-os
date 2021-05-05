import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import { TopBar } from './components/TopBar';
import { Main } from './components/Main';
import { BottomPanel } from './components/BottomPanel';

const App = () => (
  <Provider store={store}>
    <TopBar />
    <Main />
    <BottomPanel />
  </Provider>
);

export default App;
