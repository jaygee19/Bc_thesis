import './App.css';
import Login from "./components/Login";
import Navigation from './components/Navigation';
import Home from './components/Home';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { React, useState, useEffect, Component } from 'react'
import Logout from './components/Logout';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
            {/* //<main className="form-signin"> */}
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" exact component={Logout} />
            {/* </main> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

// function App() {
//   const [name, setName] = useState('');

//     useEffect( () => {
//         (
//             async () => {
//                 const response = await fetch('http://127.0.0.1:8000/api/user', {
//                     headers: {'Content-Type': 'application/json'},
//                     //credentials: 'include',
//                 });

//                 const content = await response.json();

//                 setName(content.name);
//             }
//         )()
//     })

//   return (
//     <div className="App">
//       <Router>
//       <Navigation name={name} />
//       <main className="form-signin">
//             <Route path="/" exact component={ () => <Home name={name} />} />
//             <Route path="/login" component={Login} />
//             <Route path="/register" component={Register} />
//       </main>
//       </Router>
//     </div>
//   );
// }

export default App;
