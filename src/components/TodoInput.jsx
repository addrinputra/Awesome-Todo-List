import PropTypes from 'prop-types'

export const TodoInput = (props) => {

  const { newTask, addTasks, handleInputChange } = props;

  return (
    <div>
      <input 
        type="text" 
        placeholder="Add a new task..." 
        onChange={handleInputChange} 
        value={newTask} 
      />
      <button onClick={addTasks}>
        Add
      </button>
    </div>
  )
}

TodoInput.propTypes = {
  newTask: PropTypes.string,
  addTasks: PropTypes.func,
  handleInputChange: PropTypes.func,
}
