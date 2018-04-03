import { auth } from '../utils/init';
import React, { Component } from 'react';

class LoginTransition extends Component {
  componentDidMount() {
    const token = auth.getQueryParams();
    auth.doAuthentication(token);
  }

  render() {
    return (
      <div className="login-transition">
      	<h1>Login Transitioning</h1>
      </div>
    );
  }
}

export default LoginTransition;