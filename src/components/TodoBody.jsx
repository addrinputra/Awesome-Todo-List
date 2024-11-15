import PropTypes from 'prop-types'

export default function TodoBody(props) {
  const { tasks, checkedTask, handleEditTask, deleteTask } = props;

  return (
    <section className='tasksBody'>
        {tasks.map((taskList, index) => {
          return(
            <div key={index} className='taskList'>
              <input 
                type="checkbox" 
                checked={taskList.checked} 
                onChange={(event) => checkedTask(event, index)}
              />
              <span className='taskName'>{taskList.name}</span>
              <button onClick={() => handleEditTask(index)} className='editButton'>
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                className='deleteButton'
              >
                Delete
              </button>
            </div>
          )
        })}
      </section>
  )
}

TodoBody.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
    })
  ).isRequired,
  checkedTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleEditTask: PropTypes.func.isRequired,
}