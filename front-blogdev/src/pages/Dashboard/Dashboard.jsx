import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionando useNavigate
import { useAuthValue } from '../../context/AuthContext';
import { userDeleteDocument } from '../../hooks/userDeleteDocument';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const navigate = useNavigate(); // Obtendo a função navigate

  const { documents: posts } = userFetchDocuments("posts", null, uid);
  const { deleteDocument } = userDeleteDocument("posts");

  const handleDelete = async (postId) => {
    // Chamar a função de exclusão
    await deleteDocument(postId);

    // Redirecionar para a página principal após excluir com sucesso
    navigate('/');
  };

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie seus Posts</p>

      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Você não tem nenhum post</p>
          <Link to="/post/create" className='btn'>
            Criar Post
          </Link>
        </div>
      ) : (
        <div className={styles.postHeader}>
          <span>Título/Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div key={post.id} className={styles.postItem}>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>
                Ver
              </Link>
              <Link className='btn btn-outline' to={`/posts/edit/${post.id}`}>
                Editar
              </Link>
              <button
                className='btn btn-outline btn-danger'
                onClick={() => handleDelete(post.id)} // Usar a função handleDelete
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
