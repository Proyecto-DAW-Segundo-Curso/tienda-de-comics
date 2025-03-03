import React, { useState, useEffect } from 'react';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [totalGeneral, setTotalGeneral] = useState(0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const fetchVentas = async () => {
    try {
      const url = new URL('http://localhost:3001/api/ventas/reporte');
      if (fechaInicio) url.searchParams.append('fechaInicio', fechaInicio);
      if (fechaFin) url.searchParams.append('fechaFin', fechaFin);

      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener las ventas');

      const data = await response.json();
      setVentas(data.ventas);
      console.log('Ventas:', data.ventas);
      
      setTotalGeneral(data.totalGeneral);
      console.log('Total general:', data.totalGeneral);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchVentas();
  }, [fechaInicio, fechaFin]);

  // Función para formatear valores monetarios
  const formatMoney = (value) => {
    return parseFloat(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Reporte de Ventas</h1>

      {/* Filtros de fecha */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label">Fecha Inicio:</label>
          <input
            type="date"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha Fin:</label>
          <input
            type="date"
            className="form-control"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={fetchVentas}>
            Filtrar
          </button>
        </div>
      </div>

      {/* Lista de ventas */}
      <div className="row">
        {ventas.map((venta) => (
          <div key={venta.id_venta} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Venta ID: {venta.id_venta}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Usuario: {venta.usuario}
                </h6>
                <ul className="list-group list-group-flush">
                  {venta.comics.map((comic) => (
                    <li key={comic.id} className="list-group-item">
                      <strong>{comic.titulo}</strong> - Cantidad: {comic.cantidad} - Precio: $
                      {formatMoney(comic.precio)}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <strong>Total Venta:</strong> ${formatMoney(venta.total)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total general */}
      <div className="mt-4 p-3 bg-light rounded">
        <h3 className="mb-0">Total General: ${formatMoney(totalGeneral)}</h3>
      </div>
    </div>
  );
};

export default Ventas;