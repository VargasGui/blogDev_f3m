import React, { useState, useEffect } from 'react';
import { userAuthentication } from '../../hooks/userAuthentication';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = userAuthentication();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = {
      email,
      password,
    };
    try {
      await login(user);
      navigate('/post/create');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar no BlogDev</h1>
      <p>Entre no ambiente do BlogDev e comece a compartilhar suas ideias!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entre com seu e-mail"
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entre com sua senha"
          />
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
