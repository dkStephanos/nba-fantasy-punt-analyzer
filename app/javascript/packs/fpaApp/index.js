import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Routes />, document.getElementById('fpa-app'),
  )
});