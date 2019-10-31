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

router.get('/', async (req, res) => {
    try {
        const users = await User.get();
        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json({error: 'The users could not be retrieved.'})
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    const {id} = req.user;
    try {
       const user = await User.getById(id)
       if (user) {
           res.status(200).json(user);
       } else {
           res.status(404).json({error: 'The user with that specified ID does not exist.'})
       }   
    }
    catch (err) {
        res.status(500).json({error: 'The user information could not be retrieved.' })
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const {id} = req.user;

    try {
        const post = await User.getUserPosts(id)
            if(post && post.length > 0) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ errorMessage: 'The post with the specified user ID does not exist.' })
            }
    } catch (err) {
        res.status(500).json({ errorMessage: 'The posts information could not be retrieved.' })
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    const {id} = req.user;
    try {
        const deleteUserId = await User.remove(id);
        if (deleteUserId) {
            res.status(200).json({message: 'User was deleted.'})
        } else {
            res.status(400).json({error: 'User with this specified ID could not be deleted.'})
        }
    } catch (err) {
        res.status(500).json({error:'The user was not removed.'})
    }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
    try {
        const userName = req.body;
        const {id} = req.user;
        await User.update(id, userName)
        
        const updatedUser = await User.getById(id)
        res.status(201).json(updatedUser)  
    }
    catch (err) {
        res.status(500).json({error: 'The user could not be updated.'})
    }
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
