import React from 'react'
import './FormRegistro.css'
import Boton from '../Boton/Boton'

function FormRegistro() {

  





  return (
    <section>
      <div className='form-registro'>
        <div className="contenedor-boton">
          <Boton>REGISTRARSE</Boton>
        </div>
        {/* el htmlFor para hacer referencia al campo */}
        <div className="contenedor-formRegistro">
          <form action="get" className='formulario'>
            <div className='contenedor-izquierdo-formulario'>
              <div className="contenedor-categoria">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" id="nombre" required />
              </div>
              {/* <div className="contenedor-categoria">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" name="direccion" id="direccion" required />
              </div> */}
              <div className="contenedor-categoria">
                <label htmlFor="password">Contraseña</label>
                <input type="password" name="password" id="password" required />
              </div>
            </div>
            <div className='contenedor-derecha-formulario'>
              <div className="contenedor-categoria">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required />
              </div>
              <div className="contenedor-categoria">
                <label htmlFor="password">Comprobar contraseña</label>
                <input type="password" name="password" id="password" required />
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
