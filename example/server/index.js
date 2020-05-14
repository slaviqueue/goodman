const app = require('express')()
const { expressify } = require('helmet/server')

const todos = [
  { id: 1, title: 'sit on a couch' },
  { id: 2, title: 'sit on casting couch' }
]

const api = {
  getTodos() {
    return todos
  },
  getTodoById(id) {
    return todos.find((todo) => id === todo.id)
  }
}

app.post('/api/call', expressify(api))

app.listen(3001, () => console.log('app is ready'))
