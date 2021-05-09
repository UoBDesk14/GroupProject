const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

const path = require('path')

const {
  MONGO_USERNAME = 'admin',
  MONGO_PASSWORD = 'ljq50195019',
  MONGO_HOSTNAME = 'localhost',
  MONGO_PORT = 27018,
  MONGO_DB = 'forum'
} = process.env

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

/*init an express middleware*/
const app = express()

/*use cors to allow cross origin resource*/
app.use(cors())

/*use json bodyparser to parse url req.body to json*/
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.static(path.join(__dirname, '../../dist/demosite')))
// Catch all other routes and return the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})


/*connect to mongoDb*/
mongoose.connect(url, options)
  .then(connection => {
    console.log('Rest Api has successfully connected to mongoDb Database')
  })
  .catch(err => {
    console.log('Failed to connect to mongoDb')
  })


app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
module.exports = app
