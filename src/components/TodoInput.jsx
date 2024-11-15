import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';

export const TodoInput = (props) => {

  const { newTask, addTasks, handleInputChange } = props;

  const inputRef = useRef(null);
  const [totalCount, setTotalCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(50);

  // const inputEl = document.getElementById('inputElement');
  // const totalCounterEl = document.getElementById('total-counter');
  // const remainingCounterEl = document.getElementById('remaining-counter');

  // inputEl.addEventListener('keyup', () => {
  //   updateCounter()
  // })

  // updateCounter()

  // function updateCounter() {
  //   totalCounterEl.innerText = inputEl.value.length; 
  //   remainingCounterEl.innerText = inputEl.getAttribute('maxLength') - inputEl.value.length
  // }

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
  newTask: PropTypes.string,
  addTasks: PropTypes.func,
  handleInputChange: PropTypes.func,
}
