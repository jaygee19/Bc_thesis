//import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Navigation from './components/Navigation';
import Home from './components/Home';
import Register from './components/Register';
import { render } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react'


function App() {
  const [name, setName] = useState('');

    useEffect( () => {
        (
            async () => {
                const response = await fetch('http://127.0.0.1:8000/api/user', {
                    headers: {'Content-Type': 'application/json'},
                    //credentials: 'include',
                });

                const content = await response.json();

                setName(content.name);
            }
        )()
    })

  return (
    <div className="App">
        <BrowserRouter>
        
      <Navigation name={name} />
      <main className="form-signin">
            <Route path="/" exact component={ () => <Home name={name} />} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
      </main>
      </BrowserRouter>
    </div>
  );
}

// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Edit <code>src/App.js</code> and save to reload.
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>

export default App;
