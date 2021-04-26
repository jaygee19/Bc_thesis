import React, { Component } from 'react';
import Navigation from './Navigation';
import bsCustomFileInput from 'bs-custom-file-input';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Test extends Component {
  constructor(props) {
    super(props)

    this.state = {
      file: "",
    }

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

  render() {
    return (
      <div class="container">
        <div class="custom-file">
          <input id="inputGroupFile01" type="file" class="custom-file-input" />
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      
    );
  }

}


export default Test;
