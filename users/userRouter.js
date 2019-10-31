const express = require('express');

const router = express.Router();
const Post = require('../posts/postDb');
const User = require('../users/userDb');

router.post('/', validateUser, async (req, res) => {
    const userName = req.body;

    try{
        const name = await User.insert(userName);
        res.status(201).json(name);
    }
    catch(err) {
        res.status(500).json({error: 'There was an error in adding a new user.'})
    }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
    const {id} = req.user;
    const {text} = req.body;
    console.log(text, id);

    try {
        const newPost = await Post.insert({ text, user_id:id})
        res.status(201).json(newPost)
    }
    catch(err) {
        res.status(500).json({error: 'There was an error while saving post to the database.'})
    }
});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
