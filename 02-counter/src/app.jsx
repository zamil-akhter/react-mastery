import { useState } from "react"

export function App() {

  let [counter, setCounter] = useState(0);

  const addValue = () => {
    setCounter(counter + 1)
  }

  const removeValue = () => {
    if (counter !== 0) {
      setCounter(counter - 1)
    }
  }
  return (
    <>
      <h2>Counter App</h2>
      <hr />
      <h4>Current value : {counter} </h4>
      <br />
      <button onClick={addValue} >Increase</button>
      <button onClick={removeValue} >Decrease</button>
    </> 
  )
}
