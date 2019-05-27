const express = require('express');

const Posts = require('../data/db.js');

const router = express.Router();

// GET at /api/posts

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving the posts'
        });
    }
});

// GET by ID at /api/posts/:id

router.get('/:id', async (req, res) => {
    try {
      const post = await Posts.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    }
  });

  // POST at /api/posts

  router.post('/', async (req, res) => {
    try {
      const post = await Posts.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    }
  });

  // PUT 

  router.put('/:id', async (req, res) => {
    try {
      const hub = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    }
  });

  // DELETE at /api/posts

  router.delete('/:id', async (req, res) => {
    try {
      const count = await Posts.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The post has been deleted' });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed",
      });
    }
  });



module.exports = router;