import React, { useEffect, useState } from 'react'
import FichaLibro from '../FichaLibro/FichaLibro';

function PagComic() {
  const [comics, setComics] = useState([]);
  const genero = 'Comic';

  useEffect(() => {
    if (genero) {
      fetch(`http://localhost:3001/api/comics/genero/${genero}`)
        .then((res) => res.json())
        .then((data) => setComics(data));
    }
  }, [genero]);

  return (
    <div className='container mt-5 w-80 position-relative'>
      <div className="card">
        <div className="card-header custom-header text-white fw-bold text-center">
          CÓMICS
        </div>

        <div className="custom-body contenedor-comics">
          {comics.map((comic) => (
            <FichaLibro key={comic.id} comic={comic} />
          ))}

        </div>
      </div>
    </div>
  )
}

export default PagComic;
