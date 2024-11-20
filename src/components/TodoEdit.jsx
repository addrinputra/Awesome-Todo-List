import PropTypes from 'prop-types'

export default function TodoEdit(props) {
  const { saveEditTask, editTaskValue, setEditTaskValue, setEditTask, handleEditKeyDown, editInputRef} = props

  return (
    <div className='edit-overlay' onClick={() => setEditTask(null)}>
      <div className='edit-popup' onClick={(e) => e.stopPropagation()}>
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
            onKeyDown={handleEditKeyDown}
            ref={editInputRef}
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
  handleEditKeyDown: PropTypes.func.isRequired,
  editInputRef: PropTypes.func.isRequired,
}
