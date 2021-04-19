import React from 'react';
import { Desktop } from 'components/Desktop';
import { Provider } from 'react-redux';
import store from 'redux/store';

const App = () => (
  <Provider store={store}>
    <Desktop />
  </Provider>
);

export default App;
