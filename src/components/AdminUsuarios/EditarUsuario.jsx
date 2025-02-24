import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    permiso: 1,
  });

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3001/api/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsuario(data))
        .catch((error) => console.error("Error al cargar el usuario:", error));
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Ahora extrae 'name' en lugar de 'id'
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = "PUT";
    const endpoint = `http://localhost:3001/api/user/${id}`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: usuario.nombre,
          email: usuario.email,
          permiso: usuario.permiso
        }),
      });

      if (response.ok) {
        alert("Usuario actualizado con éxito");
        navigate("/admin-usuarios");
      } else {
        alert("Error al procesar la solicitud");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error en el servidor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          EDITAR USUARIO
        </div>
        <div className="card-body custom-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={usuario.nombre}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={usuario.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Permiso</label>
              <select
                className="form-select"
                name="permiso"
                value={usuario.permiso}
                onChange={handleInputChange}
                required
              >
                <option value={1}>Usuario</option>
                <option value={9}>Administrador</option>
              </select>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin-usuarios")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarUsuario;
