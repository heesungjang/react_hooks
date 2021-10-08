// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useStateSyncLocalStorage(
  key,
  defaultValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const getLocalValue = () => {
    return window.localStorage.getItem('name') || defaultValue
  }

  const [state, setState] = React.useState(() => {
    const localStorageValue = getLocalValue()
    if (localStorageValue) {
      return JSON.parse(localStorageValue)
    } else {
      return defaultValue
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem('name', serialize(state))
  }, [key, state, serialize])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useStateSyncLocalStorage('name', initialName)
  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
