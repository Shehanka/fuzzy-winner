import React, { Component } from 'react';
import firebase from './../config/firebase';
import { Link } from 'react-router-dom';

class Create extends Component {
  state = {};

  constructor() {
    super();
    this.ref = firebase.firestore().collection('todo');
    this.state = {
      title: '',
      description: ''
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description } = this.state;

    this.ref
      .add({
        title,
        description
      })
      .then(docRef => {
        this.setState({
          title: '',
          description: ''
        });
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    return (
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Add ToDo</h3>
          </div>

          <div className='panel-body'>
            <h4>
              <Link to='/' className='btn btn-primary'>
                Book List
              </Link>
            </h4>

            <form onSubmit={this.onSubmit}>
              <div class='form-group'>
                <label for='title'>Title:</label>
                <input
                  type='text'
                  class='form-control'
                  name='title'
                  value={this.title}
                  onChange={this.onChange}
                  placeholder='Title'
                />
              </div>
              <div class='form-group'>
                <label for='description'>Description:</label>
                <textArea
                  class='form-control'
                  name='description'
                  onChange={this.onChange}
                  placeholder='Description'
                  cols='80'
                  rows='3'
                >
                  {this.description}
                </textArea>
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

export default Create;
