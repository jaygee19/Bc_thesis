import React, { Component } from 'react'
import Navigation from '../Navigation'

class AssignTasks extends Component {
    constructor(props) {
        super(props)

        if (this.props.match.params.id != null) {
            let task = this.props.tasks.filter(
                (item) => item.task_id === parseInt(this.props.match.params.id)
            )[0]
            this.state = {
                concreteTask: task,
                allStudents: this.props.users,
                chosenStudents: [],
            }
        }

        this.addRight = this.addAssign.bind(this)
    }

    addAssign(value) {
        console.log("Value STUD ID: " + value)

        let stud = this.props.users.filter(
        (item) => item.user_id === value)[0]
        
        // let match = this.state.chosenStudents.filter(
        // (item) => item.user_id === value)[0]
        
        // if(match === undefined)
        // {
        this.setState(state => {
            return {
                chosenStudents: [...state.chosenStudents, stud],
                allStudents: state.allStudents.filter(u => u.user_id !== stud.user_id),
            }
        })
        // }
        console.log("ChosenStudi: " + this.state.chosenStudents)
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
                    <span className="d-flex justify-content-start">
                        Všetci:
                    </span>
                    <span className="d-flex justify-content-end">
                        Priradený:
                    </span>
                    <hr />

                    {this.state.allStudents.map((user) => {
                        return (
                            // const Artist = ({ name, artistOnClick }) => {
                            //         return (
                            //             <div value={name} onClick={artistOnClick}>
                            //                 {name}
                            //             </div>
                            //         )
                            //     }
                            <div className="d-flex justify-content-start" >
                                <p onClick={() => this.addAssign(user.user_id)} style={{color: "white"}}> {user.name} </p>
                            </div>
                        )
                    })}

                    {this.state.chosenStudents.map((chosen) => {
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
                                <p style={{color: "#E0C01F"}} > {chosen.name} </p>
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    }
}

export default AssignTasks
