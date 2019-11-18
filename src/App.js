import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from './config/firebase';
import { Link } from 'react-router-dom';

class App extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('todo');
    this.unsubscribe = null;
    this.state = {
      todos: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const todos = [];

    querySnapshot.forEach(doc => {
      const { title, description } = doc.data();
      todos.push({
        key: doc.id,
        doc,
        title,
        description
      });
    });

    this.setState({
      todos
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  delete(id) {
    firebase
      .firestore()
      .collection('todo')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    return (
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>To Do LIST</h3>
          </div>
          <div className='panel-body'>
            <h4>
              <Link to='/create' className='btn btn-primary'>
                Add Board
              </Link>
            </h4>
            <table className='table table-stripe'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map((todo, i) => (
                  <tr>
                    <td>
                      <Link to={`/show/${todo.key}`}>{todo.title}</Link>
                    </td>
                    <td>{todo.description}</td>
                    <td>
                      <h2>{i}</h2>
                      <button
                        key={i}
                        className='btn btn-danger'
                        onClick={this.delete.bind(this, todo.key)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className='container'>
          <Link to={'/users'} className='btn btn-success'>
            View Users
          </Link>{' '}
          <Link to={'/customers'} className='btn btn-success'>
            View Customers
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
