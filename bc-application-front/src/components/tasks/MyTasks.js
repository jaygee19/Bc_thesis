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

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <button onClick={this.onAddNew} type="submit" className="btn btn-primary" > + </button>
                    <p></p>
                    <h3>Moje Zadania:</h3>
                    <p></p>
                </div>
                {this.props.tasks.map((task) => {
                    return (
                        <Task
                            //key={task.id}
                            id={task.task_id}
                            content={task.content}
                            //title={task.title}
                            //type={task.type}
                            onDelete={this.props.deleteTask}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(MyTasks);