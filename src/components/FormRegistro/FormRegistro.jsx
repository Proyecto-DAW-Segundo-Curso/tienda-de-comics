import React, { useState } from 'react'
import './FormRegistro.css'
import Boton from '../Boton/Boton'
import { useFormState } from 'react-dom';

function FormRegistro() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  function manejarSubmit(e) { 
    e.preventDefault();
    if(password !== confirmPassword){
      alert('Las contraseñas no coinciden');
      return;
    }
  }





  return (
    <section>
      <div className='form-registro'>
        <div className="contenedor-boton">
          <Boton>REGISTRARSE</Boton>
        </div>
        {/* el htmlFor para hacer referencia al campo */}
        <div className="contenedor-formRegistro">
          <form onSubmit={manejarSubmit} className='formulario'>
            <div className='contenedor-izquierdo-formulario'>
              <div className="contenedor-categoria">
                <label htmlFor="nombre">Nombre</label>
                <input value={nombre} onChange={(e)=>setNombre(e.target.value)} type="text" name="nombre" id="nombre" required />
              </div>
              {/* <div className="contenedor-categoria">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" name="direccion" id="direccion" required />
              </div> */}
              <div className="contenedor-categoria">
                <label htmlFor="password">Contraseña</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" id="password" required />
              </div>
            </div>
            <div className='contenedor-derecha-formulario'>
              <div className="contenedor-categoria">
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="email" id="email" required />
              </div>
              <div className="contenedor-categoria">
                <label htmlFor="confirm-password">Comprobar contraseña</label>
                <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" required />
              </div>
            </div>
          </form>
          <div>
            <Boton>REGISTRARSE</Boton>
          </div>
        </div>
      </div>
    </section>

  )
}

export default FormRegistro;
