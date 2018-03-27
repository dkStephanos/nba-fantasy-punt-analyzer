import React from 'react';
import { Button } from 'react-bootstrap';

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello World</h1>
  		<Button href="https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9RUtleE12cnJXdGhaJmQ9WVdrOWMyRkdhalYyTm1zbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD1lZA--&redirect_uri=oob&response_type=code&language=en-us" bsStyle="primary">Primary</Button>
      </div>
    )
  }
}
export default LandingPage