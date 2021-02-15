import React from 'react';
import './App.css';
import './normalize.css';
import LoginPage from './components/login/LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from './redux/types';

function App() {
  const userData = useSelector((state: RootState) => state.user)
  return (
    <div className="App">
      {
        userData.logined ? `welcome ${userData.name} :)` : <LoginPage />
      }
    </div>
  );
}

export default App;
