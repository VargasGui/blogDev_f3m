import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { loginUser, error: authError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    const user = {
      email,
      password,
    };

    try {
      const res = await loginUser(user);

      console.table(res);

      setSuccessMessage('Login feito com sucesso!');
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
    <div>
      <h1>Faça login na sua conta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          ></input>
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          ></input>
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
