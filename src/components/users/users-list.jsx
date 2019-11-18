import React, { Component } from 'react';
import firebase from './../../config/firebase';

class Users extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = null;
    this.state = {
      users: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const users = [];

    querySnapshot.forEach(doc => {
      const { username, email, type } = doc.data();

      users.push({
        key: doc.id,
        username,
        email,
        type
      });
    });

    this.setState({
      users
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.setState({
      email: 'hcsperera@gmail.com',
      type: 'admin'
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, email, type } = this.state;

    this.ref
      .add({
        username,
        email,
        type
      })
      .then(doc => {
        this.setState({
          username: ''
        });
      });
  };

  delete = id => {
    console.log('Delete ID : ' + id);

    firebase
      .firestore()
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch(error => {
        console.error('error removing doc ' + error);
      });
  };

  render() {
    return (
      <div className='container'>
        <h4 className='heading-center'>Manage Users</h4>

        <div className='row'>
          <form onSubmit={this.onSubmit}>
            <input
              className='form-control'
              type='text'
              name='username'
              onChange={this.onChange}
              placeholder='User Name'
            />

            <input
              className='form-control'
              type='text'
              name='email'
              onChange={this.onChange}
              placeholder='Email'
            />

            <button type='submit' className='btn btn-primary'>
              {' '}
              Add User
            </button>
          </form>
        </div>

        <table className='table table-stripe'>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
              <th>Email</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map(user => (
              <tr>
                <td>{user.key}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <button
                    key={user.key}
                    className='btn btn-danger'
                    onClick={this.delete.bind(this, this.state.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
