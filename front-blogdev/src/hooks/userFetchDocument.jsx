import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';

export const userFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocument(docSnap.data());
        } else {
          setError('Documento não encontrado');
        }
      } catch (error) {
        setError(error.message);
        console.error(error);
      }

      setLoading(false);
    };

    loadDocument();
  }, [docCollection, id]);

  return { document, loading, error };
};
