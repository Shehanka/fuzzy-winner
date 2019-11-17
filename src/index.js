import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Create from './components/create';
import Edit from './components/edit';
import View from './components/view';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/users/users-list';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
      <Route exact path='/create' component={Create} />
      <Route exact path='/edit:id' component={Edit} />
      <Route exact path='/view:id' component={View} />
      <Route exact path='/users' component={Users} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
