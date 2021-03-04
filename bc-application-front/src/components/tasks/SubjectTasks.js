import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'

class SubjectTasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
          }
    }
    
    getUserName(id)
    {
       let concreteUser = this.props.users.filter(item => item.user_id === id)
       let fullName = concreteUser[0].name + " " + concreteUser[0].surname
       return fullName
    }

    render() {
        //console.log("Vstci users" + this.props.users)
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <div className="d-flex justify-content-start">
                    <h3> Všetky zadania: </h3>
                    </div>
                    <p></p>
                </div>
                {this.props.tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            id={task.task_id}
                            content={task.content}
                            userName={this.getUserName(task.teacher_id)}
                            //title={task.title}
                            date={task.valid_from}
                            deadline={task.deadline}
                            type={task.type}
                            onDelete={this.props.deleteTask}
                            private={false}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(SubjectTasks);