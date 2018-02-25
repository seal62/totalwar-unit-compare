import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './reboot.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="intro">
          <p>
            Choose a <Link to="/factions">Faction to begin</Link>
          </p>
          <p>
            or
          </p>
          <p>
            Start <Link to="/compare">comparing units</Link>
          </p>
        </section>
      </div>
    );
  }
}

export default App;
