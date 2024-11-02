import PropTypes from 'prop-types'

export default function TodoEdit(props) {
  const { saveEditTask, editTaskValue, setEditTaskValue} = props

  return (
    <div>
      <h2>Editing Task...</h2>
      <div>
        <input 
          type="text" 
          value={editTaskValue}
          onChange={(e) => setEditTaskValue(e.target.value)}
        />
        <button onClick={(saveEditTask)}>Save</button>
      </div>
    </div>
  )
}

TodoEdit.propTypes = {
  saveEditTask: PropTypes.func.isRequired,
  editTaskValue: PropTypes.string.isRequired,
  setEditTaskValue: PropTypes.func.isRequired,
}
