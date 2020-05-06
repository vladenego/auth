const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
require('dotenv').config()



// IMPORT ROUTE
  const authRoute = require('./routes/auth')

// CONNECTION TO DATABASE
  const dbPath = process.env.DB_CONNECTION;
  mongoose.connect(dbPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", () => {
      console.log("> error occurred from the database");
  });
  db.once("open", () => {
      console.log("> successfully opened the database");
  });

// MIDDLEWARE
app.use(express.json())

// ROUTE MIDDLEWARE
app.use('/api/user', authRoute)

app.listen(port)
