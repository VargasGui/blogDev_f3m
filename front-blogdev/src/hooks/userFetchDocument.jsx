import { doc } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"
import { getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export const userFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadDocument = async () => {
            setLoading(true)
            try {
                const docRef = doc(db, docCollection, id)
                const docSnap = await getDoc(docRef)
                setDocument(docSnap.data())
            } catch (error) {
                setError(error.message)
                console.log(error)
            }
            setLoading(false)
        }
        loadDocument()

    }, [docCollection, id])
    
    return {document, loading, error}

}