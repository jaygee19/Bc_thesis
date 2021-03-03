import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'
import { getApiResponse } from '../../helpers/ApiHelper';
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
       return concreteUser[0].name
    }

    getUserSurname(id)
    {
       let concreteUser = this.props.users.filter(item => item.user_id === id)
       return concreteUser[0].surname
    }

    render() {
        //console.log("Vstci users" + this.props.users)
        return (
            <div>
                <Navigation />
                <div className="container">
                    <p></p>
                    <button onClick={this.onAddNew} type="submit" className="btn btn-primary" > + </button>
                    <p></p>
                    <div className="d-flex justify-content-start">
                    <h3> Moje Zadania: </h3>
                    </div>
                    <p></p>
                </div>
                {this.props.tasks.map((task) => {
                    return (
                        <Task
                            //key={task.id}
                            id={task.task_id}
                            content={task.content}
                            userName={this.getUserName(task.teacher_id)}
                            userSurname={this.getUserSurname(task.teacher_id)}
                            //title={task.title}
                            date={task.valid_from}
                            deadline={task.deadline}
                            type={task.type}
                            onDelete={this.props.deleteTask}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(MyTasks);