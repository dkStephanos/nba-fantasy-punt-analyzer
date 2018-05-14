import React from 'react';
import { Button } from 'react-bootstrap';


class NotFound extends React.Component {

  render() {
    return(
      <div>
        <h1>Air Ball...</h1>
        <p>This page doesn't exist</p>
  		<Button 
  			href={`/home`}
  			bsStyle="primary">
  			Back Home
  		</Button>
      </div>
    )
  }
}
export default NotFound;