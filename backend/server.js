const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const routes = require('./routes');
app.use(express.json())
app.use(cors())
const server = http.createServer(app)
app.use('/', routes);

server.listen(5000,()=>{
  console.log('server connected')
})

