import { React, Component } from 'react'
import { withRouter } from 'react-router-dom'
import AuthHelper from '../../helpers/AuthHelper'

class Task extends Component {
    constructor(props) {
        super(props)
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    onEdit() {
        console.log("IDCKO" + this.props.id)
        this.props.history.push('/myTasks/' + this.props.id + '/edit')
    }

    onDelete() {
        console.log("DELETE" + this.props.id)
        this.props.history.push('/myTasks/' + this.props.id + '/delete')
    }


    render() {
        return (
            <div className="container col-6">
                <div className="row">
                    <div className="col-12 jumbotron">
                        <h1 className="display-4">Title</h1>
                        <p className="lead">Content</p>
                        <hr className="my-4" />
                        <p>{this.props.content}</p>
                        {AuthHelper.getInstance().isUserTeacher() && (
                            <button onClick={this.onEdit} type="submit" className="btn btn-primary" >
                                Upraviť
                            </button> 
                        )} 
                        {AuthHelper.getInstance().isUserTeacher() && (
                            <button  onClick={() => this.props.onDelete(this.props.id)} type="submit" className="btn btn-primary" >
                                Vymazať
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Task)