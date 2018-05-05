import { auth } from '../utils/init';
import React, { Component } from 'react';

class LogoutTransition extends Component {
  componentDidMount() {
    auth.logout();
  }

  render() {
    return (
      <div className="logout-transition">
      	<h1>Logging out...</h1>
      </div>
    );
  }
}

export default LogoutTransition;