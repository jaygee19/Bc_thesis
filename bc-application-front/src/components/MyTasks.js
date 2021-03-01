import React, { Component } from 'react'
import Navigation from './Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'


class MyTasks extends Component {
    constructor(props) {
        super(props)

        this.addNewTask = this.addNewTask.bind(this)
    }

    addNewTask(event) {
        event.preventDefault()

        this.props.history.push('/myTasks/create')
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <button onClick={this.addNewTask} className="w-100 btn btn-lg btn-primary" > + </button>
                    <p></p>
                    <h3>Moje Zadania:</h3>
                    <p></p>
                </div>
                {this.props.tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            id={task.id}
                            content={task.content}
                            //title={task.title}
                            type={task.type}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(MyTasks);