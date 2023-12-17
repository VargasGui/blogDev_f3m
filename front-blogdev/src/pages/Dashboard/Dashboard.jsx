import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { userDeleteDocument } from '../../hooks/userDeleteDocument';
import styles from './Dashboard.module.css'
import { userFetchDocuments } from '../../hooks/userFetchDocuments';

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid
  const { documents: posts } = userFetchDocuments("posts", null, uid)
  console.log(posts)
  console.log(uid)
  const { deleteDocument } = userDeleteDocument("posts")
  return (
    <div className={styles.dashboard}>
      <h2>Welcome to Dashboard</h2>
      <p>Gerencie seus posts!</p>
      {posts && posts.lenght === 0 ? (
        <div className={styles.noPost}>
          <p>Voce não possui nenhum post!</p>
          <Link to="/post/create" className='btn'>Criar Post</Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}
      {posts &&
        posts.map((post) => (
          <div>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>Veja</Link>
              <Link className='btn btn-outline' to={`/posts/edit/${post.id}`}>Editar</Link>
              <button className='btn btn-outline btn-danger' onClick={() => deleteDocument(post.id)}>Excluir</button>
            </div>
          </div>
        ))}

    </div>
  )
}

export default Dashboard
