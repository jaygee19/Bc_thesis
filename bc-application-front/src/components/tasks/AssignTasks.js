import React, { Component } from 'react'
import Navigation from '../Navigation'
import AuthHelper from '../../helpers/AuthHelper';

class AssignTasks extends Component {
    constructor(props) {
        super(props)

        let task = this.props.tasks.filter(
            (item) => item.task_id === parseInt(this.props.match.params.id)
        )[0]
        this.state = {
            concreteTask: task,
            //allStudents: this.props.users,
            allGroups: this.props.groups,
            chosenStudents: [],
            chosenGroups: [],

        }

        this.assignGroup = this.assignGroup.bind(this)
        this.assignStudent = this.assignStudent.bind(this)
    }

    dayOfWeek(dayIndex) {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"][dayIndex] || '';
    }

    assignStudent(value) {
        let grup = this.props.groups.filter(
            (item) => item.schedule_id === value)[0]

        console.log("GRUP USERS", grup.users)

        this.setState(state => {
            return {
                chosenStudents: [...state.chosenStudents, ...grup.users]
            }
        })

        console.log("VSETCI", this.state.chosenStudents)
    }

    assignGroup(value) {
        console.log("Value STUD ID: " + value)

        let grup = this.props.groups.filter(
            (item) => item.schedule_id === value)[0]

        //console.log("CONCAT" , grup.users)
        // let match = this.state.chosenStudents.filter(
        // (item) => item.user_id === value)[0]

        // if(match === undefined)
        // {
        this.setState(state => {
            return {
                //chosenStudents: [...state.chosenStudents, stud],
                chosenGroups: [...state.chosenGroups, grup],
                //allStudents: state.allStudents.filter(u => u.user_id !== stud.user_id),
                allGroups: state.allGroups.filter(g => g.schedule_id !== grup.schedule_id),
            }
        })
        // }
        //console.log("ChosenStudi: " + this.state.chosenStudents)
    }

    render() {
        //console.log("this" , this.state.concreteTask)
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <h3>Pridelenie študentov:</h3>
                    <br />
                    <h2 className="blog-post-title">Title</h2>
                    <p className="blog-post-meta"> Deadline: {this.state.concreteTask.deadline}</p>
                    <p> {this.state.concreteTask.content} </p>
                    {/* <span className="d-flex justify-content-start">
                        Všetci:
                    </span> */}
                    <span className="d-flex justify-content-end">
                        Priradený:
                    </span>
                    <hr />

                    {this.state.allGroups.map((group) => {
                        return (
                            // const Artist = ({ name, artistOnClick }) => {
                            //         return (
                            //             <div value={name} onClick={artistOnClick}>
                            //                 {name}
                            //             </div>
                            //         )
                            //     }
                            <div className="" >
                                <p onClick={() => this.assignGroup(group.schedule_id)} style={{ color: "white" }}>
                                    {this.dayOfWeek(group.day)} - {group.time_begin} ( {AuthHelper.getInstance().getUserName()} )
                                </p>
                                <span onClick={() => this.assignStudent(group.schedule_id)}>  +  </span>


                                <div className="d-flex justify-content-end">
                                    <div>
                                    {this.state.chosenStudents.filter((student) => student.pivot.schedule_id === group.schedule_id)
                                    .map((chosen) => {
                                        return (
                                            <p> {chosen.name} </p>

                                        )
                                    })}
                                    </div>
                                </div>

                            </div>
                        )
                    })}

                    {this.state.chosenGroups.map((chosen) => {
                        console.log("CHOSEN" + chosen)
                        return (
                            // const Artist = ({ name, artistOnClick }) => {
                            //         return (
                            //             <div value={name} onClick={artistOnClick}>
                            //                 {name}
                            //             </div>
                            //         )
                            //     }
                            <div className="d-flex justify-content-end" >
                                <p style={{ color: "#E0C01F" }} >
                                    {this.dayOfWeek(chosen.day)} - {chosen.time_begin} ( {AuthHelper.getInstance().getUserName()} )
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }
}

export default AssignTasks
