import { doc, orderBy } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { getDoc, onSnapshot, query, where, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export const userFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const collectionRef = collection(db, docCollection);

      try {
        let q;

        if (search) {
          q = query(
            collectionRef,
            where('tags', 'array-contains', search),
            orderBy('createdAt', 'desc')
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where('uid', '==', uid),
            orderBy('createdAt', 'desc')
          );
        } else {
          q = await query(collectionRef, orderBy('createdAt', 'desc'));
        }

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        return () => {
          // Limpar o listener quando o componente for desmontado
          unsubscribe();
        };
      } catch (error) {
        console.error(error);
        setError(error.message);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
