import './App.css';
import Login from "./components/users/Login";
import Home from './components/Home';
import Register from './components/users/Register';
import Test from './components/Test';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { React, Component } from 'react';
import { getApiResponse } from './helpers/ApiHelper';
import AuthHelper from './helpers/AuthHelper';
import Logout from './components/users/Logout';
import MyTasks from './components/tasks/MyTasks';
import AddTask from './components/tasks/AddTask';
import LoggedInRoute from './components/routes/LoggedInRoute';
import TeacherRoute from './components/routes/TeacherRoute';
import ReactLoading from 'react-loading';
import Footer from './components/Footer';
import SubjectTasks from './components/tasks/SubjectTasks';
import AssignTasks from './components/tasks/AssignTasks';
import AssignedTasks from './components/tasks/AssignedTasks';
import StudentRoute from './components/routes/StudentRoute';
import StudentTasks from './components/student/StudentTasks';
import ManageAssignments from './components/student/ManageAssignments';
import EvaluateAssignment from './components/evaluation/EvaluateAssignment';
import HiddenTasks from './components/tasks/HiddenTasks';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      allTasks: [],
      allUsers: [],
      allScheduleGropus: [],
      allSubmittedAssignments: [],
      teacherTasks: [],
      isLoading: true,
      status: 0,
    }
    this.addNewTask = this.addNewTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.loadAllTasks = this.loadAllTasks.bind(this)
    this.saveAssignedStudents = this.saveAssignedStudents.bind(this)
    this.removeStudent = this.removeStudent.bind(this)
    this.updateFile = this.updateFile.bind(this)
    this.submitAssignment = this.submitAssignment.bind(this)
    this.updateAssignment = this.updateAssignment.bind(this)
    this.storeResult = this.storeResult.bind(this)
    this.updateResult = this.updateResult.bind(this)
    this.hideTask = this.hideTask.bind(this)
    this.uncoverTask = this.uncoverTask.bind(this)
    this.resetStatus = this.resetStatus.bind(this)
    this.checkDuplicates = this.checkDuplicates.bind(this)
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
    if (AuthHelper.getInstance().getCurrentUser() !== null) {
      let teacherID = AuthHelper.getInstance().getUserID()
      let currentTasks = this.state.allTasks.filter((item) => item.teacher_id === teacherID)
      return currentTasks
    }
  }

  getOnlyGroups() {
    if (AuthHelper.getInstance().getCurrentUser() !== null) {
      let teacherID = AuthHelper.getInstance().getUserID()
      let teacherGroups = this.state.allScheduleGropus.filter((group) => group.teacher === teacherID)
      return teacherGroups
    }
  }

  getStudentGroup() {
    if (AuthHelper.getInstance().getCurrentUser() !== null) {
      let studentID = AuthHelper.getInstance().getUserID()
      let user = this.state.allUsers.filter(u => u.user_id === studentID)
      if (user.length !== 0) {
        let group = user[0].schedules.filter(s => s.course_id === user[0].enrolled_student.course_id)
        return group[0]
      } else {
        return null
      }
    }
  }

  getMyself() {
    if (AuthHelper.getInstance().getCurrentUser() !== null) {
      let userID = AuthHelper.getInstance().getUserID()
      let user = this.state.allUsers.filter(u => u.user_id === userID)
      return user[0]
    }
  }

  resetStatus() {
    this.setState({
        status: 0,
    })
  }

  //******************************** TASK START*/

  async addNewTask(task) {

    const addedTask = await getApiResponse('tasks/store', 'post', task)

    this.setState(state => {
      return {
        allTasks: [...state.allTasks, addedTask.data],
        status: 1,
      }
    })
  }

  async editTask(data) {

    const editedTask = await getApiResponse('tasks/' + data.task_id, 'put', data)

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === editedTask.data.task_id ? editedTask.data : t),
        status: 2,
      }
    })
  }

  async updateFile(data) {

    const editedTask = await getApiResponse('task/updateFile', 'post', data)

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === editedTask.data.task_id ? editedTask.data : t),
        status: 2,
      }
    })

  }

  async deleteTask(id) {
    await getApiResponse('tasks/' + id, 'delete')

    this.setState(state => {
      return {
        allTasks: state.allTasks.filter(t => t.task_id !== id),
        status: 3,
      }
    })
  }

  async hideTask(id) {
    const hiddenTask = await getApiResponse('tasks/hide/' + id, 'put')
  
    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === hiddenTask.data.task_id ? hiddenTask.data : t),
      }
    })
  }

  async uncoverTask(id) {
    const uncoveredTask = await getApiResponse('tasks/uncover/' + id, 'put')

    this.setState(state => {
      return {
        allTasks: state.allTasks.map(t => t.task_id === uncoveredTask.data.task_id ? uncoveredTask.data : t),
      }
    })
  }

  async checkDuplicates(id) {
    const updatedTask = await getApiResponse('check/duplicates/' + id, 'put')
    //console.log("190", updatedTask)
    this.loadAllTasks()
    // this.setState(state => {
    //   return {
    //     allTasks: state.allTasks.map(t => t.task_id === updatedTask.data.task_id ? updatedTask.data : t),
    //   }
    // })
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

  //******************************** SUBMIT ASSIGNMENT START */

  async submitAssignment(data) {
    const user = await getApiResponse('submit/assignment', 'post', data)

    this.setState(state => {
      return {
        allUsers: state.allUsers.map(u => u.user_id === user.data.user_id ? user.data : u),
      }
    })
  }

  async updateAssignment(data) {
    const user = await getApiResponse('update/assignment', 'post', data)

    this.setState(state => {
      return {
        allUsers: state.allUsers.map(u => u.user_id === user.data.user_id ? user.data : u),
      }
    })
  }

  //******************************** SUBMIT ASSIGNMENT END */

  //******************************** RESULT START */

  async storeResult(data) {
    const user = await getApiResponse('store/result', 'post', data)
    console.log("RESULT SUER", user)
    this.setState(state => {
      return {
        allUsers: state.allUsers.map(u => u.user_id === user.data.user_id ? user.data : u),
      }
    })
  }

  async updateResult(data) {
    const user = await getApiResponse('update/result/' + data.result_id, 'put', data)
    console.log("RESULT SUER po Update", user)
    this.setState(state => {
      return {
        allUsers: state.allUsers.map(u => u.user_id === user.data.user_id ? user.data : u),
      }
    })
  }

  //******************************** RESULT START */

  render() {
    if (this.state.isLoading)
      return (
        <div className="d-flex justify-content-center">
          <ReactLoading type="bubbles" color=" #191919" height={300} width={300} />
        </div>
      )
    return (
      <div className="App bg-dark" style = {{height:"100%", "minHeight": "100vh"}}>
        <Router>
          <Switch>
            <LoggedInRoute path="/" exact component={Home}/>
            <TeacherRoute path="/myTasks" exact component={MyTasks} users={this.state.allUsers} tasks={this.getTasksForUser()} hideTask={this.hideTask} status={this.state.status} resetStatus={this.resetStatus} />
            <TeacherRoute path="/subjectTasks" exact component={SubjectTasks} users={this.state.allUsers} tasks={this.state.allTasks} />
            <TeacherRoute path="/hiddenTasks" exact component={HiddenTasks} users={this.state.allUsers} tasks={this.getTasksForUser()} uncoverTask={this.uncoverTask} />
            <TeacherRoute path="/assignTasks/:id" exact component={AssignTasks} groups={this.getOnlyGroups()} tasks={this.getTasksForUser()} onSubmit={this.saveAssignedStudents} />
            <TeacherRoute path="/assignedTasks/:id" exact component={AssignedTasks} users={this.state.allUsers} tasks={this.state.allTasks} onDelete={this.removeStudent} onVerify={this.checkDuplicates}/>
            <TeacherRoute path="/myTasks/create" exact component={AddTask} onSubmit={this.addNewTask} />
            <TeacherRoute path="/myTasks/:id/edit" exact component={AddTask} tasks={this.state.allTasks} onSubmit={this.editTask} onUpdate={this.updateFile} onDelete={this.deleteTask}/>
            <TeacherRoute path="/evaluate/:task/assignment/:id" exact component={EvaluateAssignment} users={this.state.allUsers} tasks={this.state.allTasks} onSubmit={this.storeResult} onUpdate={this.updateResult}/>
            <StudentRoute path="/studentTasks" exact component={StudentTasks} users={this.state.allUsers} user={this.getMyself()} group={this.getStudentGroup()} />
            <StudentRoute path="/manageAssignment/:id" exact component={ManageAssignments} user={this.getMyself()} onSubmit={this.submitAssignment} onUpdate={this.updateAssignment} />
            <Route path="/login" exact render={() => <Login onLogin={this.loadAllTasks} />} />
            <Route path="/register" exact component={Register} />
            <Route path="/logout" exact component={Logout} />
            <TeacherRoute path="/test" exact component={Test} tasks={this.state.allTasks}/>
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
