/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import './task.css';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

function Task(props) {
  const { label, time, onDeleted, onToggleStatus, status, editStatus, onEdit, timeLeft, runTimer, stopTimer } = props;

  const [task, setTask] = useState(label);

  const onLabelChange = (e) => {
    setTask(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onEdit(task);
  };

  const isChecked = status === 'completed';

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');

  const seconds = (timeLeft - minutes * 60).toString().padStart(2, '0');

  return (
    <li className={status}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleStatus} id={label} checked={isChecked} />
        <label htmlFor={label}>
          <span className="tittle">{label}</span>
          <span className="description">
            <button type="submit" onClick={runTimer} className="icon icon-play" />
            <button type="submit" onClick={stopTimer} className="icon icon-pause" />
            <span className="time-left">
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </span>
          </span>
          <span className="description time-created">{`created ${formatDistanceToNow(time, {
            includeSeconds: true,
          })} ago`}</span>
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={editStatus} />
        <button type="button" aria-label="delete" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={onSubmit}>
        <input onChange={onLabelChange} type="text" className="edit" defaultValue={label} />
      </form>
    </li>
  );
}

export default Task;

Task.defaultProps = {
  label: 'something to be done',
  time: Date.now(),
  status: 'active',
  onDeleted: () => {},
  onToggleStatus: () => {},
  editStatus: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  label: PropTypes.string,
  time: PropTypes.number,
  status: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleStatus: PropTypes.func,
  editStatus: PropTypes.func,
  onEdit: PropTypes.func,
};
