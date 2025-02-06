import React, { useEffect, useState } from 'react'
import "./Tendencias.css";
import Boton from '../Boton/Boton';
import FichaLibro from '../FichaLibro/FichaLibro';


function Tendencias() {

  const [comics, setComics] = useState([])

  useEffect(() => {
    
    fetch('http://localhost:3001/api/comics')
    .then((res) => res.json())
    .then((data) => setComics(data))

  }, []);
  

  return (
    <div className='tendencias'>
      <div className="contenedor-boton">
        <Boton>TENDENCIAS</Boton>
      </div>
      <div className="contenedor-comics">
        {comics.map((comic) => (
          <FichaLibro key={comic.id} comic={comic} />
        ))}
      </div>
    </div>
  )
}

export default Tendencias;