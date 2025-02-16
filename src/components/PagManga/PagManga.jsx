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
    <div className='tendencias'>
      <div className="contenedor-boton">
        <Boton>MANGA</Boton>
      </div>
      <div className="contenedor-comics">
        {comics.map((comic) => (
          <FichaLibro key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  )
}

export default PagManga;
