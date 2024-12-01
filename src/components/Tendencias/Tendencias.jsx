import React from 'react'
import "./Tendencias.css";
import Boton from '../Boton/Boton';
import FichaLibro from '../FichaLibro/FichaLibro';


function Tendencias( {comics}) {

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