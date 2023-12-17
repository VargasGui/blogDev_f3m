import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userUpdateDocument } from "../../hooks/userUpdateDocuments";
import { useAuthValue } from "../../context/AuthContext";
import { userFetchDocument } from "../../hooks/userFetchDocument";

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = userFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setImage(post.image)
            setBody(post.body)
            setTags(post.tags)

            const textTags = post.tags.join(", ")

            setTags(textTags)
        }
    }, [post])
    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { updateDocument, response } = userUpdateDocument("posts")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError("")
        const tagsArray = tags.split(",").map(tag => tag.trim())

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
        }

        updateDocument(id, data)

        navigate("/dashboard")
    }
    return (
        <div>
            {post && (
                <>
                    <h2>Editando o post: {post.title}</h2>
                    <p>Altere os dados do seu post como voce desejar!</p>
                    <form onSubmit={handleSubmit} action="">
                        <label>
                            <span>Título:</span>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </label>
                        <label>
                            <span>Imagem:</span>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
                        </label>
                        <p>Preview da imagem Atual</p>
                        <img src={post.image} alt=""/>
                        <label>
                            <span>Conteudo:</span>
                            <textarea value={body} onChange={(e) => setBody(e.target.value)} required />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} required />
                        </label>
                        {!response.loading && <button className="btn" type="submit">Editar</button>}
                        {response.loading && (
                            <button type="submit" disabled>Carregando..</button>
                        )}
                        {(response.error || formError) && (
                            <p>{response.error || formError}</p>
                        )}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost


