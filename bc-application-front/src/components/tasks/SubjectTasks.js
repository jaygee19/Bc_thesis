import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'
import { CardColumns, CardGroup } from 'react-bootstrap';


class SubjectTasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            valueType:'',
            valueTeacher: '',
        }

        this.valueTypeChanged = this.valueTypeChanged.bind(this)
        this.valueTeacherChanged = this.valueTeacherChanged.bind(this)
    }

    getUserName(id) {
        let concreteUser = this.props.users.filter(item => item.user_id === id)
        let fullName = concreteUser[0].name + " " + concreteUser[0].surname
        return fullName
    }

    valueTypeChanged(event) {
        this.setState({
            valueType: event.target.value,
        })
    }

    valueTeacherChanged(event) {
        this.setState({
            valueTeacher: event.target.value,
        })
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container" style={{ color: 'white' }}>
                    <p></p>
                    <div className="d-flex justify-content-center">
                        <h3> Všetky zadania: </h3>
                    </div>
                    <p></p>
                    <div className="row ">
                        <div className="col-3">
                        <label>Vyberte si typ: </label>
                        <select type="text" className="form-control" value={this.state.valueType} onChange={this.valueTypeChanged}>
                                    <option value=""></option>
                                    <option value="first_check">Prvý zápočet</option>
                                    <option value="second_check">Druhý zápočet</option>
                                    <option value="semester_work">Semestrálna práca</option>
                                    <option value="homework">Domáca úloha</option>
                        </select>
                        </div>
                        <div className="col-4">
                        <label>Vyberte si vyučujúceho: </label>
                        <select type="text" className="form-control" value={this.state.valueTeacher} onChange={this.valueTeacherChanged}>
                                    <option value=""></option>
                                    {this.props.users.filter((user) => user.role === 't')
                                    .map((user) => {
                                    return(
                                        <option value={user.user_id}>{this.getUserName(user.user_id)}</option>
                                    )
                                })}
                        </select>
                        </div>
                    </div>
                    <p></p>
                </div>
                <div className="container">
                <CardColumns>
                {this.props.tasks.filter((task) => 
                                        (task.type === this.state.valueType || this.state.valueType === '') 
                                        && (this.state.valueTeacher === '' || task.teacher_id == this.state.valueTeacher)
                                        && task.hidden !== true)
                .map((task) => {
                    return (
                        <Task
                            key={task.task_id}
                            id={task.task_id}
                            content={task.content}
                            userName={this.getUserName(task.teacher_id)}
                            title={task.title}
                            date={task.valid_from}
                            deadline={task.deadline}
                            type={task.type}
                            path={task.path_to_file}
                            onDelete={this.props.deleteTask}
                            private={false}
                            hidden={task.hidden}
                        />
                    )
                })}
            </CardColumns>
            </div>
            </div>
        )
    }
}

export default withRouter(SubjectTasks);