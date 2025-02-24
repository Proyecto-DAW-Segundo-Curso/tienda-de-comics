import React, { useEffect, useState } from 'react'
import "./Tendencias.css";
import FichaLibro from '../FichaLibro/FichaLibro';


function Tendencias() {

  const [comics, setComics] = useState([])

  useEffect(() => {

    fetch('http://localhost:3001/api/comics')
      .then((res) => res.json())
      .then((data) => setComics(data))

  }, []);


  return (
    <div className='container mt-5 w-80 position-relative'>
      <div className="card">
        <div className="card-header custom-header text-white fw-bold text-center">
          TENDENCIAS
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

export default Tendencias;