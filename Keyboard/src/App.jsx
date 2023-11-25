import React, { useState } from 'react'
import './App.css'
import Keyboard from './components/Keyboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Is this really change</h1>
        <Keyboard />
      </div>
        
    </>
  )
}

export default App
