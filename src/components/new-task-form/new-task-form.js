/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  static defaultProps = {
    onAdd: () => {},
  };

  static propTypes = {
    onAdd: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    });
  };

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.label, this.state.min, this.state.sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          onChange={this.onLabelChange}
          value={this.state.label}
          type="text"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          required
          onChange={this.onMinChange}
          value={this.state.min}
          type="number"
          min="0"
          max="59"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          required
          onChange={this.onSecChange}
          value={this.state.sec}
          type="number"
          min="0"
          max="59"
        />
        <button type="submit" className="new-todo-form__button" />
      </form>
    );
  }
}
