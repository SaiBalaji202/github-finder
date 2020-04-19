import React, {Component} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

class App extends Component {
  render () {
    return (
      <h1>
        <Navbar />
        <div className="container">

          <Users />
        </div>
      </h1>
    );
  }
}

export default App;
