const app = require('express')()
const { expressify } = require('goodman/server')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const makeId = () => number.toString(36).substr(2, 9)

class Todos {
  constructor () {
    this.todos = []
  }

  getTodos() {
    return this.todos
  }

  getTodoById(id) {
    return this.todos.find((todo) => id === todo.id)
  }

  addTodo(title) {
    this.todos.push({ id: makeId, title })
  }
}

app.post('/todos/call', expressify(new Todos))

app.listen(3001, () => console.log('app is ready'))
