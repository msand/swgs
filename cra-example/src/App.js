import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Svg, { Circle, Rect } from 'swgs';

class SvgExample extends Component {
  render() {
    return (
      <Svg height="100" width="100">
        <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green" />
        <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow" />
      </Svg>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <SvgExample />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
