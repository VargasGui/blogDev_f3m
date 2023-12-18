import { Link } from 'react-router-dom'

const PostDetail = ({ post }) => {
    return (
        <div>
            <img src={post.image} alt={post.title} />
            <h3>{post.title}</h3>
            <p>Por: {post.createdBy}</p>
            <div>
                {post.tags.map((tag) => (
                    <p key={tag}>
                        <span>###</span>
                        {tag}
                    </p>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver mais</Link>
        </div>
    )
}

export default PostDetail
