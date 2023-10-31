import React from 'react'

const register = () => {
  return (
    <div>
      <h1>Compartilhe suas experiências com outros nômades</h1>
      <form action="">
        <label htmlFor="">
          <span>Nome: </span>
          <input type="text" name="displayName" required placeholder='Insira seu nome' />
        </label>
        <label htmlFor="">
          <span>Email: </span>
          <input type="email" name="email" required placeholder='Insira seu email' />
        </label>
        <label htmlFor="">
          <span>Senha: </span>
          <input type="password" name="password" required placeholder='Insira sua senha' />
        </label>
        <label htmlFor="">
          <span>Confirme a senha: </span>
          <input type="password" name="confirmedPassword" required placeholder='Insira sua senha novamente' />
        </label>
        <button className='btn'>Cadastrar</button>
      </form>
    </div>
  )
}

export default register