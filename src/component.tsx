'use client'
import { useState } from 'react'

const Component = () => {
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <h1>Hello World</h1>
      <h2>Counter: {counter}</h2>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  )
}

export default Component