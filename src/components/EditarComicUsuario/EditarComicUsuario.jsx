import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../FormComic/FormComic.css';
import Boton from '../Boton/Boton';
import Swal from 'sweetalert2';

function EditarMisComics() {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();
  const location = useLocation();
  const { comic } = location.state || {}; // Obtiene el cómic si viene desde navegación

  const [comicData, setComicData] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    genero: '',
    precio: '',
    stock: '',
    imagen: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
  });

  // Cargar los datos del cómic desde la API si no se reciben desde location.state
  useEffect(() => {
    if (comic) {
      setComicData(comic);
    } else {
      fetch(`http://localhost:3001/api/comics-subidos-usuario/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setComicData(data);
        })
        .catch(
          Swal.fire('Hubo un error al cargar el cómic. Inténtalo de nuevo.')
        );
    }
  }, [comic, id]); // Se ejecuta cuando cambia `comic` o `id`

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setComicData({ ...comicData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/comics-subidos-usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(comicData),
      });

      if (response.ok) {
        Swal.fire("Cómic actualizado con éxito");
        navigate("/mis-comics");
      } else {
        Swal.fire("Error al actualizar el cómic");
      }
    } catch (error) {
      Swal.fire("Hubo un error en el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          EDITAR CÓMIC
        </div>
        <div className="card-body custom-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 fw-bold">
                <div className="form-group">
                  <label htmlFor="imagen">Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="imagen"
                    value={comicData.imagen}
                    onChange={handleInputChange}
                    style={{ marginBottom: "15px" }}
                  />
                </div>
                <div className="form-group">
                  <img
                    src={comicData.imagen}
                    alt="Portada Comic"
                    className="img-fluid rounded"
                    onError={(e) =>
                      (e.target.src = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 fw-bold">
                <div className="form-group">
                  <label htmlFor="titulo">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    value={comicData.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="autor">Autor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="autor"
                    value={comicData.autor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editorial">Editorial</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editorial"
                    value={comicData.editorial}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="genero">Género</label>
                  <input
                    type="text"
                    className="form-control"
                    id="genero"
                    value={comicData.genero}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="precio">Precio</label>
                      <input
                        type="text"
                        className="form-control"
                        id="precio"
                        value={comicData.precio}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="stock">Stock</label>
                      <input
                        type="text"
                        className="form-control"
                        id="stock"
                        value={comicData.stock}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3 d-flex justify-content-center">
              <div className="col-md-6 d-flex justify-content-around">
                <Boton type="submit">CONFIRMAR</Boton>
                <Boton type="button" onClick={() => navigate("/mis-comics")}>
                  VOLVER
                </Boton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarMisComics;