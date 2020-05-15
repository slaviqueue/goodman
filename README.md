![logo](https://user-images.githubusercontent.com/20744231/80919762-8082cd00-8d74-11ea-9de3-e649d9a1da41.png)

When developing in homogeneus environment (using React and Nodejs for example),
the http communication layer may be unneded barier between front-end and backend.

Goodman intends to be lightweight tiny abstraction over this communication, making
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

function addNewTodo (newTodo) {
  api.addTodo(newTodo)
    .then(api.fetchTodos)
    .then(setTodos)

  setNewTodo('')
}

...

```

## Goodman vs good old http
```javascript
// goodman
function searchUserTodos (userId, query) {
  api.searchUserTodos(userId, query).then(setTodos)
}

// http
function searchUserTodos (userId, query) {
  axios.get(`/${userId}/todos?q=${query}`).then(setTodos)
}




// goodman
function createTodo (todo) {
  api.createTodo(todo)
}

// http
function createTodo (todo) {
  axios.post('/todos', todo)
}




// goodman
function getMe () {
  return authenticatedUser.getMe()
}

// http
function getMe () {
  return authenticatedApi.get('/users/me')
}
```

As you can see, when using goodman, you're just writing your code without need to think about such low-level transport stuff.
There's only one way to pass information to backend handlers – via procedure arguments. **Note that arguments must be serializable.**

The same stuff with backend:

```javascript
// goodman
class User {
  getUser (id) {
    return User.findById(id)
  }

  editUser (id, patch) {
    return User.findByIdAndUpdate(id, patch, { new: true })
  }
}

app.get('user/call/:method', expressify(new User))



// plain express

class User {
  async getUser (req, res) {
    const id = req.params
    const user = await User.findById(id)

    return res.json(user)
  }

  async editUser (req, res) {
    const id = req.params
    const patch = req.body

    const updatedUser = await User.findByIdAndUpdate(id, patch, { new: true })

    return res.json(updatedUser)
  }
}

const userController = new User()

app.get('users/:id', userController.getUser)
app.patch('users/:id', userController.editUser)
```


