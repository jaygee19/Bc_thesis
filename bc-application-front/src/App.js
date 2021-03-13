import './App.css';
import { Redirect, withRouter } from 'react-router';
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
import AssignedTasks from './components/tasks/AssignedTasks';

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
    this.saveAssignedStudents = this.saveAssignedStudents.bind(this)
    this.removeStudent = this.removeStudent.bind(this)
    this.updateFile = this.updateFile.bind(this)
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
    console.log("TEACHER GROUPS", teacherGroups)
    return teacherGroups
  }

  // getOnlyStudents() {
  //   let onlyStudents = this.state.allUsers.filter((item) => item.role === 's')
  //   return onlyStudents
  // }

  //******************************** TASK START*/

  async addNewTask(task) {

    const addedTask = await getApiResponse('tasks/store', 'post', task)

    this.setState(state => {
      return {
        allTasks: [...state.allTasks, addedTask.data],
      }
    })
  }

  async editTask(data) {

    const editedTask = await getApiResponse('tasks/' + data.task_id, 'put', data)

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === editedTask.data.task_id ? editedTask.data : t),
      }
    })
  }

  async updateFile(data) {

    const editedTask = await getApiResponse('task/updateFile', 'post', data)

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === editedTask.data.task_id ? editedTask.data : t),
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

  async saveAssignedStudents(data) {

    const all = await getApiResponse('assign/students', 'post', data)

    for (let i = 0; i < all.data.users.length; i++) {
      const item1 = all.data.users[i]
      for (let j = 0; j < this.state.allUsers.length; j++) {
        const item2 = this.state.allUsers[j]
        if (item1.user_id === item2.user_id) {
          this.setState(state => {
            return {
              allUsers: state.allUsers.map(u => u.user_id === item1.user_id ? item1 : u),
            }
          })
        }
      }
    }

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === all.data.task.task_id ? all.data.task : t),
      }
    })
  }

  async removeStudent(data) {
    const all = await getApiResponse('remove/' + data.task_id + '/student/' + data.student_id, 'delete')

    this.setState(state => {
      return {
        allUsers: state.allUsers.map(u => u.user_id === all.data.user.user_id ? all.data.user : u),
        allTasks: state.allTasks.map(t => t.task_id === all.data.task.task_id ? all.data.task : t),
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
            <TeacherRoute path="/myTasks" exact component={MyTasks} users={this.state.allUsers} tasks={this.getTasksForUser()} deleteTask={this.deleteTask} />
            <TeacherRoute path="/subjectTasks" exact component={SubjectTasks} users={this.state.allUsers} tasks={this.state.allTasks} />
            <TeacherRoute path="/assignTasks/:id" exact component={AssignTasks} groups={this.getOnlyGroups()} tasks={this.state.allTasks} onSubmit={this.saveAssignedStudents} />
            <TeacherRoute path="/assignedTasks/:id" exact component={AssignedTasks} users={this.state.allUsers} tasks={this.state.allTasks} onDelete={this.removeStudent} />
            <TeacherRoute path="/myTasks/create" exact component={AddTask} onSubmit={this.addNewTask} />
            <TeacherRoute path="/myTasks/:id/edit" exact component={AddTask} tasks={this.state.allTasks} onSubmit={this.editTask} onUpdate={this.updateFile} />
            {/* <TeacherRoute path="/myTasks/:id/delete" exact component={DeleteTask} tasks={this.state.allTasks} /> */}
            <Route path="/login" exact render={() => <Login onLogin={this.loadAllTasks} />} />
            <Route path="/register" exact component={Register} />
            <Route path="/logout" exact component={Logout} />
            <TeacherRoute path="/test" exact component={Test} />
            {/* </main> */}
          </Switch>
        </Router>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
