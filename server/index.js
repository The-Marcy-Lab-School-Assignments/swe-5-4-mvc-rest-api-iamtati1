const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// TODO: GET /api/todos
// Response: 200, array of all todos
const listTodos = (req, res) => {
  res.status(200).json(todos);
}

// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id
const findTodos = (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    res.status(404).json({ message: `Error: Not found ${req.originalUrl}` });
    return;
  }

  res.status(200).json(todo);
};

// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body

const createTodos = (req, res) => {
  const { task } = req.body;

  if (!task) {
    res.status(400).json({ message: 'Error: task is required' })
    return;
  }

  const newTodo = {
    id: getId(),
    task,
    isDone: false
  }

  todos.push(newTodo);

  res.status(201).json(newTodo);
}

// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id
const updateTodos = (req, res) => {
  const id = Number(req.params.id);
  const { isDone } = req.body;

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    res.status(404).json({ message: `Error: Not found ${req.originalUrl}` });
    return;
  }

  if (isDone === undefined) {
    res.status(400).json({ message: 'Error: isDone is required' });
    return;
  }

  todo.isDone = isDone;

  res.status(200).json(todo);
};


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id
const deleteTodos = (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(404).json({ message: `Error: Not found ${req.originalUrl}` });
    return;
  }

  todos.splice(index, 1);

  res.status(204).send();
};

app.get('/api/todos', listTodos);
app.get('/api/todos/:id', findTodos);
app.post('/api/todos', createTodos);
app.patch('/api/todos/:id', updateTodos);
app.delete('/api/todos/:id', deleteTodos);

// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)
app.use((req, res) => {
  res.status(404).send({ message: `Error: Not found ${req.originalUrl}` });
});

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
