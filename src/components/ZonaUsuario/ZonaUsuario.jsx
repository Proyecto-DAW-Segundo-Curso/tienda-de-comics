import React, { useState, useEffect } from "react"; // Importa React y los hooks useState y useEffect
import { useNavigate } from "react-router-dom"; // Importa useNavigate de react-router-dom para la navegación
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario"; // Importa el componente FormularioUsuario
import "./ZonaUsuario.css"; // Importa el archivo CSS para los estilos
import Boton from "../Boton/Boton"; // Importa el componente Boton

const ZonaUsuario = () => { // Define el componente ZonaUsuario como una función
  const [modoEdicion, setModoEdicion] = useState(false); // Estado para controlar el modo de edición
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const [cargando, setCargando] = useState(true); // Estado para controlar la carga de datos
  const [error, setError] = useState(""); // Estado para almacenar mensajes de error
  const [chats, setChats] = useState([]); // Estado para almacenar la lista de chats
  const [hayMensajesNoLeidos, setHayMensajesNoLeidos] = useState(false); // Estado para notificación de mensajes no leídos
  const [ultimoComic, setUltimoComic] = useState(null); // Estado para almacenar el último cómic subido
  const [misOfertas, setMisOfertas] = useState(0);
  const [misComics, setMisComics] = useState(0);
  const [chatsActivos, setChatsActivos] = useState(0);
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage

    if (!token) {
      setError("No estás autenticado."); // Muestra un mensaje de error si no hay token
      setCargando(false); // Detiene la carga de datos
      return;
    }

    const obtenerDatosUsuario = async () => { // Define una función asíncrona para obtener los datos del usuario
      try {
        const response = await fetch("http://localhost:3001/api/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los headers de la solicitud
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener los datos del usuario."); // Lanza un error si la respuesta no es exitosa
        }

        const datos = await response.json(); // Convierte la respuesta a JSON
        setUsuario(datos); // Actualiza el estado usuario con los datos obtenidos
      } catch (error) {
        console.error("Error al cargar los datos del usuario:", error); // Muestra el error en la consola
        setError("Error al cargar los datos."); // Muestra un mensaje de error
      } finally {
        setCargando(false); // Detiene la carga de datos
      }
    };

    obtenerDatosUsuario(); // Llama a la función para obtener los datos del usuario
  }, []); // Dependencias: ejecuta el hook solo al montar el componente


  useEffect(() => {
    if (!usuario) return;

    const token = localStorage.getItem("token");

    const obtenerMisOfertas = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/mis-ofertas", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener mis ofertas");

        const data = await response.json();
        setMisOfertas(data.length);
      } catch (error) {
        console.error("Error al obtener mis ofertas:", error);
      }
    };

    const obtenerMisComics = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/comics-subidos-usuario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener mis cómics");

        const data = await response.json();
        setMisComics(data.length);
      } catch (error) {
        console.error("Error al obtener mis cómics:", error);
      }
    };

    const obtenerChatsActivos = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/chat", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener los chats");

        const data = await response.json();
        setChatsActivos(data.length);
      } catch (error) {
        console.error("Error al obtener los chats activos:", error);
      }
    };

    obtenerMisOfertas();
    obtenerMisComics();
    obtenerChatsActivos();
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return;

    const obtenerUltimoComic = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/comics-subidos-usuario", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener los cómics");

        const data = await response.json();
        if (data.length > 0) {
          setUltimoComic(data[data.length - 1]); // Tomamos el último cómic de la lista
        }
      } catch (error) {
        console.error("Error al obtener el último cómic:", error);
      }
    };

    obtenerUltimoComic();
  }, [usuario]);

  useEffect(() => {
    if (!usuario) return; // Si no hay usuario, no hace nada

    const obtenerChats = async () => { // Define una función asíncrona para obtener los chats
      try {
        const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage
        const response = await fetch("http://localhost:3001/api/chat", {
          headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los headers de la solicitud
        });

        if (!response.ok) throw new Error("Error al obtener los chats"); // Lanza un error si la respuesta no es exitosa

        const data = await response.json(); // Convierte la respuesta a JSON
        setChats(data); // Actualiza el estado chats con los datos obtenidos

        // Verificamos si hay chats con mensajes no leídos
        const tieneNoLeidos = data.some(chat => chat.no_leido); // Verifica si hay mensajes no leídos
        setHayMensajesNoLeidos(tieneNoLeidos); // Actualiza el estado de notificación

      } catch (error) {
        console.error("Error al obtener chats:", error); // Muestra el error en la consola
      }
    };

    obtenerChats(); // Llama a la función para obtener los chats
  }, [usuario]); // Dependencias: ejecuta el hook cuando cambia usuario

  const actualizarUsuario = (nuevosDatos) => {
    setUsuario(nuevosDatos); // Actualiza el estado usuario con los nuevos datos
    setModoEdicion(false); // Desactiva el modo de edición
  };

  if (cargando) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga si los datos están cargando
  }

  if (error) {
    return <p>{error}</p>; // Muestra un mensaje de error si hay un error
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
    <div className="container mt-5"> {/* Contenedor principal con margen superior */}
      <div className="card"> {/* Tarjeta */}
        <div className="card-header custom-header text-white fw-bold text-center"> {/* Encabezado de la tarjeta con estilos personalizados */}
          ZONA DE USUARIO
        </div>
        <div className="card-body custom-body"> {/* Cuerpo de la tarjeta con estilos personalizados */}
          {modoEdicion ? (
            <FormularioUsuario
              datosUsuario={usuario} // Pasa los datos del usuario al formulario
              onGuardar={actualizarUsuario} // Función para guardar los cambios
              onCancelar={() => setModoEdicion(false)} // Función para cancelar la edición
            />
          ) : (
            <div className="datos-usuario"> {/* Contenedor de los datos del usuario */}
              <div className="tarjeta-info"> {/* Tarjeta de información */}
                <p><strong>Nombre:</strong> {usuario?.nombre}</p> {/* Muestra el nombre del usuario */}
                <p><strong>Email:</strong> {usuario?.email}</p> {/* Muestra el email del usuario */}
                <p><strong>Mis Ofertas:</strong> {misOfertas}</p>
                <p><strong>Mis Cómics:</strong> {misComics}</p>
                <p><strong>Chats Activos:</strong> {chatsActivos}</p>
              </div>
              <div className="tarjeta-comic"> {/* Tarjeta para mostrar el último cómic */}
                <h4 className="titulo-comic">Último Cómic</h4>
                {ultimoComic ? (
                  <>
                    <img src={ultimoComic.imagen} alt={ultimoComic.titulo} />
                    <p><strong>{ultimoComic.titulo}</strong></p>
                  </>
                ) : (
                  <p>No has subido cómics aún</p>
                )}
              </div>

              <div className={`tarjeta-opciones-grid ${usuario.permiso === 9 ? '' : 'centrado'}`}>
                <div className="botones-generales">
                  <Boton className="btn-zu" onClick={() => setModoEdicion(true)}>
                    MODIFICAR DATOS
                  </Boton>
                  <Boton className="btn-zu" onClick={() => navigate("/mis-ofertas")}>
                    MIS OFERTAS
                  </Boton>
                  <Boton className="btn-zu" onClick={() => navigate("/subir-comic-usuario")}>
                    SUBIR CÓMIC
                  </Boton>
                  <Boton className="btn-zu" onClick={() => navigate("/mis-comics")}>
                    MIS CÓMICS
                  </Boton>
                  <div className="boton-notificacion">
                    <Boton className="btn-zu" onClick={() => navigate("/chats-activos")}>
                      CHATS ACTIVOS
                    </Boton>
                    {hayMensajesNoLeidos && <span className="notificacion">!</span>}
                  </div>
                  <Boton className="btn-zu" onClick={eliminarCuenta}>
                    ELIMINAR CUENTA
                  </Boton>
                </div>

                {/* COLUMNA DE BOTONES DE ADMINISTRACIÓN */}
                <div className="admin-buttons">
                  {usuario.permiso === 9 && (
                    <Boton className="btn-zu" onClick={() => navigate("/admin-usuarios")}>ADM USUARIOS</Boton>
                  )}
                  {usuario.permiso === 9 && (
                    <Boton className="btn-zu" onClick={() => navigate("/admin-comics")}>ADM COMICS</Boton>
                  )}
                  {usuario.permiso === 9 && (
                    <Boton className="btn-zu" onClick={() => navigate("/ventas")}>ADM VENTAS</Boton>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZonaUsuario; // Exporta el componente ZonaUsuario
