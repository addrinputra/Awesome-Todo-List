import PropTypes from 'prop-types'
import { useEffect, } from 'react';

export const TodoInput = (props) => {

  const { 
    newTask, 
    addTasks, 
    handleInputChange, 
    totalCount, 
    setTotalCount,
    remainingCount,
    setRemainingCount,
    inputRef
  } = props;

  // Update counter whenever input changes
  function updateCounter() {
    const inputValue = inputRef.current.value;
    const maxLength = inputRef.current.maxLength;
    setTotalCount(inputValue.length);
    setRemainingCount(maxLength - inputValue.length)
  }

  // Attach evebt listener to the input field
  useEffect(() => {
    const inputElement = inputRef.current;
    inputElement.addEventListener('keyup', updateCounter)

    // Cleanup listener when component unmounts
    return () => {
      inputElement.removeEventListener('keyup', updateCounter);
    }
  }, [])

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTasks();
    }
  }

  return (
    <>
      <div className='inputList'>
        <input 
          type="text" 
          placeholder="Add a new task..." 
          onChange={(e) => {
            handleInputChange(e);
            updateCounter();
          }} 
          onKeyDown={handleKeyDown}
          value={newTask} 
          maxLength={50}
          ref={inputRef}
        />
        <button onClick={addTasks}>
          Add
        </button>
      </div>
      <div className="counter-container">
      <p>Total Characters: 
        <span className="total-counter">{totalCount}</span>
      </p>
      <p>Remaining: 
        <span className="remaining-counter">{remainingCount}</span>
      </p>
    </div>
  </>
  )
}

TodoInput.propTypes = {
  newTask: PropTypes.string.isRequired,
  addTasks: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  setTotalCount: PropTypes.func.isRequired,
  remainingCount: PropTypes.number.isRequired,
  setRemainingCount: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
}
