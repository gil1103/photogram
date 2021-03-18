import { postService } from '../../service/postService'

export function loadPosts(filterBy) { 
    return async (dispatch) => {
        const posts = await postService.query(filterBy)
        const action = {
            type: 'SET_POSTS',
            posts,
            filterBy
        }
        dispatch(action)
    }
}

export function removePost(postId) {
    return async (dispatch) => {
        await postService.remove(postId)
        const action = {
            type: 'REMOVE_POST',
            postId
        }
        dispatch(action)
    }
}

export function savePost(post) {
    return async (dispatch) => {
        const savedPost = await postService.save(post)
        const action = {
            type: (post._id) ? 'SAVE_POST' : 'ADD_POST',
            post: savedPost
        }
        dispatch(action)
    }
}

export function filterPosts(filterBy) {
    return (dispatch) => {
        const action = {
            type: 'FILTER_POSTS',
            filterBy
        }
        dispatch(action)
    }
}

export function saveComment(txt, postId, loggedInUser) {
    return async (dispatch) => {
        const post = await postService.commentSave(txt, postId, loggedInUser)
        const action = {
            type: 'SAVE_POST',
            post
        }
        dispatch(action)
    }
}

export function toggleLike(postId, loggedInUser) {
    return async (dispatch) => {
        const post = await postService.like(postId, loggedInUser)
        const action = {
            type: 'SAVE_POST',
            post
        }
        dispatch(action)
    }
}

export function toggleFocus (){
    return (dispatch) => {
        const action ={
            type:'FOCUS_COMMENT'
        }
        dispatch(action)
    }
}