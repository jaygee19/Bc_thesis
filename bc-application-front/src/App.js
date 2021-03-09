import './App.css';
import { withRouter } from 'react-router';
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
import ReactLoading from 'react-loading';
import Footer from './components/Footer';
import SubjectTasks from './components/tasks/SubjectTasks';
import AssignTasks from './components/tasks/AssignTasks';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allTasks: [],
      allUsers: [],
      allScheduleGropus: [],
      teacherTasks: [],
      isLoading: true,
    }
    this.addNewTask = this.addNewTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.loadAllTasks = this.loadAllTasks.bind(this)
    this.saveAssignStudents = this.saveAssignStudents.bind(this)
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
    let allSubjectUsers = await getApiResponse('users', 'get')
    let allSubjectScheduleGroup = await getApiResponse('schedules', 'get')
    this.setState({
      allTasks: allSubjectTasks.data,
      allUsers: allSubjectUsers.data,
      allScheduleGropus: allSubjectScheduleGroup.data,
      isLoading: false,
    })
  }

  getTasksForUser() {
    let teacherID = AuthHelper.getInstance().getUserID()
    let currentTasks = this.state.allTasks.filter((item) => item.teacher_id === teacherID)
    return currentTasks
  }

  getOnlyGroups() {
    let teacherID = AuthHelper.getInstance().getUserID()
    let teacherGroups = this.state.allScheduleGropus.filter((group) => group.teacher === teacherID)
    console.log("TEACHER GROUPS" , teacherGroups)
    return teacherGroups
  }

  // getOnlyStudents() {
  //   let onlyStudents = this.state.allUsers.filter((item) => item.role === 's')
  //   return onlyStudents
  // }

  //******************************** TASK START*/

  async addNewTask(task) {
    const addedTask = await getApiResponse('tasks/store', 'post', task)

    task.teacher_id = addedTask.data.teacher_id
    task.task_id = addedTask.data.task_id
    task.valid_from = addedTask.data.valid_from

    this.setState(state => {
      return {
        allTasks: [...state.allTasks, task],
      }
    })
  }

  async editTask(task) {
    const editedTask = await getApiResponse('tasks/'+ task.task_id, 'put', task)

    task.teacher_id = editedTask.data.teacher_id
    task.task_id = editedTask.data.task_id
    task.valid_from = editedTask.data.valid_from

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === task.task_id ? task : t),
      }
    })
  }

  async deleteTask(id) {
    await getApiResponse('tasks/' + id, 'delete')

    this.setState(state => {
      return {
        allTasks: state.allTasks.filter(t => t.task_id !== id),
      }
    })
  }

    //******************************** TASK END*/

    //******************************** ASSIGN STUDENT START */

    async saveAssignStudents(data) {

      const task = await getApiResponse('assign/students', 'post', data)

      this.setState(state => {
        return {
          allTasks: state.allTasks.map(t => t.task_id === task.data.task_id ? task.data : t),
        }
      })

    }

    //******************************** ASSIGN STUDENT END */


  render() {
    if (this.state.isLoading)
      return (
      <div className="d-flex justify-content-center">
      <ReactLoading type="cylon" color=" #191919" height={300} width={300} /> 
      </div>
      )
    return (
      <div className="App bg-secondary">
        <Router>
          <Switch>
            {/* //<main className="form-signin"> */}
            <LoggedInRoute path="/" exact component={Home} />
            {/* <TeacherRoute path="/myTasks" exact component={MyTasks} /> */}
            <TeacherRoute path="/myTasks" exact component={MyTasks} users={this.state.allUsers} tasks={this.getTasksForUser()} deleteTask={this.deleteTask} />
            <TeacherRoute path="/subjectTasks" exact component={SubjectTasks} users={this.state.allUsers} tasks={this.state.allTasks}/>
            <TeacherRoute path="/assignTasks/:id" exact component={AssignTasks} groups={this.getOnlyGroups()} tasks={this.state.allTasks} onSubmit={this.saveAssignStudents}/>
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
        <div>
                <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
