import React, { Component } from 'react'
import Navigation from '../Navigation';
import Task from './Task';
import { withRouter } from 'react-router-dom'
import PaginationList from 'react-pagination-list';

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
                <div className="container">
                    <PaginationList
                        data={this.props.tasks.filter((task) => task.hidden === true)}
                        pageSize={3}
                        renderItem={(item, key) => (
                            <Task
                                key={key}
                                id={item.task_id}
                                content={item.content}
                                title={item.title}
                                date={item.valid_from}
                                deadline={item.deadline}
                                type={item.type}
                                path={item.path_to_file}
                                onUncover={this.props.uncoverTask}
                                private={true}
                                hidden={item.hidden}
                            />
                        )}
                    />
                </div>


                {/* {this.props.tasks.filter((task) => task.hidden === true)
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
                        })} */}
            </div>
        )
    }
}

export default withRouter(HiddenTasks);
