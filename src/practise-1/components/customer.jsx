import React, { Component } from 'react';
import firebase from './../../config/firebase';
import TableRow from './table-row';

class Customer extends Component {
  state = {};

  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('customers');
    this.unsubscribe = null;
    this.state = {
      customers: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const customers = [];

    querySnapshot.forEach(element => {
      const { name, company } = element.data();

      customers.push({ id: element.id, name, company });
    });

    if (customers.length === 0) {
      console.log('Customer collection is empty!!');
    }

    this.setState({
      customers
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, company } = this.state;

    this.ref
      .add({
        name,
        company
      })
      .then(() => {
        console.log('Success');
        this.setState({
          name: '',
          company: ''
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  onEdit = customer => {
    const { name, company } = customer;

    console.log(name);
    console.log(company);

    // document.getElementById('name').val(name);

    // this.setState({
    //   name: name,
    //   company: company
    // });
  };

  onDelete = id => {
    this.ref
      .doc(id)
      .delete()
      .then({})
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <div className='container'>
        <div className='container'>
          <h5>Customers List</h5>
        </div>

        <form action='' onSubmit={this.onSubmit} className='container'>
          <div className='form-group'>
            <input
              id='name'
              type='text'
              name='name'
              className='form-control'
              placeholder='Name'
              onChange={this.onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='text'
              name='company'
              className='form-control'
              placeholder='Company'
              onChange={this.onChange}
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>

        <div className='container'>
          <table className='table table-stripe'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Company</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {this.state.customers.map(customer => (
                <TableRow customer={customer} onDelete={this.onDelete} onEdit={this.onEdit} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Customer;
