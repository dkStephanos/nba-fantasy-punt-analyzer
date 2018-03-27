

import React from 'react';
import { Button } from 'react-bootstrap';

const authorizeUrl = 'https://api.login.yahoo.com/oauth2/request_auth';
const clientId = process.env.CLIENT_ID;
const redirectUri = 'http://stephanos.pagekite.me'
const responseType = 'code'
const language = 'en-us';

class LandingPage extends React.Component {

  render() {
    return(
      <div>
        <h1>NBA Fantasy Analyzer</h1>
  		<Button 
  			href={`${authorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&language=${language}`}
  			bsStyle="primary">
  			Log In
  		</Button>
      </div>
    )
  }
}
export default LandingPage;