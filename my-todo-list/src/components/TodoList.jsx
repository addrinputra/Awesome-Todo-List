import { useState } from "react"
import { TodoInput } from "./TodoInput"
import TodoBody from "./TodoBody"
import TodoEdit from "./TodoEdit"

export const TodoList = () => {

  const [tasks, setTasks] = useState([
    {name: 'Meditate', checked: false},
    {name: 'Exercise', checked: false},
    {name: 'Learn Coding', checked: false},
  ])
  const [newTask, setNewTask] = useState('')
  const [editTask, setEditTask] = useState(null)
  const [editTaskValue, setEditTaskValue] = useState('')

  function handleInputChange(event) {
    setNewTask(event.target.value)
  }

  function checkedTask(event, index) {
    const updatedTask = [...tasks];
    updatedTask[index].checked = event.target.checked;
    setTasks(updatedTask)
  }

  function addTasks() {
    if (newTask.trim() !== '') {
      setTasks(t => [...t, {name: newTask, checked: false}]);
      setNewTask('');
    } else {
      alert('You need to add something first!')
    }
  }

  function handleEditTask(index) {
    setEditTask(index);
    setEditTaskValue(tasks[index].name);
  }

  function saveEditTask() {
    const updatedTask = [...tasks];
    updatedTask[editTask].name = editTaskValue;
    setTasks(updatedTask);
    setEditTask(null)
    setEditTaskValue('')
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks)
  }

  return (
    <>
      <header>
        <h1>Your Todo List</h1>
        <TodoInput
          newTask={newTask} 
          addTasks={addTasks}
          handleInputChange={handleInputChange}
        />
      </header>
      <TodoBody 
        tasks={tasks} 
        checkedTask={checkedTask} 
        handleEditTask={handleEditTask}
        deleteTask={deleteTask}
      />
      
      {editTask !== null && (
        <TodoEdit 
          editTaskValue={editTaskValue}
          setEditTaskValue={setEditTaskValue}
          saveEditTask={saveEditTask}
        />
      )}
    </>
  )
}
