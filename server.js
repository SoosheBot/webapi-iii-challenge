const express = require('express');

// const helmet = require('helmet');
// const morgan = require('morgan')

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
