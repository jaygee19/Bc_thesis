import React, { Component } from 'react'
import Navigation from '../Navigation'
import AuthHelper from '../../helpers/AuthHelper';
import dateFormat from 'dateformat';
import { getAllErrors } from '../../helpers/ErrorHelper'

class AssignTasks extends Component {
    constructor(props) {
        super(props)

        let task = this.props.tasks.filter((item) => item.task_id === parseInt(this.props.match.params.id))[0]

        this.state = {
            concreteTask: task,
            assignedStudents: task.stud_tasks,
            allGroups: this.props.groups,
            chosenStudents: [],
            chosenGroups: [],
            status_errors: [],
            visiblePlus: true,
        }

        this.assignStudent = this.assignStudent.bind(this)
        this.removeStudent = this.removeStudent.bind(this)
        this.removeStudents = this.removeStudents.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    dayOfWeek(dayIndex) {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"][dayIndex] || '';
    }

    toDate(time) {
        return dateFormat(time, "d.mm.yyyy, HH:MM")
    }

    onSubmit(event) {
        event.preventDefault()

        this.props
            .onSubmit({
                chosenStudents: this.state.chosenStudents,
                task_id: this.state.concreteTask.task_id,
            })
            .then(() => {
                this.props.history.push('/assignedTasks/' + this.props.match.params.id)
            })
            .catch((e) => {
                this.setState({
                    status_errors: e.response.data['status'] || [],
                })
            })
    }

    removeStudent(value) {
        this.setState(state => {
            return {
                chosenStudents: state.chosenStudents.filter(s => s.user_id !== value)
            }
        })
    }

    removeStudents(value) {

        let group = this.props.groups.filter(
            (item) => item.schedule_id === value)[0]
        
        let available = []
        if (this.state.chosenStudents !== undefined) {
            for (let i = 0; i < this.state.chosenStudents.length; i++) {
                let flag = 0
                const student = this.state.chosenStudents[i]
                for (let j = 0; j < group.users.length; j++) {
                    const group_student = group.users[j]
                    if (student.user_id === group_student.user_id) {
                        flag = 1
                    } 
                }
                if (flag === 0) {
                    available.push(student)
                }
            }
        }

        this.setState({
            chosenStudents: available
        })
    }

    assignStudent(value) {

        let group = this.props.groups.filter(
            (item) => item.schedule_id === value)[0]

        let together = group.users.concat(this.state.chosenStudents)

        let result = [...new Set(together)]

        let available = []

        if (this.state.assignedStudents !== undefined) {
            for (let i = 0; i < result.length; i++) {
                let flag = 0
                const result_student = result[i]
                for (let j = 0; j < this.state.assignedStudents.length; j++) {
                    const assigned_student = this.state.assignedStudents[j]
                    if (result_student.user_id === assigned_student.user_id) {
                        flag = 1
                    }
                }
                if (flag === 0) {
                    available.push(result_student)
                }
            }
        }

        this.setState({
            chosenStudents: available
        })

    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <div style={{ color: 'white' }}>
                        <h3>Pridelenie študentov:</h3>
                        <br />
                        <h2 className="blog-post-title">{this.state.concreteTask.title}</h2>
                        <p className="blog-post-meta"> Deadline: {this.toDate(this.state.concreteTask.deadline)}</p>
                        <hr />
                    </div>
                    <div className="row">
                        <div className=" card assign-card col ">
                        <p></p>
                            <h3 className="d-flex justify-content-start">
                                Už pridelení:
                            </h3>
                            <hr/>
                            <p></p>
                                {this.state.assignedStudents
                                    .map((chosen) => {
                                        return (
                                            <div key={chosen.user_id}>
                                            <h6> {chosen.name} {chosen.surname} ({chosen.group}) </h6>
                                            </div>
                                        )
                                    })}
                        </div>

                        <div className="card assign-card col-8">
                            <p></p>
                            <h3 className="d-flex justify-content-start">
                                Prideliť:
                            </h3>
                            <form onSubmit={this.onSubmit}>
                                {this.state.allGroups.map((group) => {
                                    return (
                                        <div key={group.schedule_id}>
                                            <h4 className="font-weight-bold" style={{ color: "black" }}>
                                                {this.dayOfWeek(group.day)} - {group.time_begin}:00 ( {AuthHelper.getInstance().getUserName()} )
                                                <span className="my_btn btn btn-sm btn-info" onClick={() => this.assignStudent(group.schedule_id)}>  +  </span>
                                                <span className="my_btn btn btn-sm btn-info" onClick={() => this.removeStudents(group.schedule_id)}>  –  </span>
                                            </h4>

                                            <div className="">
                                                <div>
                                                    {this.state.chosenStudents.filter((student) => student.pivot.schedule_id === group.schedule_id)
                                                        .map((chosen) => {
                                                            return (
                                                                <div key={chosen.user_id}>
                                                                    <h6 style={{ color: "black" }}> {chosen.name} {chosen.surname}
                                                                        <span className="my_btn btn btn-sm btn-info" onClick={() => this.removeStudent(chosen.user_id)}> – </span>
                                                                    </h6>
                                                                </div>
                                                            )
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                {getAllErrors(this.state.status_errors)} 
                                <p></p>
                                <button className="w-50 btn btn-lg btn-info" type="submit">Ulož</button>
                                <p></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default AssignTasks
