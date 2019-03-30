import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";

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
        <div className="app">
          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route component={NoPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
