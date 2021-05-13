const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')

const path = require('path')

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env

const options = {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000,
}

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist/forum')))
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
