import React, { Component } from 'react';

class TableRow extends Component {
  state = {};
  render() {
    return (
      <tr>
        <td>{this.props.customer.id}</td>
        <td>{this.props.customer.name}</td>
        <td>{this.props.customer.company}</td>
        <td>
          <button className='btn btn-danger' onClick={this.props.onDelete}>
            {' X '}
          </button>{' '}
          <button
            className='btn btn-success'
            onClick={this.props.onEdit.bind(this.props, this.props.customer)}
          >
            {' Edit'}
          </button>
        </td>
      </tr>
    );
  }
}

export default TableRow;
