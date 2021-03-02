import './App.css';
import Login from "./components/users/Login";
import Home from './components/Home';
import Register from './components/users/Register';
import Test from './components/Test';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { React, Component } from 'react';
import { getApiResponse } from './helpers/ApiHelper';
import AuthHelper from './helpers/AuthHelper';
import Logout from './components/users/Logout';
import MyTasks from './components/tasks/MyTasks';
import AddTask from './components/tasks/AddTask';
import LoggedInRoute from './components/routes/LoggedInRoute';
import TeacherRoute from './components/routes/TeacherRoute';
import DeleteTask from './components/tasks/DeleteTask';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allTasks: [],
      teacherTasks: [],
      isLoading: true,
      //   //concreteTasks: [],
    }
    this.addNewTask = this.addNewTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.loadAllTasks = this.loadAllTasks.bind(this)
  }

  async componentDidMount() {
    await AuthHelper.getInstance().loadCurrentUser()
    await this.loadAllTasks()
  }

  async loadAllTasks() {
    this.setState({
      isLoading: true,
    })
    let allSubjectTasks = await getApiResponse('tasks', 'get')
    this.setState({
      allTasks: allSubjectTasks.data,
      isLoading: false,
    })
  }

  getTasksForUser() {
    let teacherID = AuthHelper.getInstance().getUserID()
    console.log("TEACHER ID" + teacherID)
    let currentTasks = this.state.allTasks.filter((item) => item.teacher_id === teacherID)
    console.log("PREFILTROVANE" + this.state.allTasks.length)
    return currentTasks
  }

  async addNewTask(task) {
    await getApiResponse('tasks/store', 'post', task)
    let currentTasks = this.state.allTasks
    console.log("Aktualna dlzka " + this.state.allTasks.length)
    currentTasks.push(task)
    console.log("Po pushnuti " + currentTasks.length)
    this.setState({
      allTasks: currentTasks,
    })
  }

  async editTask(task) {
    console.log("Som aspon tu" + task.task_id)
    await getApiResponse('tasks/'+ task.task_id, 'put', task)
    let concreteTaskIndex = this.state.allTasks.findIndex(
      (item) => item.task_id === task.task_id
    )
    let currentTasks = this.state.allTasks
    currentTasks[concreteTaskIndex] = task

    this.setState({
      allTasks: currentTasks,
    })
  }

  async deleteTask(id) {
    await getApiResponse('tasks/' + id, 'delete')

    let currentTasks = this.state.allTasks.filter((item) => item.task_id !== id)
    this.setState({
      allTasks: currentTasks,
    })
  }

  render() {
    if (this.state.isLoading)
      return (<h1> LOADING </h1>)
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* //<main className="form-signin"> */}
            <LoggedInRoute path="/" exact component={Home} />
            {/* <TeacherRoute path="/myTasks" exact component={MyTasks} /> */}
            <TeacherRoute path="/myTasks" exact component={MyTasks} tasks={this.getTasksForUser()} deleteTask={this.deleteTask} />
            {/* tasks={this.state.concreteTasks} */}
            <TeacherRoute path="/myTasks/create" exact component={AddTask} onSubmit={this.addNewTask}/>
            <TeacherRoute path="/myTasks/:id/edit" exact component={AddTask} tasks={this.state.allTasks} onSubmit={this.editTask}/>
            <TeacherRoute path="/myTasks/:id/delete" exact component={DeleteTask} tasks={this.state.allTasks} />
            <Route path="/login" exact render={() => <Login onLogin={this.loadAllTasks}/> } />
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
