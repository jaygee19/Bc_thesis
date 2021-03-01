import './App.css';
import Login from "./components/Login";
import Home from './components/Home';
import Register from './components/Register';
import Test from './components/Test';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { React, Component } from 'react';
import { getApiResponse } from './helpers/ApiHelper';
import AuthHelper from './helpers/AuthHelper';
import Logout from './components/Logout';
import MyTasks from './components/MyTasks';
import AddTask from './components/AddTask';
import LoggedInRoute from './components/LoggedInRoute';
import TeacherRoute from './components/TeacherRoute';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
    }
  }

  async componentDidMount() {
    await AuthHelper.getInstance().loadCurrentUser()
   // console.log("Tu som 1")
    let allTasks = await getApiResponse('tasks', 'get')
    this.setState({
      tasks: allTasks.data,
    })
    //console.log("Tu som 2")
  }

  render() {
    return (
      <div className="App">
        <Router>
            <Switch>
            {/* //<main className="form-signin"> */}
              <LoggedInRoute path="/" exact component={Home} />
              {/* <TeacherRoute path="/myTasks" exact component={MyTasks} /> */}
              <TeacherRoute path="/myTasks" exact component={MyTasks} tasks={this.state.tasks}/>
              <TeacherRoute path="/myTasks/create" exact component={AddTask} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/test" exact component={Test} />
            {/* </main> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
