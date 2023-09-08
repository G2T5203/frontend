import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import DemoGet from './demo/DemoGet';
import reportWebVitals from './reportWebVitals';
import ScrollablePage from './scroll/ScrollablePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <DemoGet />
    <App /> */}
    <ScrollablePage/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
