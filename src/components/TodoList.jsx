import { useEffect, useRef, useState } from "react"
import { TodoInput } from "./TodoInput"
import { FaPlus } from 'react-icons/fa'
import TodoBody from "./TodoBody"
import TodoEdit from "./TodoEdit"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const TodoList = () => {

  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [editTask, setEditTask] = useState(null)
  const [editTaskValue, setEditTaskValue] = useState('')

  const [totalCount, setTotalCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(50);

  const inputRef = useRef(null);
  const editInputRef = useRef(null)
  
  const [isClicked, setIsClicked] = useState(false)

  // When the No Task container get clicked, it will directed to the input
  function focusInput() {
    inputRef.current?.focus();
    setIsClicked(true)
    setTimeout(() => {
      setIsClicked(false)
    }, 100);
  }

  // Manage checked sorting list
  useEffect(() => {
    function sortTasks(tasks) {
      return tasks.sort((a, b) => {
        if (a.checked - b.checked) {
          return a.checked - b.checked;
        }
      })
    }

    const sortedTasks = sortTasks([...tasks]);
    // Only update state if sorted tasks are changing
    if (JSON.stringify(tasks) !== JSON.stringify(sortedTasks)) {
      setTasks(sortedTasks);
    }
  }, [tasks]);

  // To get the task from localStorage
  useEffect(() => {
    const localTasks = localStorage.getItem('tasks');
    if (localTasks) {
      const parsedTasks = JSON.parse(localTasks);
      setTasks(parsedTasks);
    }
  }, [])

  // To save the task to localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks])

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
      setTotalCount(0)
      setRemainingCount(50)
      toast.success('Task added successfully')
    } else {
      toast.warning('You need to add something first!')
    }
  }

  function handleEditTask(index) {
    setEditTask(index);
    setEditTaskValue(tasks[index].name);
    setTimeout(() => {
      editInputRef.current.focus();
    }, 0);
  }

  function saveEditTask() {
    const updatedTask = [...tasks];
    updatedTask[editTask].name = editTaskValue;
    setTasks(updatedTask);
    setEditTask(null)
    setEditTaskValue('')
    toast.success('Task updated')
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    if (updatedTasks.indexOf(0)) {
      localStorage.clear()
    }
    setTasks(updatedTasks)
    toast.error('Task deleted successfully')
  }

  function handleEditKeyDown(event) {
    if (event.key === 'Enter') {
      saveEditTask();
    }
  }

  return (
    <>
      <ToastContainer />
      <header>
        <h1>My Todo List</h1>
        <TodoInput
          newTask={newTask} 
          addTasks={addTasks}
          handleInputChange={handleInputChange}
          totalCount={totalCount}
          setTotalCount={setTotalCount}
          remainingCount={remainingCount}
          setRemainingCount={setRemainingCount}
          inputRef={inputRef}
        />
      </header>
      {tasks.length !== 0 ? (
        <TodoBody 
          tasks={tasks} 
          checkedTask={checkedTask} 
          handleEditTask={handleEditTask}
          deleteTask={deleteTask}
        />
      ) : (
        <section className="no-task-section">
          <div className="no-task">
            <h1>You don&apos;t have a task yet</h1>
            <div 
              className={`no-task-prompt ${isClicked ? 'clicked' : ''}`} 
              onClick={focusInput}
            >
              <FaPlus className="plus-icon"/>
            </div>
          </div>
        </section>
      )}
      {editTask !== null && (
        <TodoEdit 
          setEditTask={setEditTask}
          editTaskValue={editTaskValue}
          setEditTaskValue={setEditTaskValue}
          saveEditTask={saveEditTask}
          handleEditKeyDown={handleEditKeyDown}
          editInputRef={editInputRef}
        />
      )}
    </>
  )
}
