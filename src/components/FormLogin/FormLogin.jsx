import React, { useEffect, useState } from 'react';
import './FormLogin.css';
import Boton from '../Boton/Boton';
import { useNavigate, Link } from 'react-router-dom';

function FormLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [datoUsuarioActual, setDatoUsuarioActual] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then((res) => res.json())
      .then((data) => {
        setDatoUsuarioActual(data);
        console.log(data);
      })
      .catch((error) => console.error("Error al cargar usuarios:", error));
  }, []);

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, contrasenia }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log("sesion iniciada, token guardado");
        setError("");
        onLogin(data);
        navigate('/zona-usuario', { state: { usuarioLogado: data } });
      } else {
        setError(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error en el servidor");
    }
  };

  return (
    <section>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header custom-header text-white fw-bold">
            LOGIN
          </div>
          <div className="card-body custom-body">
            <form className="contenedor-form" onSubmit={manejarSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="contrasenia">Contraseña</label>
              <input type="password" value={contrasenia} id="contrasenia" onChange={(e) => setContrasenia(e.target.value)} required />

              {error && <p className="error">{error}</p>}

              <Boton type="submit" >INICIAR SESIÓN</Boton>

              <p>¿No tienes cuenta?</p> <Link to="/registro">Regístrate aquí</Link>
            </form>
          </div>
        </div>
      </div>

    </section>
  );
}

export default FormLogin;
