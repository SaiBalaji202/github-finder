import React, {Component} from 'react';
import UserItem from './UserItem';

class Users extends Component {
  state = {
    users: [
      {
        id: '1',
        login: 'Balaji',
        avatar_url: 'https://avatars0.githubusercontent.com/u/29632018?s=460&u=7e7ebfe9977085c7c2bf83eec20b38a4df68636b&v=4',
        profile_url: 'https://github.com/SaiBalaji202',
      },
      {
        id: '2',
        login: 'Vijay',
        avatar_url: 'https://avatars0.githubusercontent.com/u/29632018?s=460&u=7e7ebfe9977085c7c2bf83eec20b38a4df68636b&v=4',
        profile_url: 'https://github.com/SaiBalaji202',
      },
      {
        id: '3',
        login: 'Gokul',
        avatar_url: 'https://avatars0.githubusercontent.com/u/29632018?s=460&u=7e7ebfe9977085c7c2bf83eec20b38a4df68636b&v=4',
        profile_url: 'https://github.com/SaiBalaji202',
      },
    ],
  };
  render () {
    return (
      <div style={usersStyle}>
        {this.state.users.map (user => <UserItem key={user.id} user={user} />)}
      </div>
    );
  }
}

const usersStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
};

export default Users;
