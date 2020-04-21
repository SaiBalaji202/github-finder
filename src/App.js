import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/utils/Search';

class App extends Component {
  state = {
    users: [],
    loading: false,
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
    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => this.setState({ users: [] });

  render() {
    return (
      <h1>
        <Navbar />
        <div className="container">
          <Search
            searchTooltip="Search Users..."
            submitUser={this.searchUsers}
            enableClear={this.state.users.length > 0}
            clearUsers={this.state.users.length > 0 ? this.clearUsers : null}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </h1>
    );
  }
}

export default App;
