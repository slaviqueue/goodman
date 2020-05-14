# helmet

When developing in homogeneus environment (using React and Nodejs for example),
the http communication layer may be unneded barier between front-end and backend.

Helmet intends to be lightweight tiny abstraction over this communication, making
full-stack javascript development almost seamless.

## How it works

Currently there is an adapter for express.js, but there's no problem to create one for any other backend js framework.

Controllers in our case will be just POJO's, which will be passed to `expressify` adapter and then the whole thing will return
an express route handler.

```javascript
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

```

On the client side we have a `consume` function. Being called with `baseUrl` and config it will return an object wrapped
in Proxy. Each method call of this object will be intercepted by proxy and a function will be returned. Observe:

```javascript
const api = consume('/todos/call', { http })

...

function addNewTodo () {
  api.addTodo(newTodo)
  setNewTodo('')
  fetchTodos()
}

...

```

