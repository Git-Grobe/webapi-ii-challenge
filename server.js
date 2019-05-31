const express = require('express');
const helmet = require('helmet');

const PostsRouter = require('./post/post-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/api/posts', PostsRouter);


server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API!</h2>
    <p>Welcome to the Lambda Posts API</p>
  `);
});

module.exports = server;