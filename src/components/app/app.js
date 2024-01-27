import React, { useRef, useState } from 'react';

import Header from '../header';
import Footer from '../footer';
import TaskList from '../task-list';

import './app.css';

function App() {
  const newId = useRef(1);
  const timers = useRef({});

  function createItem(label, timeLeft) {
    return {
      label,
      time: Date.now(),
      status: 'active',
      id: newId.current++,
      timeLeft,
    };
  }

  const [toDoData, setToDoData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleStatus = (id) => {
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
    setToDoData(newArray);
  };

  const deleteItem = (id) => {
    const index = toDoData.findIndex((item) => item.id === id);
    const newArray = [...toDoData.slice(0, index), ...toDoData.slice(index + 1)];
    setToDoData(newArray);
  };

  const addItem = (text, min, sec) => {
    if (!text) {
      return;
    }
    const timeLeft = Number(min) * 60 + Number(sec);
    const newTask = createItem(text, timeLeft);
    const newArray = [...toDoData, newTask];
    setToDoData(newArray);
  };

  const clearCompleted = () => {
    const newArray = toDoData.filter((item) => item.status !== 'completed');
    setToDoData(newArray);
  };

  const filterItems = (arr, status) => {
    if (status === 'all') {
      return arr;
    }
    if (status === 'active') {
      return arr.filter((item) => item.status === 'active');
    }
    if (status === 'completed') {
      return arr.filter((item) => item.status === 'completed');
    }
    return arr;
  };

  const filterItemsStatus = (status) => {
    setFilterStatus(status);
  };

  const editStatus = (id) => {
    const index = toDoData.findIndex((item) => item.id === id);
    const task = toDoData[index];
    const newTask = { ...task, status: 'editing' };
    const newArray = [...toDoData.slice(0, index), newTask, ...toDoData.slice(index + 1)];
    setToDoData(newArray);
  };

  const editItem = (id, text) => {
    if (!text) {
      return;
    }
    const index = toDoData.findIndex((item) => item.id === id);
    const task = toDoData[index];
    const newTask = { ...task, label: text, status: 'active' };
    const newArray = [...toDoData.slice(0, index), newTask, ...toDoData.slice(index + 1)];
    setToDoData(newArray);
  };

  const runTimer = (id) => {
    const idx = toDoData.findIndex((item) => item.id === id);
    const tsk = toDoData[idx];
    if (!tsk.timeLeft) {
      return;
    }
    if (!timers.current[id]) {
      timers.current[id] = setInterval(() => {
        setToDoData((state) => {
          const index = state.findIndex((item) => item.id === id);
          const task = state[index];
          if (index === -1) {
            clearInterval(timers.current[id]);
            return state;
          }
          const timeLeft = task.timeLeft - 1;
          if (!timeLeft) {
            clearInterval(timers.current[id]);
          }
          const newTask = { ...task, timeLeft };
          const newArray = [...state.slice(0, index), newTask, ...state.slice(index + 1)];
          return newArray;
        });
      }, 1000);
    }
  };

  const stopTimer = (id) => {
    clearInterval(timers.current[id]);
    timers.current[id] = null;
  };

  const toDoCount = toDoData.filter((item) => item.status !== 'completed').length;

  const visibleItems = filterItems(toDoData, filterStatus);

  return (
    <section className="todoapp">
      <Header onAdd={addItem} />
      <section className="main">
        <TaskList
          toDoArray={visibleItems}
          onDeleted={deleteItem}
          onToggleStatus={toggleStatus}
          editStatus={editStatus}
          onEdit={editItem}
          runTimer={runTimer}
          stopTimer={stopTimer}
        />
        <Footer toDo={toDoCount} onClear={clearCompleted} filter={filterStatus} onFilter={filterItemsStatus} />
      </section>
    </section>
  );
}

export default App;
