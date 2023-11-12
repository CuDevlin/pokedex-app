import React from 'react';
import Main from './routes/Pokemon';
import './Components/Pokemon.css';
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Main />
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

export default App;
