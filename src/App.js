import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/utils/Search';
import Alert from './components/utils/Alert';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env
        .GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`
    );
    this.setState({
      users: res.data,
      loading: false,
    });
  }

  searchUsers = async searchQuery => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&client_id=${process
        .env.GITHUB_CLIENT_ID}&client_secret=${process.env
        .GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false, alert: null });
  };

  clearUsers = () => this.setState({ users: [] });

  setAlert = (msg, type) => {
    this.setState({
      alert: { msg, type },
    });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { alert } = this.state;
    return (
      <h1>
        <Navbar />
        <div className="container">
          {alert && <Alert msg={alert.msg} type={alert.type} />}

          <Search
            searchTooltip="Search Users..."
            submitUser={this.searchUsers}
            enableClear={this.state.users.length > 0}
            clearUsers={this.state.users.length > 0 ? this.clearUsers : null}
            setAlert={this.setAlert}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </h1>
    );
  }
}

export default App;
