const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(cors());
app.use(express.json());


app.listen(4000, () => {
  console.log('Listening on port 4000');
});

