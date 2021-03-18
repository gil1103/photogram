import { PostPreview } from './PostPreview.jsx'
import {FavoriteBarList} from './FavoriteBarList'

export function PostList({ posts, onRemove, loggedInUser }) {
    const sortedPosts = posts.sort((a,b)=> (a.createdAt > b.createdAt) ? -1 : 1)
    return <article className="posts-container">
        <FavoriteBarList loggedInUser={loggedInUser} />
        {sortedPosts.map(post => {
            return <PostPreview key={post.createdAt} post={post} onRemove={onRemove} loggedInUser={loggedInUser} />
        })}
        </article>

}