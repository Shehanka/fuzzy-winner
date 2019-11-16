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

  render() {
    return (
      <div class='container'>
        <div class='panel panel-default'>
          <div class='panel-heading'>
            <h3 class='panel-title'>BOARD LIST</h3>
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
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board => (
                  <tr>
                    <td>
                      <Link to={`/show/${board.key}`}>{board.title}</Link>
                    </td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
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
