const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
const cors = require('cors');
const routes = require('./routes/routes')

const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors());

app.get(('/'), (req, res) => {
    res.send('Node js is Running')
})

app.use('/api/v1', routes)

//server
app.listen((port), (err) => {
    if (err) throw err
    console.log(`Server up and running on port ${port}`)
})

//mongoose connection
mongoose.connect(process.env.MONGO_URL, (err) => {
    if (err) throw err
    console.log('Database Connected')
})
