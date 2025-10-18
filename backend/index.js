const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
let id = 1;

app.get('/', (req, res) => {
  res.send('Todo API is running 🚀');
});

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  
  const todo = { id: id++, task: req.body.task };
  todos.push(todo);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).send('Todo not found');
  todo.task = req.body.task;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.status(204).send();
});

// For Docker/local, use port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));