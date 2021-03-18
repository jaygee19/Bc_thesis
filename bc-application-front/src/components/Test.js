import React, { Component } from 'react';
import Navigation from './Navigation';
import bsCustomFileInput from 'bs-custom-file-input';

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
          </div>
        );
      }

}


export default Test;
