import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { consume } from 'helmet/client'

const http = {
  post: (...args) => axios.post(...args).then(({ data }) => data)
}

const api = consume('/todos/call', { http })

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  function fetchTodos () {
    api.getTodos().then(setTodos)
  }

  function addNewTodo () {
    api.addTodo(newTodo)
    setNewTodo('')
    fetchTodos()
  }

  function updateNewTodo ({ target: { value } }) {
    setNewTodo(value)
  }

  useEffect(() => fetchTodos(), [])

  if (!todos) {
    return 'loading'
  }

  return (
    <div>
      <ul>
        {todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>

      <input value={newTodo} onChange={updateNewTodo} />
      <button onClick={addNewTodo}>Add todo</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
