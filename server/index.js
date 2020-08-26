const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//Middleware
app.use(cors());
app.use(express.json());

//Router param
app.param('id', async(req, res, next, id) => {
  try {
    const todo = await pool.query(
      `SELECT * FROM todo WHERE id = ${id}`
    );
    // console.log(todo);
    if (todo.rows.length > 0) {
      req.todo = todo.rows[0];
      next();
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error.message);
  }
});


//Routes

//Get all todos
app.get('/todos', async(req, res) => {
  try {
    const todoList = await pool.query(
      'SELECT * FROM todo'
    );
    res.json(todoList.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//Create todos
app.post('/todos', async(req, res) => {
  try {
    const { description } = req.body;
    const todo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Get one todo
app.get('/todos/:id', async(req, res) => {
  res.json(req.todo);
});

//Update a todo
app.put('/todos/:id', async(req, res) => {
  try {
    const update = await pool.query(
      "UPDATE todo SET description = $1 WHERE id = $2 RETURNING *",
      [req.body.description, req.params.id]
    );
    res.json(update.rows[0]);
  } catch (error) {
    console.error(error.message)
  }
});

//Delete a todo
app.delete('/todos/:id', async(req, res) => {
  try {
    await pool.query(
      "DELETE FROM todo WHERE id = $1",
      [req.params.id]
    );
    res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

