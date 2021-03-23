import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'

class SubjectTasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value:'',
        }

        this.valueChanged = this.valueChanged.bind(this)
    }

    getUserName(id) {
        let concreteUser = this.props.users.filter(item => item.user_id === id)
        let fullName = concreteUser[0].name + " " + concreteUser[0].surname
        return fullName
    }

    valueChanged(event) {
        this.setState({
            value: event.target.value,
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
                    <div className="row col-3">
                        <label>Vyberte si typ: </label>
                        <select type="text" className="form-control" value={this.state.value} onChange={this.valueChanged}>
                                    <option value=""></option>
                                    <option value="first_check">Prvý zápočet</option>
                                    <option value="second_check">Druhý zápočet</option>
                                    <option value="semester_work">Semestrálna práca</option>
                                    <option value="homework">Domáca úloha</option>
                        </select>
                    </div>
                    <p></p>
                </div>
                {this.props.tasks.filter((task) => task.type === this.state.value || this.state.value === "" && task.hidden !== true)
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
            </div>
        )
    }
}

export default withRouter(SubjectTasks);