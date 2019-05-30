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

  //GET at /api/posts:id/comments
  router.get('/:id/comments', async (req,res) => {
    const { id } = req.params;

    try {
        const comments = await Hubs.findPostComments(id);

        if (comments.length) {
            res.json(comments);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (err) {
        res.status(500).json({ error: "The comments information could not be retrieved." })
    }
});


  // POST at /api/posts

  router.post('/', async (req, res) => {
    const { title, contents } = req.body;
    try {
      if ( title && contents) {
        const post = await Posts.insert(req.body);
        res.status(201).json(post);
      } else {
        res.status(400).json({ error: "Please provide title and contents for the post." })
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database" ,
      });
    }
  });


  // POST at api/posts/:id/comments

  router.post('/:id/comments', async (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id };
    const { id } = reqs.params.id;
    const { text } = reqs.body;
    
    try {
      if (!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else if (!text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
      } else {
        const saved = await Posts.insertComment(commentInfo);
        res.status(201).json(saved);
      }
    } catch (err) {
        res.status(500).json({
            error: "There was an error while saving the comment to the database",
            err
        });
    }
});


  // PUT at api/posts/:id

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