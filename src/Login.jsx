import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { API_BASE_URL } from './config';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Login exitoso');
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', form.username);
        setTimeout(() => navigate('/editor'), 1000);
      } else {
        setMessage(data.message || 'Error al iniciar sesión');
      }
    } catch (err) {
      setMessage('Error de red');
    }
  };

  return (
    <>
      <Navbar /> {/* Aquí se muestra la barra de navegación */}
      <div className="container mt-5" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center text-primary">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
          <div className="mb-3">
            <input
              name="username"
              className="form-control form-control-lg"
              placeholder="Nombre de Usuario"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              name="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success btn-lg w-100">
            Entrar
          </button>
          <Link to="/register" className="d-block text-center mt-3 text-decoration-none">
            ¿No tienes cuenta? Regístrate
          </Link>
        </form>
        {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
      </div>
    </>
  );
}

export default Login;
