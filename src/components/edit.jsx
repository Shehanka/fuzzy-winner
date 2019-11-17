import React, { Component } from 'react';
import firebase from './../config/firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: ''
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection('todo')
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const todo = doc.data();
        this.setState({
          key: doc.id,
          title: todo.title,
          description: todo.description
        });
      } else {
        console.log('No doc!');
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ todo: state });
  };

  render() {
    return (
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Edit To Do</h3>
          </div>

          <div className='panel-body'>
            <h4>
              <Link to={`/show/${this.state.key}`} className='btn btn-primary'>
                Todo List
              </Link>
            </h4>

            <form onSubmit={this.onSubmit}>
              <div class='form-group'>
                <label for='title'>Title:</label>
                <input
                  type='text'
                  class='form-control'
                  name='title'
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder='Title'
                />
              </div>
              <div class='form-group'>
                <label for='description'>Description:</label>
                <input
                  type='text'
                  class='form-control'
                  name='description'
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder='Description'
                />
              </div>

              <button type='submit' class='btn btn-success'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
