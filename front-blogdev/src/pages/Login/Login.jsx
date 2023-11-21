import React from 'react'
import { useState, useEffect } from 'react'
import { userAuthentication } from '../../hooks/userAuthentication'

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()

  const { userLogin, error: authError, loading, message } = userAuthentication()

  const handlerSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const user = {
      email,
      password
    }

    try {
      const res = await userLogin(user)
      console.table(res)

    } catch (error) {
      setError(error.message)
    }
    
  }
  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div>
      <h1>Entre na sua conta</h1>
      <form onSubmit={handlerSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail aqui" />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha aqui" />
        </label>

        {!loading && <button className="btn">Login</button>}
        {loading && <button className="btn">Aguarde...</button>}
        {message && <p>Logado com sucesso!</p>}
        {error && <p className='error'>{error}</p>}

      </form>
    </div>
  )
}

export default Login