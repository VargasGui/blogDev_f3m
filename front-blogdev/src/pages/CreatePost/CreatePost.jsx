import styles from './CreatePost.module.css'
import { useState } from "react";
import { userInsertDocument } from "../../hooks/userInsertDocument";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { insertDocument, response } = userInsertDocument("posts");

  const handlerSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
    }

    // create tags array
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // check values
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    console.log(tagsArray);

    console.log({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if(formError) return

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/");
  };

  return (
    <>
      <div className={styles.create_post}>
        <h2>Nova Postagem</h2>
        <p>Compartilhe sua experiência no mundo desenvolvedor</p>
        <form onSubmit={handlerSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Título da postagem"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input
              type="text"
              name="image"
              id="image"
              placeholder="Endereço da imagem da postagem"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              required />
          </label>
          <label>
            <span>Conteúdo da Postagem:</span>
            <textarea
              name="body"
              id="body"
              placeholder="Insira o conteúdo de sua postagem aqui"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              required>
            </textarea>
          </label>
          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Insira suas tags separadas por virgulas"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              required />
          </label>
            {!response.loading && <button className="btn">Criar Postagem</button>}
            {response.loading && <button className="btn" disabled>Postando...</button>}
            {(response.error || formError) && <p className='error'>{error || formError}</p>}
        </form>
      </div>
    </>
  )
}

export default CreatePost