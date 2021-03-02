import React, { Component } from 'react'
import Navigation from './Navigation';

class Home extends Component {

    render() {
        return (
            <div>
                <Navigation />
                <div className="container">
                  <p></p>
                  <h3>Stručná osnova predmetu:</h3> 
                  <p> OPERAČNÉ SYSTÉMY </p> 
            </div>
            </div>
        )
    }
}

export default Home;