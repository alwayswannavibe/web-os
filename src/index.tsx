// Libraries
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Redux
import store from 'src/redux/store';

// Styles
import './index.css';

// Components
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="">
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
