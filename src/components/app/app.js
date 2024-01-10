import React, { Component } from 'react';

import Header from '../header';
import Footer from '../footer';
import TaskList from '../task-list';

import './app.css';

export default class App extends Component {
  newId = 1;

  state = {
    toDoData: [this.createItem('Completed task'), this.createItem('Editing task'), this.createItem('Active task')],
    filterStatus: 'all',
  };

  createItem(label) {
    return {
      label,
      time: Date.now(),
      status: 'active',
      id: this.newId++,
    };
  }

  toggleStatus = (id) => {
    this.setState(({ toDoData }) => {
      const index = toDoData.findIndex((item) => item.id === id);
      const task = toDoData[index];
      let newTask = { ...task };
      if (task.status === 'active') {
        newTask = { ...task, status: 'completed' };
      }
      if (task.status === 'completed') {
        newTask = { ...task, status: 'active' };
      }
      const newArray = [...toDoData.slice(0, index), newTask, ...toDoData.slice(index + 1)];

      return {
        toDoData: newArray,
      };
    });
  };

  deleteItem = (id) => {
    const { toDoData } = this.state;
    const index = toDoData.findIndex((item) => item.id === id);
    const newArray = [...toDoData.slice(0, index), ...toDoData.slice(index + 1)];

    this.setState(() => ({
      toDoData: newArray,
    }));
  };

  addItem = (text) => {
    if (!text) {
      return;
    }

    const newTask = this.createItem(text);

    this.setState(({ toDoData }) => {
      const newArray = [...toDoData, newTask];

      return {
        toDoData: newArray,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ toDoData }) => {
      const newArray = toDoData.filter((item) => item.status !== 'completed');

      return {
        toDoData: newArray,
      };
    });
  };

  filterItems(arr, status) {
    if (status === 'all') {
      return arr;
    }
    if (status === 'active') {
      return arr.filter((item) => item.status === 'active');
    }
    if (status === 'completed') {
      return arr.filter((item) => item.status === 'completed');
    }
  }

  filterItemsStatus = (status) => {
    this.setState({
      filterStatus: status,
    });
  };

  editStatus = (id) => {
    this.setState(({ toDoData }) => {
      const index = toDoData.findIndex((item) => item.id === id);
      const task = toDoData[index];
      const newTask = { ...task, status: 'editing' };
      const newArray = [...toDoData.slice(0, index), newTask, ...toDoData.slice(index + 1)];

      return {
        toDoData: newArray,
      };
    });
  };

  editItem = (id, text) => {
    if (!text) {
      return;
    }

    this.setState(({ toDoData }) => {
      const index = toDoData.findIndex((item) => item.id === id);
      const task = toDoData[index];
      const newTask = { ...task, label: text, status: 'active' };
      const newArray = [...toDoData.slice(0, index), newTask, ...toDoData.slice(index + 1)];

      return {
        toDoData: newArray,
      };
    });
  };

  render() {
    const { toDoData, filterStatus } = this.state;
    const toDoCount = toDoData.filter((item) => item.status !== 'completed').length;

    const visibleItems = this.filterItems(toDoData, filterStatus);

    return (
      <section className="todoapp">
        <Header onAdd={this.addItem} />
        <section className="main">
          <TaskList
            toDoArray={visibleItems}
            onDeleted={this.deleteItem}
            onToggleStatus={this.toggleStatus}
            editStatus={this.editStatus}
            onEdit={this.editItem}
          />
          <Footer
            toDo={toDoCount}
            onClear={this.clearCompleted}
            filter={filterStatus}
            onFilter={this.filterItemsStatus}
          />
        </section>
      </section>
    );
  }
}
