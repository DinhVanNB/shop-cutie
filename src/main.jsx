import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import '@canvas-fonts/comic-sans-ms/Comic Sans MS.ttf';
import {Provider} from 'react-redux';
import {store , persistor} from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Spinner } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spinner/>} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
