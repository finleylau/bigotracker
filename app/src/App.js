import React, { Component } from 'react';
import TopBar from './components/TopBar';
import Routes from  './routes/index';

export default class App extends Component {

  render() {
    return (
      <div>
      <TopBar />
      <Routes />
      </div>
    );
  }
}
