
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useEffect, useState } from 'react'

function App() {
  const [name, setName] = useState("")

  useEffect(
    ()=>{
      console.log("name is" + name)
    }, [name]
  )
  return (
    <>
      <input
      type='text'
      value={name}
      onChange={e=>setName(e.target.value)}>
      </input>
      <div>Hello, {name}</div>
    </>
  )
}

export default App
