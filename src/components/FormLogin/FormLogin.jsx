import React, { useEffect, useState } from 'react'
import './FormLogin.css'
import Boton from '../Boton/Boton'
import FormRegistro from '../FormRegistro/FormRegistro.jsx';
// Importamos el archivo JSON que contiene la lista de usuarios. Este archivo simula la base de datos.
import usuarios from '../../data/usuarios.json';


function FormLogin({ onLogin }) {

  // Estado local para almacenar el valor del campo `email`. Se inicializa como una cadena vacía.
  const [email, setEmail] = useState("");
  // Estado local para almacenar el valor del campo `contraseña`. También inicia vacío.
  const [contrasenia, setContrasenia] = useState("");
  // Estado local para manejar mensajes de error, inicializado como una cadena vacía.
  const [error, setError] = useState("");

  // Estado local para almacenar el usuario actualmente logueado.
  const [datoUsuarioActual, setDatoUsuarioActual] = useState(null);

  const cargarUsuarios = async () => {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    setDatoUsuarioActual(data);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((res) => res.json())
      .then((data) => {
        setDatoUsuarioActual(data)
        console.log(data);
      })

  }, []);

  const manejarSubmit = (e) => {
    e.preventDefault();
    // Prevenimos el comportamiento predeterminado del formulario, que recarga la página al enviarlo.
    
    // Asegúrate de que el estado `datoUsuarioActual` está cargado
    if (!datoUsuarioActual) {
      setError("No se han cargado los usuarios");
      return;
    }
    
    const usuario = datoUsuarioActual.find(
      // Buscamos en el archivo JSON un usuario cuya combinación de email y contraseña coincida con la ingresada.
      (u) => u.email === email && u.contrasenia === contrasenia
    );

    if (usuario) {
      // Si encontramos un usuario que coincide:  
      setError("");
      // Limpiamos el mensaje de error en caso de que haya habido intentos fallidos anteriores.
      onLogin(usuario);
      // Llamamos a la función `onLogin` y le pasamos el usuario encontrado.
    } else {
      // Si no encontramos un usuario que coincida:
      setError("Email o contraseña incorrectos");
      // Actualizamos el estado `error` para mostrar un mensaje de error en pantalla.
    }
  };

  return (
    <section>
      <div className='form-login'>
        <div className="contenedor-boton">
          <Boton>INICIO DE SESION</Boton>
        </div>

        <form className="contenedor-form" onSubmit={manejarSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="contrasenia">Contraseña</label>
          <input type="password" value={contrasenia} id="contrasenia" onChange={(e) => setContrasenia(e.target.value)} />
          {error && <p className="error">{error}</p>}
          <button type="submit" className='boton'>INICIAR SESIÓN</button>
          {/* <Boton>INICIAR SESIÓN</Boton> */}
          {/* <p>¿No tiene cuenta? <a href={FormRegistro}>Regístrate aquí</a></p> */}
        </form>
      </div>
    </section>

  )
}

export default FormLogin