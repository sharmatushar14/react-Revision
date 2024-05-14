import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from "../src/app/store"
//Wrapping the whole react application with Redux Provider
//We can do it in App.js too, but here it would help more

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
reportWebVitals();
