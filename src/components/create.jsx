import React, { Component } from 'react';
import firebase from './../config/firebase';

class Create extends Component {
  state = {};

  constructor() {
    super();
    this.ref = firebase.firestore().collection('todo');
    this.state = {
      todo: ''
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    return (
      <div className='container'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Add ToDo</h3>
          </div>

          <div className='panel-body'></div>
        </div>
      </div>
    );
  }
}

export default Create;
