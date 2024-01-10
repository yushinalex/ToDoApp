import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task';

import './tasks-list.css';

function TaskList({ toDoArray, onDeleted, onToggleStatus, editStatus, onEdit }) {
  const elements = toDoArray.map((item) => {
    const { id, ...props } = item;
    return (
      <Task
        {...props}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleStatus={() => onToggleStatus(id)}
        editStatus={() => editStatus(id)}
        onEdit={(text) => onEdit(id, text)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  toDoArray: [{}],
  onDeleted: () => {},
  onToggleStatus: () => {},
  editStatus: () => {},
  onEdit: () => {},
};

TaskList.propTypes = {
  toDoArray: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleStatus: PropTypes.func,
  editStatus: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TaskList;
