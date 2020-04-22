import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

class Search extends Component {
  state = { searchText: '' };

  static propTypes = {
    searchTooltip: PropTypes.string,
    submitClassname: PropTypes.string,
    submitUser: PropTypes.func.isRequired,
    clearClassname: PropTypes.string,
    enableClear: PropTypes.bool,
    handleClearUsers: (props, propName, ComponentName) => {
      // 'enableClear' in props
      if (
        props['enableClear'] &&
        (!props['clearUsers'] || typeof props['clearUsers'] !== 'function')
      ) {
        return new Error('clearUsers property was not set');
      }
    },
  };

  onChange = e => {
    this.setState({ searchText: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { searchText } = this.state;
    if (searchText === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.submitUser(searchText);
    }
  };

  onClear = () => {
    this.setState({ searchText: '' });
    this.props.clearUsers();
  };

  render() {
    const {
      searchTooltip,
      submitClassname,
      clearClassname,
      enableClear,
    } = this.props;

    return (
      <div>
        <form
          style={{ fontSize: '1rem' }}
          onSubmit={this.onSubmit}
          className="form"
        >
          <input
            type="text"
            name="searchText"
            id="searchText"
            autoComplete="off"
            placeholder={searchTooltip}
            style={{
              outline: 'none',
              border: '1px solid #000',
              ':focus': {
                // borderColor: 'var(--primary-color)',
                border: '1px solid var(--primary-color)',
              },
            }}
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
          />
          <input
            type="submit"
            value="Search"
            className={`btn btn-dark btn-block ${submitClassname}`}
          />
          {enableClear &&
            <input
              type="button"
              value="Clear"
              className={`btn btn-light btn-block ${clearClassname}`}
              onClick={this.onClear}
            />}
        </form>
      </div>
    );
  }
}

export default Radium(Search);
