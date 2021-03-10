import React, { Component } from 'react'
import Navigation from '../Navigation'
import AuthHelper from '../../helpers/AuthHelper';
import { isDOMComponentElement } from 'react-dom/test-utils';

class AssignTasks extends Component {
    constructor(props) {
        super(props)

        let task = this.props.tasks.filter(
            (item) => item.task_id === parseInt(this.props.match.params.id)
        )[0]


        this.state = {
            concreteTask: task,
            assignedStudents: task.stud_tasks,
            //allStudents: this.props.users,
            allGroups: this.props.groups,
            chosenStudents: [],
            chosenGroups: [],
            //assignedStudents: 
        }

        // this.assignGroup = this.assignGroup.bind(this)
        this.assignStudent = this.assignStudent.bind(this)
        this.removeStudent = this.removeStudent.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    dayOfWeek(dayIndex) {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"][dayIndex] || '';
    }

    onSubmit(event) {
        event.preventDefault()

        this.props
            .onSubmit({
                chosenStudents: this.state.chosenStudents,
                task_id: this.state.concreteTask.task_id,
            })
            .then(() => {
                this.props.history.push('/myTasks')
            })
    }

    removeStudent(value) {
        this.setState(state => {
            return {
                chosenStudents: state.chosenStudents.filter(s => s.user_id !== value)
            }
        })
    }

    assignStudent(value) {

        let grup = this.props.groups.filter(
            (item) => item.schedule_id === value)[0]

        let together = grup.users.concat(this.state.chosenStudents)

        let result = [...new Set(together)]

        let available = []
        if (this.state.assignedStudents !== undefined) {
            for (let i = 0; i < result.length; i++) {
                let temp = 0
                const item1 = result[i]
                for (let j = 0; j < this.state.assignedStudents.length; j++) {
                    const item2 = this.state.assignedStudents[j]
                    if (item1.user_id === item2.user_id) {
                        temp = 1
                    }
                }
                if (temp === 0) {
                    available.push(item1)
                }
            }
        }

        this.setState(state => {
            return {
                chosenStudents: available
            }
        })

    }

    render() {
        return (     
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <h3>Pridelenie študentov:</h3>
                    <br />
                    <h2 className="blog-post-title">{this.state.concreteTask.title}</h2>
                    <p className="blog-post-meta"> Deadline: {this.state.concreteTask.deadline}</p>
                    <p> {this.state.concreteTask.content} </p>
                    <span className="d-flex justify-content-end">
                        Priradiť:
                    </span>
                    <span className="d-flex justify-content-start">
                        Už pridelený:
                    </span>
                    <hr />
                    <div class="row">
                        <div className=" card assign-card col ">
                        <p></p>
                                {this.state.assignedStudents
                                    .map((chosen) => {
                                        return (
                                            <p> {chosen.name} {chosen.surname} </p>
                                        )
                                    })}
                        </div>

                        <div className="card assign-card col-8">
                        <p></p>
                        <form onSubmit={this.onSubmit}>
                        {this.state.allGroups.map((group) => {
                            return (
                                <div className="">
                                    <span className="font-weight-bold" style={{ color: "black" }}>
                                        {this.dayOfWeek(group.day)} - {group.time_begin} ( {AuthHelper.getInstance().getUserName()} )
                                    </span>
                                    <span onClick={() => this.assignStudent(group.schedule_id)}>  +  </span>



                                    <div className="">
                                        <div>
                                            {this.state.chosenStudents.filter((student) => student.pivot.schedule_id === group.schedule_id)
                                                .map((chosen) => {
                                                    return (
                                                        <div>
                                                            <span style={{ color: "green" }}> {chosen.name} {chosen.surname} </span>
                                                            <span onClick={() => this.removeStudent(chosen.user_id)}> - </span>
                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <p></p>
                        <button className="w-50 btn btn-lg btn-primary" type="submit">Ulož</button>
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
