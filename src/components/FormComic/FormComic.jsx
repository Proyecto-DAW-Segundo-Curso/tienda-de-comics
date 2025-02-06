import React, { useState } from 'react';

function FormComic() {
  const [imageUrl, setImageUrl] = useState("http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"); // Valor inicial de la imagen

  const handleImageChange = (event) => {
    setImageUrl(event.target.value);
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          EDITAR
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="imagen">Imagen</label>
                <input
                  type="text"
                  className="form-control"
                  id="imagen"
                  placeholder="Escribe aquí"
                  value={imageUrl}
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-group">
                <img
                  src={imageUrl}
                  alt="Portada Comic"
                  className="img-fluid"
                  onError={(e) => (e.target.src = "marvel_avengers_50.jpg")} // Imagen por defecto si la URL no es válida
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="titulo">Título</label>
                <input type="text" className="form-control" id="titulo" placeholder="Escribe aquí" />
              </div>
              <div className="form-group">
                <label htmlFor="autor">Autor</label>
                <input type="text" className="form-control" id="autor" placeholder="Escribe aquí" />
              </div>
              <div className="form-group">
                <label htmlFor="editorial">Editorial</label>
                <input type="text" className="form-control" id="editorial" placeholder="Escribe aquí" />
              </div>
              <div className="form-group">
                <label htmlFor="genero">Género</label>
                <input type="text" className="form-control" id="genero" placeholder="Escribe aquí" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input type="text" className="form-control" id="precio" placeholder="Escribe aquí" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="stock">Stock</label>
                    <input type="text" className="form-control" id="stock" placeholder="Escribe aquí" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button className="btn btn-primary btn-block">CONFIRMAR</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormComic;
