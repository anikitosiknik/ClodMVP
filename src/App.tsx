import React from 'react';
import './App.css';
import './normalize.css';
import LoginPage from './components/login/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/types';
import { registerUserRequest } from './utils/autService';

function App() {
  const userData = useSelector((state: RootState) => state.user)
  registerUserRequest('a', 'a', 'a')
  return (
    <div className="App">
      {
        userData.logined ? userData.age : <LoginPage />
      }
    </div>
  );
}

export default App;
