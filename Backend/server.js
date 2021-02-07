const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger.js');

const connection_url =
  'mongodb+srv://justastit92:Gc32jYS7qxKzv3g@cluster0.nkbaf.mongodb.net/youtubeDB?retryWrites=true&w=majority';

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('DB connected');
});

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.use((req, res, next) => {
  console.log(req.body);
  let oldSend = res.send;

  res.send = function (data) {
    console.log(data);
    oldSend.apply(res, arguments);
  };
  next();
});

//Listener
app.listen(port, () => {
  logger.error('info', `listening on localhost: ${port}`);
});
