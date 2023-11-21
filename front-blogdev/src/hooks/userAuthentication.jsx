import { db } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'
import { useState, useEffect } from 'react'

export const userAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)
    const [message, setMessage] = useState(false)

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
                data.password
            )
            await updateProfile(user, { displayName: data.displayName })
            setLoading(false)
            setMessage(true)
            return user

        } catch (error) {
            console.log(error.message)
            console.table(typeof (error))

            let systemErrorMessage
            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres"
            } else if (error.message.includes("email-already")) {
                systemErrorMessage = "E-mail já cadastrado"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
            setMessage(false)
        }

        useEffect(() => {
            return () => setCancelled(true)
        }, [])

    }

    async function userLogin(data) {
        checkIfIsCancelled()
        setLoading(true)
        setError(null)

        try {
            const {user} = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            setLoading(false)
            setMessage(true)

            return user

        } catch (error) {
            console.log(error.message)
            console.table(typeof (error))

            let systemErrorMessage
            if (error.message.includes('auth/invalid-login-credentials')) {
                systemErrorMessage = "Usuário ou senha inválidos!"
            } else {
                systemErrorMessage = "Ocorreu um error, tente novamente mais tarde"
            }
            setLoading(false)
            setError(systemErrorMessage)
            setMessage(false)
        }
    }
    const logoutUser = async () => {
        signOut(auth);
      };
    
      useEffect(() => {
        return () => setCancelled(true);
      }, []);

    

    return {
        auth,
        createUser,
        userLogin,
        logoutUser,
        error,
        loading,
        message
    }
}


