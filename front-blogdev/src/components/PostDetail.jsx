import React from "react";
import { Link } from 'react-router-dom'

const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} />
            <h2>{post.title}</h2>
            <p>por: {post.createdBy}</p>
            <div className={styles.tags}>
                {post.tags.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>

                ))}
            </div>
            <Link to={`/posts/${post.id}`} className='btn btn-outline'>Ver mais</Link>
        </div>
    )
}

export default PostDetail