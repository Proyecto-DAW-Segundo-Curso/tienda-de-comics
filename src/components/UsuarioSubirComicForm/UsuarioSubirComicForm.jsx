import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UsuarioSubirComicForm.css";
import { jwtDecode } from "jwt-decode"; // Instalar con npm install jwt-decode
import Boton from "../Boton/Boton";

function UsuarioSubirComicForm() {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para redireccionar
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      console.log("✅ Token decodificado correctamente:", decoded);
    } catch (error) {
      console.error("❌ Error al decodificar el token:", error.message);
    }
  } else {
    console.log("❌ No hay token en localStorage");
  }

  const [comic, setComic] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    genero: '',
    precio: '',
    imagen: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/comics-subidos-usuario/${id}`)
        .then((res) => res.json())
        .then((data) => setComic(data))
        .catch((error) => console.error('Error al cargar el cómic:', error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setComic({ ...comic, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const endpoint = id
      ? `http://localhost:3001/api/comics-subidos-usuario/${id}`
      : 'http://localhost:3001/api/comics-subidos-usuario';

    try {
      const token = localStorage.getItem('token'); // Obtiene el token
      if (!token) {
        alert("No tienes una sesión activa. Inicia sesión primero.");
        return;
      }

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token aquí
        },
        body: JSON.stringify(comic),
      });

      if (response.ok) {
        alert(id ? 'Cómic actualizado con éxito' : 'Cómic agregado exitosamente');
        navigate('/mis-comics'); // Redirige a mis comics después de la operación
      } else {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        alert(errorData.message || 'Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      alert('Hubo un error en el servidor');
    }
  };


  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          {id ? 'EDITAR' : 'AÑADIR'}
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
                    placeholder="Escribe aquí"
                    value={comic.imagen}
                    onChange={handleInputChange}
                    style={{ marginBottom: "15px" }} // Margen entre input y la imagen
                  />
                </div>
                <div className="form-group">
                  <img
                    src={comic.imagen}
                    alt="Portada Comic"
                    className="img-fluid rounded"
                    onError={(e) => (e.target.src = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg")}
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
                    placeholder="Escribe aquí"
                    value={comic.titulo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="autor">Autor</label>
                  <input
                    type="text"
                    className="form-control"
                    id="autor"
                    placeholder="Escribe aquí"
                    value={comic.autor}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editorial">Editorial</label>
                  <input
                    type="text"
                    className="form-control"
                    id="editorial"
                    placeholder="Escribe aquí"
                    value={comic.editorial}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="genero">Género</label>
                  <select
                    className="form-select mb-3"
                    id="genero"
                    value={comic.genero}
                    onChange={handleInputChange}
                  >
                    <option value="Comic" selected>Comic</option>
                    <option value="Manga">Manga</option>
                  </select>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="precio">Precio</label>
                      <input
                        type="text"
                        className="form-control"
                        id="precio"
                        placeholder="Escribe aquí"
                        value={comic.precio}
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
                        placeholder="Escribe aquí"
                        value={comic.stock}
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
                <Boton type='button' onClick={() => navigate('/mis-comics')}>
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

export default UsuarioSubirComicForm;
