import React from 'react'
import './FormLogin.css'
import Boton from '../Boton/Boton'

function FormLogin() {
  return (
    <section>
      <div className='form-login'>
        <div className="contenedor-boton">
          <Boton>INICIO DE SESION</Boton>
        </div>

        <div className="contenedor-form">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" />
          <label htmlFor="contrasenia">Contraseña</label>
          <input type="text" name="contrasenia" id="contrasenia" />
          <Boton>INICIAR SESIÓN</Boton>
          <p>¿No tiene cuenta? <a href="#">Regístrate aquí</a></p>
        </div>
      </div>
    </section>

  )
}

export default FormLogin