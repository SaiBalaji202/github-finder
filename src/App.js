import React, {Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';

class App extends Component {
  render () {
    return (
      <h1>
        <Navbar />
      </h1>
    );
  }
}

export default App;
