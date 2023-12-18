import React, { useState } from 'react';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const { documents: posts, loading } = userFetchDocuments("posts");
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark" placeholder='Ou busque por tags'>Pesquisar</button>
      </form>
      <div className="post-list">
        {posts && posts.length === 0 && (
          <div>
            <p>Nenhum post encontrado</p>
            <Link to="/posts/create" className="btn">
              Criar post
            </Link>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Home;
