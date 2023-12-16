import { useState, useEffect, useReducer } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

const initialState = {
    loading: null,
    error: null
}


const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "UPDATED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.error }
        default:
            return state
    }
}
export const userUpdateDocument = (docCollection) => {
    const [response, dispatch] = useReducer(updateReducer, initialState)

    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const updateDocument = async (uid, data) => {
        checkCancelBeforeDispatch({ type: "LOADING" })

        try {
            const docRef = await doc(db, docCollection, uid)
            const updatedDocument = await updateDoc(docRef, data)
            checkCancelBeforeDispatch({ type: "UPDATED_DOC", payload: updatedDocument })
        } catch (error) {
            checkCancelBeforeDispatch({ type: "ERROR", payload: error.message })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    })

    return { updateDocument, response }
}