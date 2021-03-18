const logger = require('../../services/logger.service')
const postService = require('./post.service')

async function getPosts(req, res) {
    console.log('getPosts-req.query',req.query.byUser);
    try {
        const filterBy = {
        // title: req.query?.title,
        byUser: req.query?.byUser
        }
        const posts = await postService.query(filterBy)
        res.send(posts)
    } catch (err) {
        logger.error('Cannot get posts', err)
        res.status(500).send({ err: 'Failed to get posts' })
    }
}

async function deletePost(req, res) {
    console.log('req',req);
    try {
        await postService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete post', err)
        res.status(500).send({ err: 'Failed to delete post' })
    }
}

async function addPost(req, res) {
    try {
        var post = req.body
        const { fullname, imgUrl, _id } = req.session.user
        const byUser = {fullname, imgUrl, _id}
        post.byUser = byUser
        post = await postService.add(post)
        console.log('Add post (post controller)', post)
        res.send(post)

    } catch (err) {
        console.log('err', err)
        logger.error('Failed to add post', err)
        res.status(500).send({ err: 'Failed to add post' })
    }
}
async function updatePost(req, res) {
    try {
        const post = req.body
        console.log('POST CONTROLLER', post)
        const savedPost = await postService.update(post)
        res.send(savedPost)

    } catch (err) {
        logger.error('Failed to add post', err)
        res.status(500).send({ err: 'Failed to add post' })
    }
}

async function getPost(req, res) {
    try {
        console.log('req-post controll getpost',req);
        const post = await postService.getById(req.params.id)
        res.send(post)
    } catch (err) {
        logger.error('Failed to get post', err)
        res.status(500).send({ err: 'Failed to get post' })
    }
}

module.exports = {
    getPosts,
    deletePost,
    addPost,
    updatePost,
    getPost
}