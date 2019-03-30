import React, { Component } from 'react';
import { Router, Link } from "@reach/router"

import Home from './components/Home';
import About from './components/About';
import NoPage from './components/NoPage';

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="header">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </nav> 
        <Home path="/" />
        <About path="/about" />
      </Router>
    );
  }
}

export default App;
