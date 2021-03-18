import { UserLikedPreview } from './UserLikedPreview.jsx'

export function UserLikedList({ posts, loggedInUser }) {
    
    const userLikedPosts = posts.filter(post => post.likes.some(like => like._id===loggedInUser._id) )
    return <article className="user-img-list">
        {userLikedPosts.map(post => {
            return <UserLikedPreview key={post._id} post={post} loggedInUser={loggedInUser} />
        })}
        </article>
}