const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//Middleware
app.use(cors());
app.use(express.json());


//Routes

//Get all todos

//Create todos
app.post('/todos', async(req, res) => {
  try {
    const { description } = req.body;
    const todo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//Get one todo

//Update a todo

//Delete a todo

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

