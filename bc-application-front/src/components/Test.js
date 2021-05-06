import React, { Component } from 'react';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';


class Test extends Component {

  render() {
    return (
      <div>
        <Navigation>

        </Navigation>
      </div>
    );
  }

}


export default withRouter(Test);
