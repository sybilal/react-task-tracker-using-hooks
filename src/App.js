import { useState, useEffect } from 'react';
import AddTask from './components/AddTask';
import Header from './components/Header'
import Tasks from './components/Tasks'

const defaultTasks = [
  {
    id: 1,
    text: 'Haircut',
    day: '2020-12-02T04:17:04',
    reminder: false
  },
];

function App() {

  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  }
  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter(elm => elm.id !== id));
  }

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);

    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updTask)
      }
    );

    const data = await res.json();


    setTasks(tasks.map(elm =>
      elm.id === id ? { ...elm, reminder: data.reminder } : elm
    ));
  }

  return (
    <div className="container">
      <Header
        toggleAddTask={toggleAddTask}
        title="Task Tracker"
        showAddTask={showAddTask}
      />
      {showAddTask ? (<AddTask onAdd={addTask} />) : ''}
      {tasks.length > 0 ?
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'Congrats!, You are done for the day'}
    </div >
  );
}

export default App;
