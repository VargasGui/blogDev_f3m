import React from 'react';

import { useQuery } from '../../hooks/useQuery';
import { userFetchDocuments } from '../../hooks/userFetchDocuments';
import { Link } from 'react-router-dom';
import PostDetail from '../../components/PostDetail';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = userFetchDocuments('posts', search);

  return (
    <div className={styles.searchContainer}>
      <h1>Resultados encontrados para: {search}</h1>
      <div>
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados</p>
            <Link to="/">Voltar</Link>
          </>
        )}
        {posts &&
          posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
