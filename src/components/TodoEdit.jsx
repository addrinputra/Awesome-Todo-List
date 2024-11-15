import PropTypes from 'prop-types'

export default function TodoEdit(props) {
  const { saveEditTask, editTaskValue, setEditTaskValue, setEditTask} = props

  return (
    <div className='edit-overlay' onClick={() => setEditTask(null)}>
      <div className='edit-popup'>
        <button className="close-button" onClick={() => {
          setEditTaskValue("")
          setEditTask(null)
        }}>
          &times;
        </button>
        <h2>Editing Task...</h2>
        <div className='edit-form'>
          <input 
            type="text" 
            value={editTaskValue}
            onChange={(e) => setEditTaskValue(e.target.value)}
          />
          <button 
            className='save-button' 
            onClick={(saveEditTask)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

TodoEdit.propTypes = {
  saveEditTask: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
  editTaskValue: PropTypes.string.isRequired,
  setEditTaskValue: PropTypes.func.isRequired,
}
