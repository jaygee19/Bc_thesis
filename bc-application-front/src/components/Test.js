import React, { Component } from 'react';
import Navigation from './Navigation';
import bsCustomFileInput from 'bs-custom-file-input';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Pagination from 'react-js-pagination';
import { withRouter } from 'react-router-dom'
import PaginationList from 'react-pagination-list';


class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: "",
      activePage: 1,
    }
    console.log("BEFORE", this.props.tasks)
    const myData = [].concat(this.props.tasks)
    .sort((a, b) => a.task_id < b.task_id ? 1 : -1)    
    console.log("SORTED", myData)
    this.onSubmit = this.onSubmit.bind(this)
    this.fileChanged = this.fileChanged.bind(this)
  }

  fileChanged(event) {

    this.setState({
      file: event.target.files[0],
    })
  }

  onSubmit(event) {
    event.preventDefault()

    const formData = new FormData();
    formData.append('filename', this.state.file);
    formData.append('id', 64);


    this.props
      .onSubmit(formData)
  }


  componentDidMount() {
    bsCustomFileInput.init()
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    return (
      <div>
        <Navigation>

        </Navigation>
        <div class="container">
          <div>
            <PaginationList 
        data={this.props.tasks}
        pageSize={2}
        renderItem={(item, key) => (
          <p key={key}>{item.task_id}</p>
        )}
        />
            {/* <ul>
              
            {this.props.tasks.map((temp) => {
              return (
                <li>
                  {temp.task_id}
                </li>
              )
            })}

            </ul>
            <Pagination
            
              activePage={this.state.activePage}
              itemsCountPerPage={2}
              totalItemsCount={10}
              pageRangeDisplayed={3}
              onChange={this.handlePageChange.bind(this)}
            /> */}
          </div>
        </div>
      </div>
    );
  }

}


export default withRouter(Test);
