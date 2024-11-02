import { useState } from "react"
import { TodoInput } from "./TodoInput"
import TodoBody from "./TodoBody"

export const TodoList = () => {

  const [tasks, setTasks] = useState([
    {name: 'Meditate', checked: false},
    {name: 'Exercise', checked: false},
    {name: 'Learn Coding', checked: false},
  ])
  const [newTask, setNewTask] = useState('')

  function handleInputChange(event) {
    setNewTask(event.target.value)
  }

  function addTasks() {
    if (newTask.trim() !== '') {
      setTasks(t => [...t, {name: newTask, checked: false}]);
      setNewTask('');
    } else {
      alert('You need to add something first!')
    }
  }

  function checkedTask(event, index) {
    const updatedTask = [...tasks];
    updatedTask[index].checked = event.target.checked;
    setTasks(updatedTask)
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
      <TodoBody tasks={tasks} checkedTask={checkedTask} />
    </>
  )
}
