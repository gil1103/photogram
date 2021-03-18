import { UserPostPreview } from './UserPostPreview.jsx'

export function UserPostList({ posts, onRemove, onEditPost, loggedInUser }) {
    const userPosts = posts.filter(post => post.byUser._id===loggedInUser._id)
    return <article className="user-img-list">
        {userPosts.map(post => {
            return <UserPostPreview key={post._id} post={post} onRemove={onRemove} onEditPost={onEditPost} loggedInUser={loggedInUser} />
        })}
        </article>
}