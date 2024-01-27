/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

function NewTaskForm(props) {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    setSec(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.onAdd(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        required
        onChange={onLabelChange}
        value={label}
        type="text"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        required
        onChange={onMinChange}
        value={min}
        type="number"
        min="0"
        max="59"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        required
        onChange={onSecChange}
        value={sec}
        type="number"
        min="0"
        max="59"
      />
      <button type="submit" className="new-todo-form__button" />
    </form>
  );
}

export default NewTaskForm;

NewTaskForm.defaultProps = {
  onAdd: () => {},
};

NewTaskForm.propTypes = {
  onAdd: PropTypes.func,
};
