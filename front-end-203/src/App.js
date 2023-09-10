import './App.css';
import React from 'react';
import SignInPage from './signin-screen/SignInPage';
import SignUpPage from './signup-screen/SignUpPage';


function App() {
  return (
    <div className="App">
      <SignInPage />
      <SignUpPage />
    </div>
  );
}

export default App;