import { utilService } from './utilService'
import { httpService } from './httpService'

export const postService = {
  query,
  getById,
  remove,
  save,
  commentSave,
  like
}

function query(filterBy) {
  var queryStr =(!filterBy) ? '' : `?byUser=${filterBy.byUser}`
  return httpService.get(`post${queryStr}`)
}

function remove(postId) {
  return httpService.delete(`post/${postId}`)
}

async function like(postId, loggedInUser) {
  const user = {
    "_id": `${loggedInUser._id}`,
    "fullname": `${loggedInUser.fullname}`,
    "imgUrl": `${loggedInUser.imgUrl}`,
  }
  const postIdx = await getIdxById(postId)
  const posts = await query() 
  const currPost = posts[postIdx]
  const currLikeIdx = currPost.likes.findIndex(like => {
    return like._id === user._id
  })

  if (currLikeIdx !== -1) {
    currPost.likes = currPost.likes.filter(like => like._id !== user._id)
  } else if (currLikeIdx === -1) {
    currPost.likes.unshift(user)
  }
  await save(currPost)
  return currPost
}

function getById(postId) {
  return httpService.get(`post/${postId}`)
}

async function getIdxById(postId) {
  const posts = await query()
  let idx = posts.findIndex(post => post._id === postId)
  return idx
}

async function save(post) {
  if (post._id) {
    return await httpService.put(`post/${post._id}`, post)
  }
  else {
    return await httpService.post('post/', post)
  }
}

async function commentSave(txt, postId, loggedInUser) {
  const post = await getById(postId)
  post.comments.unshift(
    {
      id: utilService.makeId(),
      by: {
        id: `${loggedInUser._id}`,
        createdAt: utilService.createTime(),
        fullname: `${loggedInUser.fullname}`,
        imgUrl:`${loggedInUser.imgUrl}`,
      },
      txt
    })
  await httpService.put(`post/${post._id}`, post)
  return post
}