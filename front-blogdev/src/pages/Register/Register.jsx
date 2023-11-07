import React from 'react'
import { useState } from 'react'

const register = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [error, setError] = useState('')
  const handlerSubmit = (e) => {
    e.preventDefault()
    setError("")
    const user = {
      displayName,
      email,
      password
    }
    if(password != confirmedPassword){
      setError("As senhas não coincidem")
      return
    }
    console.table(user)
  }
  return (
    <div>
      <h1>Compartilhe suas experiências com outros nômades</h1>
      <form action="">
        <label htmlFor="">
          <span>Nome: </span>
          <input type="text" name="displayName" required placeholder='Insira seu nome' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label htmlFor="">
          <span>Email: </span>
          <input type="email" name="email" required placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label htmlFor="">
          <span>Senha: </span>
          <input type="password" name="password" required placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label htmlFor="">
          <span>Confirme a senha: </span>
          <input type="password" name="confirmedPassword" required placeholder='Insira sua senha novamente' value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
        </label>
        <button className='btn'>Cadastrar</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default register