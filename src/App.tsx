import React, { useEffect } from 'react';
import './App.css';
import './normalize.css';
import LoginPage from './components/login/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/types';
import { fetchAutoLogin } from './redux/reducers/user';

function App() {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchAutoLogin())
  },[])
  return (
    <div className="App">
      {
        userData.logined ? `welcome ${userData.name} :)` : <LoginPage />
      }
    </div>
  );
}

export default App;
