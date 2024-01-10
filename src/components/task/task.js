import React, { Component } from 'react';
import './task.css';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  state = {
    label: this.props.label,
  };

  static defaultProps = {
    label: 'something to be done',
    time: Date.now(),
    status: 'active',
    onDeleted: () => {},
    onToggleStatus: () => {},
    editStatus: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    time: PropTypes.number,
    status: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleStatus: PropTypes.func,
    editStatus: PropTypes.func,
    onEdit: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state.label);
  };

  render() {
    const { label, time, onDeleted, onToggleStatus, status, editStatus } = this.props;
    const isChecked = status === 'completed';

    return (
      <li className={status}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleStatus} id={label} checked={isChecked} />
          <label htmlFor={label}>
            <span className="description">{label}</span>
            <span className="created">{`created ${formatDistanceToNow(time, { includeSeconds: true })} ago`}</span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={editStatus} />
          <button type="button" aria-label="delete" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onLabelChange} type="text" className="edit" defaultValue={label} />
        </form>
      </li>
    );
  }
}
