import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper';

class MyTasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
          }

        this.onAddNew = this.onAddNew.bind(this)
    }
    
    onAddNew(event) {
        event.preventDefault()
        this.props.history.push('/myTasks/create')
    }

    getUserName(id)
    {
       let concreteUser = this.props.users.filter(item => item.user_id === id)
       let fullName = concreteUser[0].name + " " + concreteUser[0].surname
       return fullName
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <button onClick={this.onAddNew} type="submit" className="btn btn-light" > + </button>
                    <p></p>
                    <div className="d-flex justify-content-center" style={{ color: 'white' }}> 
                    <h3> Moje zadania: </h3>
                    </div>
                    <div className="d-flex justify-content-center" style={{ color: 'white' }}>
                    <p> ({this.getUserName(AuthHelper.getInstance().getUserID())}) </p>
                    </div>
                    <p></p>
                </div>
                {this.props.tasks.filter((task) => task.hidden !== true)
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
                            onHide={this.props.hideTask}
                            private={true}
                            hidden={task.hidden}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(MyTasks);