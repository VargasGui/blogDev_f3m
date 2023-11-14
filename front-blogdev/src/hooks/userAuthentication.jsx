import {db} from '../firebase/config'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    getAuth,
} from 'firebase/auth'
import { useState, useEffect } from 'react';

export const UserAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }
    async function createUser(data) {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password)

            await updateProfile(user, { displayName: data.displayName })
            setLoading(false)
            return user

        } catch (error) {
            console.error(error.message)
            console.table(typeof error.message)

            let systemErrorMessage
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "Email já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente!"
            }
            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

}
