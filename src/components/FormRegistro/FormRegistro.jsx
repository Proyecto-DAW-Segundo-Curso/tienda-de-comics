import React, { useState } from 'react';
import './FormRegistro.css';
import Boton from '../Boton/Boton';
import { Link } from 'react-router-dom';

function FormRegistro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  async function manejarSubmit(e) { 
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, contrasenia: password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje('Registro exitoso');
        setNombre('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setMensaje(data.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMensaje('Error en el servidor');
    }
  }

  return (
    <section className="w-50">
      <div className="container mt-5 custom-container">
        <div className="card">
          <div className="card-header custom-header text-white fw-bold">
            REGISTRO
          </div>
          <div className="card-body custom-body">
            <form className="d-flex flex-column align-items-center justify-content-center" onSubmit={manejarSubmit}>
              <div className="mb-3 w-50">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
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
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 w-50">
                <label htmlFor="confirm-password" className="form-label">Confirmar contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {mensaje && <div className="alert alert-danger text-center">{mensaje}</div>}
              <div className="d-grid">
                <Boton type="submit">REGISTRARSE</Boton>
              </div>
              <div className="text-center mt-3">
                <p>¿Ya tienes cuenta? <Link to="/login" className="text-dark fw-bold">Inicia sesión aquí</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
  }

export default FormRegistro;
