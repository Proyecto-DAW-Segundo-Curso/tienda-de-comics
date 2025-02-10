import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario";
import "./ZonaUsuario.css";
import { useNavigate } from "react-router-dom";


const ZonaUsuario = () => {

  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuario, setUsuario] = useState(null); // Estado para los datos del usuario
  const [cargando, setCargando] = useState(true); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores
  const navigate = useNavigate()

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

  const eliminarCuenta = async () => {
    const confirmar = window.confirm(" ¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/user/${usuario.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Tu cuenta ha sido eliminada con éxito.");
        localStorage.removeItem("token"); // Eliminar el token de autenticación
        navigate("/"); // Redirigir a la página de inicio
      } else {
        alert(data.message || "Error al eliminar la cuenta.");
      }
    } catch (error) {
      console.error("Error al eliminar cuenta:", error);
      alert("Error en el servidor.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold text-center">
          ZONA DE USUARIO
        </div>
        <div className="card-body custom-body">
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
                <button onClick={() => setModoEdicion(true)} className="btn custom-button text-black fw-bold me-2">
                  Modificar Datos
                </button>
                <button onClick={() => navigate("/admin-comics")} className="btn custom-button text-black fw-bold me-2">
                  Admin Comics
                </button>
                <button onClick={() => setModoEdicion(true)} className="btn custom-button text-black fw-bold me-2">
                  Crear Oferta
                </button>
                <button onClick={() => setModoEdicion(true)} className="btn custom-button text-black fw-bold me-2">
                  Mis Ofertas
                </button>
                <button onClick={eliminarCuenta} className="btn custom-button text-black fw-bold me-2">
                 Eliminar Cuenta
                 </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ZonaUsuario;
