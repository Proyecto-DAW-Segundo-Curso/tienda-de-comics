import React from 'react';
import "./Tendencias.css";
import Boton from '../Boton/Boton';
import {PortadaComic1, PortadaComic2} from '../PortadaComic/PortadaComic';
import Paginado from '../Paginado/Paginado';
import { Routes, Route } from 'react-router-dom';

function Tendencias() {
  return (
    <div className='tendencias'>
      <div className="contenedor-boton">
        <Boton>TENDENCIAS</Boton>
      </div>
      <div className="contenedor-portadas">
        <div className="contenedor-imagenes">
          <PortadaComic2 className='portadas-imagenes'/>
          <PortadaComic2 className='portadas-imagenes'/>
          <PortadaComic2 className='portadas-imagenes'/>
          <PortadaComic2 className='portadas-imagenes'/>
          <PortadaComic2 className='portadas-imagenes'/>
          <PortadaComic2 className='portadas-imagenes'/>
        </div>
        <div className="paginado">
          <Paginado>
            <Routes>
              <nav>
                <ul>
                  <li>
                    <Route to='/Tendencias1'>1</Route>
                  </li>
                  <li>
                    <Route to='/Tendencias2'>2</Route>
                  </li>
                  <li>
                    <Route to='/Tendencias3'>3</Route>
                  </li>
                </ul>
              </nav>
            </Routes>
          </Paginado>
        </div>
      </div>

    </div>
  );
}

export default Tendencias;
