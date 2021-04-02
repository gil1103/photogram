import { UserSavedPreview } from './UserSavedPreview.jsx'

export function UserSavedList({ posts, loggedInUser  }) {
    const userSavedPosts = posts.filter(post => loggedInUser.favoritePosts.includes(post._id))
    return <article className="user-img-list">
        {userSavedPosts.map(post => {
            return <UserSavedPreview key={post._id} post={post} loggedInUser={loggedInUser} />
        })}
        </article>
}