
import { useParams } from 'react-router-dom'
import { userFetchDocument } from '../../hooks/userFetchDocument'

const Post = () => {
    const { id } = useParams()
    const { document: post } = userFetchDocument("posts", id)

    return (
        <div>
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} />
                    <p>{post.body}</p>
                    <h3>Esse post trata sobre:</h3>
                    <div>
                        {post.tags.map(tag => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Post
