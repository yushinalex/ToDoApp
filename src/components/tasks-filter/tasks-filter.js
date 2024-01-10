import React, { Component } from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  static defaultProps = {
    filter: 'all',
    onFilter: () => {},
  };

  static propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func,
  };

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilter } = this.props;
    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = name === filter;
      const selected = isActive ? 'selected' : '';

      return (
        <li key={name}>
          <button type="button" onClick={() => onFilter(name)} className={selected}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}
