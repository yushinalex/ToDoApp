import React from 'react';
import PropTypes from 'prop-types';

import NewTaskForm from '../new-task-form';
import './header.css';

function Header({ onAdd }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskForm onAdd={onAdd} />
    </header>
  );
}

Header.defaultProps = {
  onAdd: () => {},
};

Header.propTypes = {
  onAdd: PropTypes.func,
};

export default Header;
