import React, { Component } from 'react';
import Navigation from './Navigation';

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


        this.props
            .onSubmit(formData)
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                    <form onSubmit={this.onSubmit} encType="multipart/form-data">
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" name="filename" id="filename"
                                onChange={this.fileChanged}
                            />
                            <label class="custom-file-label" for="customFile">Choose file</label>
                        </div>
                        <button className="w-50 btn btn-lg btn-primary" type="submit">Ulož</button>
                    </form>
                </div>

            </div>


        )
    }

}

export default Test;
