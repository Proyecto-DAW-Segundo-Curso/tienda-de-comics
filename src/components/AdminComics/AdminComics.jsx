import React, { useEffect, useState } from 'react'; // Importa React y los hooks useEffect y useState
import './AdminComics.css'; // Importa los estilos personalizados del componente
import { useNavigate } from "react-router-dom"; // Hook para navegar entre rutas de la aplicación
import Boton from '../Boton/Boton';
import Swal from 'sweetalert2';

function AdminComics() {
  const navigate = useNavigate(); // Permite redirigir a otras rutas dentro de la aplicación
  const [comics, setComics] = useState([]); // Estado para almacenar la lista completa de cómics obtenida del servidor
  const [searchText, setSearchText] = useState(''); // Estado para almacenar el texto ingresado en la barra de búsqueda
  const [filteredComics, setFilteredComics] = useState([]); // Estado para almacenar los cómics que coinciden con el filtro de búsqueda

  // Hook para cargar los cómics desde el backend al montar el componente
  useEffect(() => {
    fetch('http://localhost:3001/api/comics') // Petición HTTP GET a la API local
      .then(response => response.json()) // Convierte la respuesta en formato JSON
      .then(data => {
        setComics(data); // Guarda los cómics en el estado principal
        setFilteredComics(data); // Inicialmente muestra todos los cómics sin filtro
      });
  }, []); // [] indica que solo se ejecutará una vez al montar el componente

  // Hook que se ejecuta cada vez que cambia el texto de búsqueda o la lista de cómics
  useEffect(() => {
    const results = comics.filter(comic =>
      comic.titulo.toLowerCase().includes(searchText.toLowerCase()) // Filtra los cómics por coincidencia parcial en el título
    );
    setFilteredComics(results); // Actualiza la lista de cómics filtrados
  }, [searchText, comics]); // Dependencias: ejecuta el hook cuando cambia searchText o comics

  // Función para eliminar un cómic
  const eliminarComic = (comicId, titulo) => {
    // Confirmación antes de eliminar
    if (window.confirm(`¿Está seguro de eliminar ${titulo}?`)) {
      fetch(`http://localhost:3001/api/comics/${comicId}`, { // Petición HTTP DELETE a la API
        method: 'DELETE',
      })
      .then(() => {
        // Actualiza el estado eliminando el cómic borrado
        setComics(comics.filter(c => c.id !== comicId));
      })
      .catch(
        () => Swal.fire('Error al eliminar el cómic', '', 'error')   // Manejo de errores en la petición
      ); 
    }
  };

  return (
    <div className="container mt-5">

      <div className="card rounded custom-body">
        {/* Título principal */}
        <div className="text-center card-header custom-header text-white fw-bold">
          ADMINISTRAR COMICS
        </div>

        {/* Barra de búsqueda y botón "Añadir Comic" */}
        <div className="card-body d-flex justify-content-between align-items-center mb-4">
          <input
            type="text"
            placeholder="Buscar por título..." // Placeholder en el campo de búsqueda
            className="form-control w-50" // Clases de Bootstrap para diseño
            value={searchText} // Enlaza el valor del campo con el estado searchText
            onChange={e => setSearchText(e.target.value)} // Actualiza searchText al cambiar el contenido del input
          />
          <Boton
            onClick={() => navigate("/agregar-comic")} // Redirige a la ruta de agregar cómic
          >
            AÑADIR COMIC
          </Boton>
          <Boton onClick={() => navigate("/zona-usuario")}>VOLVER</Boton>
        </div>
        <div className="card-body">
          {/* Mensaje de error si no se encuentran cómics */}
          {filteredComics.length === 0 ? (
            <div className="text-center text-danger">Cómic no encontrado</div>
          ) : (
            <div className="row">
              {/* Mapea los cómics filtrados y muestra cada uno en una tarjeta */}
              {filteredComics.map(comic => (
                <div className="col-md-4 mb-4" key={comic.id}>
                  <div className="card h-100 d-flex justify-content-between align-items-center">
                    <img
                      src={comic.imagen || 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'} // Muestra la imagen del cómic o un placeholder si no hay imagen
                      className="card-img-top"
                      alt={comic.titulo}
                      style={{ maxHeight: '250px', objectFit: 'cover' }} // Estilo para ajustar la imagen dentro del contenedor
                    />
                    <div className="card-body">
                      <h5 className="card-title">{comic.titulo}</h5> {/* Título del cómic */}
                      <p className="card-text">
                        <strong>Autor:</strong> {comic.autor} <br />
                        <strong>Editorial:</strong> {comic.editorial} <br />
                        <strong>Género:</strong> {comic.genero} <br />
                        <strong>Precio:</strong> ${comic.precio.toFixed(2)} <br />
                        <strong>Stock:</strong> {comic.stock}
                      </p>
                    </div>
                    <div className="d-flex">
                      {/* Botón para editar el cómic */}
                      <Boton
                        className="btn btn-warning"
                        onClick={() => navigate(`/editar-comic/${comic.id}`)} // Redirige a la ruta de edición con el ID del cómic
                      >
                        Editar
                      </Boton>
                      {/* Botón para eliminar el cómic */}
                      <Boton
                        className="btn btn-danger"
                        onClick={() => eliminarComic(comic.id, comic.titulo)}
                      >
                        Eliminar
                      </Boton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminComics;
