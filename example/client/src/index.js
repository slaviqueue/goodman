import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { consume } from 'helmet/client'

const api = consume('http://localhost:3001/api/call', { http: axios })

function App() {
  const [todos, setTodos] = useState([])

  function fetchTodos() {
    return api.getTodos().then(setTodos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (!todos) {
    return 'loading'
  }

  return todos.map((todo) => todo.title)
}

ReactDOM.render(<App />, document.getElementById("root"))
