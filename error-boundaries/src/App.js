import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BadComponent from './components/BadComponent';
import BadComponentErrorBoundary from './components/BadComponentErrorBoundary';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GlobalErrorBoundary>

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <BadComponent />
            <h1>
              React Error Boundaries
            </h1>

            <BadComponentErrorBoundary>
              <BadComponent />
            </BadComponentErrorBoundary>
          </header>
        </GlobalErrorBoundary>
      </div>
    );
  }
}

export default App;
