import React, { useState } from 'react';
import './FormRegistro.css';
import Boton from '../Boton/Boton';

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
    <section>
      <div className="form-registro">
        <div className="contenedor-boton">
          
        </div>
        <div className="contenedor-formRegistro">
          <form onSubmit={manejarSubmit} className="formulario">
            <div className="contenedor-campos">
              <div className="contenedor-categoria">
                <label htmlFor="nombre">Nombre</label>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" name="nombre" id="nombre" required />
              </div>
              <div className="contenedor-categoria">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" required />
              </div>
              <div className="contenedor-categoria">
                <label htmlFor="password">Contraseña</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required />
              </div>
              <div className="contenedor-categoria">
                <label htmlFor="confirm-password">Confirmar contraseña</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" required />
              </div>
            </div>
            <div className="contenedor-boton-registro">
              <Boton>REGISTRARSE</Boton>
            </div>
          </form>
          {mensaje && <p>{mensaje}</p>}
        </div>
      </div>
    </section>
  );
}

export default FormRegistro;
