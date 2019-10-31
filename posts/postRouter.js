const express = require("express");

const Post = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  Post.get(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log("An error, alas!", error);
      res.status(500).json({ message: "Error retrieving post." });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.getById(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hub"
      });
    });
});

router.post('/', (req,res) => {
    Post.insert(post => {
        res.status(201).json(post);
    })
    .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error adding the post sryyyyyy.'
        });
      });
});
router.delete("/:id", (req, res) => {
    const {id} = req.params;
    Post.remove(id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({message: "This post has been destrooooyedddd mwahahaha...."})
        } else {
            res.status(404).json({message: 'Could not find the post s\'up with that?'});
        }
    })
    .catch(error => {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: "Error removing the post."
        });
      });
});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
