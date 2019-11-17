import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div class='container'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <h3 class='panel-title'>To Do LIST</h3>
          </div>
          <div class='panel-body'>
            <h4>
              <Link to='/create' class='btn btn-primary'>
                Add Board
              </Link>
            </h4>
            <table class='table table-stripe'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map(todo => (
                  <tr>
                    <td>
                      <Link to={`/show/${todo.key}`}>{todo.title}</Link>
                    </td>
                    <td>{todo.description}</td>
                    <td>
                      <button
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
      </div>
    );
  }
}

export default App;
