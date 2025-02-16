import React, { useEffect, useState } from "react";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener usuarios.");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setUsuarios(usuarios.filter((user) => user.id !== id));
      } else {
        alert("No se pudo eliminar el usuario.");
      }
    } catch (error) {
      alert("Error en el servidor.");
    }
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setModalAbierto(true);
  };

  const cerrarModalEdicion = () => {
    setUsuarioSeleccionado(null);
    setModalAbierto(false);
  };

  const actualizarUsuario = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/user/${usuarioSeleccionado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: usuarioSeleccionado.nombre,
          email: usuarioSeleccionado.email,
          permiso: usuarioSeleccionado.permiso,
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      const usuariosActualizados = usuarios.map((user) =>
        user.id === usuarioSeleccionado.id ? usuarioSeleccionado : user
      );

      setUsuarios(usuariosActualizados);
      cerrarModalEdicion();
    } catch (error) {
      alert(`Error al actualizar usuario: ${error.message}`);
    }
  };

  if (cargando) return <p className="text-center mt-4">Cargando...</p>;
  if (error) return <p className="text-danger text-center mt-4">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Administrar Usuarios</h2>
      <table className="table table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Permiso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.permiso === 9 ? "Administrador" : "Usuario"}</td>
              <td>
                <button onClick={() => abrirModalEdicion(usuario)} className="btn btn-warning btn-sm me-2">
                  Editar
                </button>
                <button onClick={() => eliminarUsuario(usuario.id)} className="btn btn-danger btn-sm">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalAbierto && usuarioSeleccionado && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Editar Usuario</h5>
                <button type="button" className="btn-close" onClick={cerrarModalEdicion}></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={usuarioSeleccionado.nombre}
                  onChange={(e) =>
                    setUsuarioSeleccionado({ ...usuarioSeleccionado, nombre: e.target.value })
                  }
                />
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control mb-2"
                  value={usuarioSeleccionado.email}
                  onChange={(e) =>
                    setUsuarioSeleccionado({ ...usuarioSeleccionado, email: e.target.value })
                  }
                />
                <label className="form-label">Permiso:</label>
                <select
                  className="form-select mb-3"
                  value={usuarioSeleccionado.permiso}
                  onChange={(e) =>
                    setUsuarioSeleccionado({ 
                      ...usuarioSeleccionado, 
                      permiso: Number(e.target.value) 
                    })
                  }
                >
                  <option value={1}>Usuario</option>
                  <option value={9}>Administrador</option>
</select>

              </div>
              <div className="modal-footer">
                <button onClick={actualizarUsuario} className="btn btn-success">
                  Guardar Cambios
                </button>
                <button onClick={cerrarModalEdicion} className="btn btn-secondary">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsuarios;
