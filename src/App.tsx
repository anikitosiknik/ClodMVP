import React, { useEffect } from 'react';
import './App.css';
import './normalize.css';
import LoginPage from './components/login/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/types';
import { fetchAutoLogin, fetchLogOut } from './redux/reducers/user';

function App() {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchAutoLogin())
  },[])
  return (
    <div className="App">
      {
        userData.logined ? <button onClick={() => dispatch(fetchLogOut())}>{userData.name}</button> : <LoginPage />
      }
    </div>
  );
}

export default App;
