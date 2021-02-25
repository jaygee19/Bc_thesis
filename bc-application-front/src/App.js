import './App.css';
import Login from "./components/Login";
import Home from './components/Home';
import Register from './components/Register';
import Test from './components/Test';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { React, Component } from 'react'
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
            {/* //<main className="form-signin"> */}
              <PrivateRoute path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/test" component={Test} />
            {/* </main> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
