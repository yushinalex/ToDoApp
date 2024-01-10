import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

function Footer({ toDo, onClear, filter, onFilter }) {
  const itemsLeft = () => {
    if (toDo === 1) {
      return `${toDo} item left`;
    }
    return `${toDo} items left`;
  };

  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft()}</span>
      <TasksFilter filter={filter} onFilter={onFilter} />
      <button type="button" className="clear-completed" onClick={() => onClear()}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  toDo: 0,
  onClear: () => {},
  filter: 'all',
  onFilter: () => {},
};

Footer.propTypes = {
  toDo: PropTypes.number,
  onClear: PropTypes.func,
  filter: PropTypes.string,
  onFilter: PropTypes.func,
};

export default Footer;
