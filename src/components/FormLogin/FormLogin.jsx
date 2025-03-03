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
      <div className="container mt-5 w-50">
        <div className="card">
          <div className="card-header custom-header text-white fw-bold">
            LOGIN
          </div>
          <div className="card-body custom-body">
            <form className="d-flex flex-column align-items-center justify-content-center" onSubmit={manejarSubmit}>
              <div className="mb-3 w-50">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="contrasenia" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="contrasenia"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger text-center">{error}</div>}
              <div className="d-grid">
                <Boton type="submit" >INICIAR SESIÓN</Boton>
              </div>
              <div className="text-center mt-3">
                <p>¿No tienes cuenta? <Link to="/registro" className="text-dark fw-bold">Regístrate aquí</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormLogin;
