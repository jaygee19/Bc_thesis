import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'

class HiddenTasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }

    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container" style={{ color: 'white' }}>
                    <p></p>
                    <div className="d-flex justify-content-center">
                        <h3> Skryté zadania: </h3>
                    </div>
                    <p></p>
                </div>
                {this.props.tasks.filter((task) => task.hidden === true)
                .map((task) => {
                    return (
                        <Task
                            key={task.task_id}
                            id={task.task_id}
                            content={task.content}
                            title={task.title}
                            date={task.valid_from}
                            deadline={task.deadline}
                            type={task.type}
                            path={task.path_to_file}
                            onUncover={this.props.uncoverTask}
                            private={true}
                            hidden={task.hidden}
                        />
                    )
                })}
            </div>
        )
    }
}

export default withRouter(HiddenTasks);
