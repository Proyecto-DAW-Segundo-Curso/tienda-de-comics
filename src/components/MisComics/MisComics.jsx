import React, { useEffect, useState } from "react"; // Importa React y los hooks useEffect y useState
import { useNavigate } from "react-router-dom"; // Importa useNavigate de react-router-dom para la navegación
import "./MisComics.css"; // Importa el archivo CSS para los estilos
import Boton from "../Boton/Boton"; // Importa el componente Boton
import Swal from "sweetalert2"; // Importa el módulo sweetalert2 para mostrar alertas

const MisComics = () => { // Define el componente MisComics como una función
  const [comicsSubidos, setComicsSubidos] = useState([]); // Estado para almacenar los cómics subidos
  const [searchText, setSearchText] = useState(""); // Estado para almacenar el texto de búsqueda
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática
  const [filteredComics, setFilteredComics] = useState([]); // Estado para almacenar los cómics que coinciden con el filtro de búsqueda

  // Hook que se ejecuta cada vez que cambia el texto de búsqueda o la lista de cómics
  useEffect(() => {
    const results = comicsSubidos.filter(comic =>
      comic.titulo.toLowerCase().includes(searchText.toLowerCase()) // Filtra los cómics por coincidencia parcial en el título
    );
    setFilteredComics(results); // Actualiza la lista de cómics filtrados
  }, [searchText, comicsSubidos]); // Dependencias: ejecuta el hook cuando cambia searchText o comics

  // Hook que se ejecuta al montar el componente para obtener los cómics subidos
  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage

    const obtenerComicsSubidos = async () => { // Define una función asíncrona para obtener los cómics subidos
      try {
        const response = await fetch("http://localhost:3001/api/comics-subidos-usuario", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los headers de la solicitud
        });

        if (!response.ok) throw new Error("Error al obtener cómics"); // Lanza un error si la respuesta no es exitosa

        let comics = await response.json(); // Convierte la respuesta a JSON

        setComicsSubidos(comics); // Actualiza el estado comicsSubidos con los datos obtenidos
        setFilteredComics(comics); // Inicialmente muestra todos los cómics sin filtro
      } catch (error) {
        Swal.fire('Error al cargar los cómics: ', error); // Muestra un mensaje de
      }
    };

    obtenerComicsSubidos(); // Llama a la función para obtener los cómics subidos
  }, []); // Dependencias: ejecuta el hook solo al montar el componente

  // Define la función para editar un cómic
  const editarComic = (comic) => {
    navigate(`/editar-comic-usuario/${comic.id}`, { state: { comic } }); // Navega a la página de edición del cómic seleccionado
  };

  // Define la función para eliminar un cómic
  const eliminarComic = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este cómic?"); // Pide confirmación al usuario
    if (!confirmar) return; // Si el usuario cancela, no hace nada

    try {
      const token = localStorage.getItem("token"); // Obtiene el token de autenticación del localStorage
      const response = await fetch(`http://localhost:3001/api/comics-subidos-usuario/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }, // Incluye el token en los headers de la solicitud
      });

      if (!response.ok) throw new Error("Error al eliminar cómic"); // Lanza un error si la respuesta no es exitosa

      setComicsSubidos(comicsSubidos.filter(comic => comic.id !== id)); // Actualiza el estado eliminando el cómic eliminado
      Swal.fire('Cómic eliminado correctamente');  // Muestra una alerta de éxito
    } catch (error) {
      Swal.fire('Error al eliminar: ', error);  // Muestra el error en la consola
    }
  };

  return (
    <div className="container mt-5"> {/* Contenedor principal con margen superior */}
      <div className="card rounded custom-body"> {/* Tarjeta con bordes redondeados y estilos personalizados */}
        <div className="text-center card-header custom-header text-white fw-bold"> {/* Encabezado centrado con estilos personalizados */}
          MIS CÓMICS SUBIDOS
        </div>

        {/* Barra de búsqueda y botón "Añadir Comic" */}
        <div className="card-body d-flex justify-content-between align-items-center mb-4"> {/* Cuerpo de la tarjeta con diseño flexible */}
          <input
            type="text"
            placeholder="Buscar por título..." // Placeholder en el campo de búsqueda
            className="form-control w-50" // Clases de Bootstrap para diseño
            value={searchText} // Enlaza el valor del campo con el estado searchText
            onChange={e => setSearchText(e.target.value)} // Actualiza searchText al cambiar el contenido del input
          />
        </div>

        <div className="card-body"> {/* Cuerpo de la tarjeta */}
          {filteredComics.length === 0 ? ( // Si no hay cómics filtrados, muestra un mensaje
            <div className="text-center text-danger">No has subido cómics aún.</div>
          ) : ( // Si hay cómics filtrados, los muestra en una cuadrícula
            <div className="row">
              {filteredComics.map((comic) => ( // Mapea los cómics filtrados para mostrarlos
                <div className="col-md-4 mb-4" key={comic.id}> {/* Columna con margen inferior */}
                  <div className="card h-100"> {/* Tarjeta con altura completa */}
                    <img
                      src={comic.imagen || "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"} // Imagen del cómic o imagen por defecto
                      className="card-img-top"
                      alt={comic.titulo}
                      style={{ maxHeight: "250px", objectFit: "cover" }} // Estilos para la imagen
                    />
                    <div className="card-body"> {/* Cuerpo de la tarjeta */}
                      <h5 className="card-title">{comic.titulo}</h5> {/* Título del cómic */}
                      <p className="card-text"> {/* Texto con detalles del cómic */}
                        <strong>Autor:</strong> {comic.autor} <br />
                        <strong>Editorial:</strong> {comic.editorial} <br />
                        <strong>Género:</strong> {comic.genero} <br />
                        <strong>Precio:</strong> ${comic.precio.toFixed(2)}
                      </p>
                      <div className="d-flex flex-column"> {/* Contenedor flexible para los botones */}
                        <Boton className="mb-2 custom-ofertar" onClick={() => navigate(`/ofertar-comic/${comic.id}`)}> {/* Botón para ofertar */}
                          Ofertar
                        </Boton>
                        <div className="d-flex justify-content-between"> {/* Contenedor flexible para los botones de editar y eliminar */}
                          <Boton className="btn-warning" onClick={() => editarComic(comic)}>Editar</Boton> {/* Botón para editar */}
                          <Boton className="btn-danger" onClick={() => eliminarComic(comic.id)}>Eliminar</Boton> {/* Botón para eliminar */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="volver-container"> {/* Contenedor para el botón de volver */}
            <Boton onClick={() => navigate("/zona-usuario")}>VOLVER</Boton> {/* Botón para volver a la zona de usuario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisComics; // Exporta el componente MisComics


