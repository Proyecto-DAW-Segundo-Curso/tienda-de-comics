import React, { useState, useEffect } from "react";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario";
import "./ZonaUsuario.css";

const ZonaUsuario = () => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState(null); // Estado para los datos del usuario
  const [cargando, setCargando] = useState(true); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores

  useEffect(() => {
    // Recuperar el token del localStorage
    const token = localStorage.getItem('token');
    console.log("Token recuperado", token)

    if (!token) {
      setError("No estás autenticado.");
      setCargando(false);
      return;
    }

    // Hacer la solicitud para obtener los datos del usuario usando el token
    const obtenerDatosUsuario = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener los datos del usuario.");
        }

        const datos = await response.json();
        setUsuario(datos); // Guardar los datos del usuario en el estado
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error);
        setError("Error al cargar los datos.");
      } finally {
        setCargando(false); // Dejar de mostrar "Cargando..."
      }
    };

    obtenerDatosUsuario();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos);
    setModoEdicion(false);
  };

  if (cargando) {
    return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <p>{error}</p>; // Mostrar un mensaje de error si ocurrió un problema
  }

  return (
    <div className="zona-usuario">
      <div className="contenedor-titulo">
        <h2>Zona de Usuario</h2>
      </div>
      {modoEdicion ? (
        <FormularioUsuario
          datosUsuario={usuario}
          onGuardar={actualizarUsuario}
          onCancelar={() => setModoEdicion(false)}
        />
      ) : (
        <div className="datos-usuario">
          <div className="tarjeta-info">
            <p><strong>Nombre:</strong> {usuario?.nombre}</p>
            <p><strong>Email:</strong> {usuario?.email}</p>
            <p><strong>Contraseña:</strong> {usuario?.contrasenia}</p>
          </div>
          <div className="tarjeta-opciones">
            <button onClick={() => setModoEdicion(true)} className="btn">
              Modificar Datos
            </button>
            <button onClick={() => setModoEdicion(true)} className="btn">
              Mis Comics
            </button>
            <button onClick={() => setModoEdicion(true)} className="btn">
              Crear Oferta
            </button>
            <button onClick={() => setModoEdicion(true)} className="btn">
              Mis Ofertas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZonaUsuario;
