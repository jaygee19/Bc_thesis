import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

class Task extends Component {
    constructor(props) {
        super(props)
        this.onEdit = this.onEdit.bind(this)
        this.onAssign = this.onAssign.bind(this)
        this.onListOf = this.onListOf.bind(this)
    }

    onAssign() {
        this.props.history.push('/assignTasks/' + this.props.id)
    }

    onEdit() {
        console.log("IDCKO" + this.props.id)
        this.props.history.push('/myTasks/' + this.props.id + '/edit')
    }

    onListOf() {
        this.props.history.push('/assignedTasks/' + this.props.id)
    }


    render() {
        return (
            <div className="container" key={this.props.key}>
                <div className="row mb-2">
                    <div className="col-md-12">
                        <div className="card flex-md-row mb-4 box-shadow h-md-250">
                            <div className="card-body d-flex flex-column align-items-center">
                                <strong className="d-inline-block mb-2 text-secondary">{this.props.type}</strong>
                                <h3 className="mb-0">
                                    <p className="text-dark" >{this.props.title}</p>
                                </h3>
                                <div className="mb-1 text-muted"><small>Vytvorené: {this.props.date} ( {this.props.userName} {this.props.userSurname} )</small></div>
                                <div className="mb-1 text-muted"><small>Deadline: {this.props.deadline}</small></div>
                                <p className="card-text mb-auto text-info"><small>Popis zadania: {this.props.content}</small></p>
                                <p className="card-text mb-auto text-info"><small>Priložený súbor: {this.props.path} </small></p>
                                {/* <a href="#">Continue reading</a> */}
                                <p></p>
                                <div>
                                {AuthHelper.getInstance().isUserTeacher() && this.props.private && (
                                    <button onClick={this.onEdit} type="submit" className="my_btn btn btn-dark" >
                                        Upraviť 
                                    </button> 
                                )}
                                {AuthHelper.getInstance().isUserTeacher() && this.props.private && (
                                    <button onClick={() => this.props.onDelete(this.props.id)} type="submit" className="my_btn btn btn-dark" >
                                        Vymazať
                                    </button>
                                )}
                                {AuthHelper.getInstance().isUserTeacher() && this.props.private && (
                                    <button onClick={this.onAssign} type="submit" className="my_btn btn btn-dark" >
                                        Prideliť
                                    </button>
                                )}
                                <button onClick={this.onListOf} type="submit" className="my_btn btn btn-dark" >
                                        Pridelení študenti
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Task)