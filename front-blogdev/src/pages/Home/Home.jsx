import React from 'react'
import { userFetchDocuments } from '../../hooks/userFetchDocuments'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import styles from './Home.module.css'
import PostDetail from '../../components/PostDetail'
const Home = () => {
  const { documents: posts, loading } = userFetchDocuments("posts")
  const navigate = useNavigate()

  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes!</h1>
      <form action="" className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div className="post-list">
        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div>
            <p>Nenhum post foi encontrado</p>
            <Link to="/posts/create">Crie um post</Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Home
