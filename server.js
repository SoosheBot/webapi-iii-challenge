const express = require('express');
const server = express();
const helmet = require('helmet');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

server.use(express.json());
server.use(helmet());
server.use(logger);

server.use('./api.users', userRouter);
server.use('./api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
