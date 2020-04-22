import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/utils/Search';
import Alert from './components/utils/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env
        .REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
        .REACT_APP_GITHUB_CLIENT_SECRET}`
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
        .env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
        .REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false, alert: null });
  };

  clearUsers = () => this.setState({ users: [] });

  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env
        .REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
        .REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false, alert: null });
  };

  getUserRepos = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process
        .env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
        .REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  };

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
      <div>
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                <React.Fragment>
                  {alert && <Alert msg={alert.msg} type={alert.type} />}

                  <Search
                    searchTooltip="Search Users..."
                    submitUser={this.searchUsers}
                    enableClear={this.state.users.length > 0}
                    clearUsers={
                      this.state.users.length > 0 ? this.clearUsers : null
                    }
                    setAlert={this.setAlert}
                  />
                  <Users
                    loading={this.state.loading}
                    users={this.state.users}
                  />
                </React.Fragment>}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={props =>
                <User
                  {...props}
                  user={this.state.user}
                  repos={this.state.repos}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
