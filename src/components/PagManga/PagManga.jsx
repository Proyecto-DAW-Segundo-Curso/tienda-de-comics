import React, { useEffect, useState } from 'react'
import Boton from '../Boton/Boton';
import FichaLibro from '../FichaLibro/FichaLibro';
import { data } from 'react-router-dom';

function PagManga( { comic } ) {
  const [comics, setComics] = useState([]);
  const [genero, setGenero] = useState('Manga');
  
  useEffect(() => {
    if(genero){
      fetch(`http://localhost:3001/api/comics/genero/${genero}`)
        .then((res) => res.json())
        .then((data) => setComics(data));
    } 
  }, [genero]);

  return (
    <div className='container mt-5 w-80 position-relative'>
      <div className="card">
        <div className="card-header custom-header text-white fw-bold text-center">
          MANGA
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

export default PagManga;
