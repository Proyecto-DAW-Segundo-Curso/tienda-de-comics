import React, { useEffect, useState } from 'react'
import FichaLibro from '../FichaLibro/FichaLibro';

function PagManga() {
  const [comics, setComics] = useState([]);
  const [searchText, setSearchText] = useState(''); // Estado para almacenar el texto ingresado en la barra de búsqueda
  const [filteredComics, setFilteredComics] = useState([]); // Estado para almacenar los cómics que coinciden con el filtro de búsqueda
  const genero = 'Manga';

  useEffect(() => {
    if (genero) {
      fetch(`http://localhost:3001/api/comics/genero/${genero}`)
        .then((res) => res.json())
        .then(data => {
          setComics(data);
          setFilteredComics(data);
        });
    }
  }, [genero]);

  // Hook que se ejecuta cada vez que cambia el texto de búsqueda o la lista de cómics
  useEffect(() => {
    const results = comics.filter(comic =>
      comic.titulo.toLowerCase().includes(searchText.toLowerCase()) // Filtra los cómics por coincidencia parcial en el título
    );
    setFilteredComics(results); // Actualiza la lista de cómics filtrados
  }, [searchText, comics]); // Dependencias: ejecuta el hook cuando cambia searchText o comics

  return (
    <div className='container mt-5 w-80 position-relative'>
      <div className="card">
        <div className="card-header custom-header text-white fw-bold text-center">
          MANGA
        </div>
        {/* Barra de búsqueda y botón "Añadir Comic" */}
        <div className="d-flex align-items-center custom-input">
          <input
            type="text"
            placeholder="Buscar por título..." // Placeholder en el campo de búsqueda
            className="form-control w-50 m-4" // Clases de Bootstrap para diseño
            value={searchText} // Enlaza el valor del campo con el estado searchText
            onChange={e => setSearchText(e.target.value)} // Actualiza searchText al cambiar el contenido del input
          />
        </div>
        <div className="custom-body contenedor-comics">
          {filteredComics.map((comic) => (
            <FichaLibro key={comic.id} comic={comic} />
          ))}

        </div>
      </div>
    </div>
  )
}

export default PagManga;
