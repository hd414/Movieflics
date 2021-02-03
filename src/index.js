import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from './App';
import { GlobalStyles } from './global_styles';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import firebase from './lib/firebase.prod';
import { FirebaseContext } from './context/firebase';

ReactDOM.render(

  <BrowserRouter>
    <React.StrictMode>
      <FirebaseContext.Provider value={{ firebase }}>
        <GlobalStyles />
        <App />
      </FirebaseContext.Provider>
    </React.StrictMode>
  </BrowserRouter>


  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
