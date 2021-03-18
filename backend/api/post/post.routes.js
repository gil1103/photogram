const express = require('express')
const {requireAuth} = require('../../middlewares/requireAuth.middleware')
const {addPost, getPosts, deletePost, updatePost, getPost} = require('./post.controller')
const router = express.Router()


router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', requireAuth, addPost)
router.put('/:id',requireAuth, updatePost)
router.delete('/:id', requireAuth, deletePost)

module.exports = router