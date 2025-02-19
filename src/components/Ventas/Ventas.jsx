//solo listar: info comic, precio, usuario, comprado fecha
import React, { useEffect, useState } from 'react';
import './Ventas.css';


function Ventas() {
	const [ventas, setVentas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/ventas')
      .then(response => response.json())
      .then(data => setVentas(data));
  }, []);

  return (
    <div className='contenedor-ventas'>
      <table className='tabla-ventas'>
        <thead>
          <tr>
            <th colSpan='5' className='ventas'>VENTAS</th>
          </tr>
          <tr className='cabecera'>
            <th>USUARIO</th>
            <th>CÓMIC</th>
            <th>PRECIO</th>
            <th>CANTIDAD</th>
            <th>FECHA DE COMPRA</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, id) => (
            <tr key={id}>
              <td>{venta.usuario}</td>
              <td>{venta.comic}</td>
              <td>{venta.precio}</td>
              <td>{venta.cantidad}</td>
              <td>{venta.fecha}</td>
            </tr>
          ))}  
        </tbody>
      </table>	
    </div>
  )
}

export default Ventas;
