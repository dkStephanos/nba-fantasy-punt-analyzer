import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';

class LoadingTransition extends Component {

  render() {
    return (
      <div className="loading-transition">
        <img src={logo} className="Loading-logo" alt="logo" />
      </div>
    );
  }
}
export default LoadingTransition;