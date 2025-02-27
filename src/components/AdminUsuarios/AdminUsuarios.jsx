import React, { useState, useEffect } from "react";
import ListaUsuarios from "./ListaUsuarios";
import ModalConfirmacion from "./ModalConfirmacion";
import Swal from "sweetalert2";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalEliminar, setModalEliminar] = useState({ mostrar: false, id: null });

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
          Swal.fire("Error al cargar los usuarios: ", error.message);
        } finally {
          setCargando(false);
        }
      };

      fetchUsuarios();
    }, []);

  const eliminarUsuario = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setUsuarios(usuarios.filter((user) => user.id !== id));
      }
      
    } catch (error) {
      Swal.fire("Error al eliminar el usuario: ", error.message);
    } finally {
      setModalEliminar({ mostrar: false, id: null });
    }
  };

  if (cargando) {
    return <div className="text-center mt-4"><span className="spinner-border"></span> Cargando...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header custom-header text-white fw-bold">
          ADMINISTRAR USUARIOS
        </div>
        <div className="card-body custom-body">
          <ListaUsuarios
            usuarios={usuarios}
            onEliminar={(id) => setModalEliminar({ mostrar: true, id })}
          />
          {modalEliminar.mostrar && (
            <ModalConfirmacion
              mensaje="¿Seguro que deseas eliminar este usuario?"
              onConfirm={() => eliminarUsuario(modalEliminar.id)}
              onCancel={() => setModalEliminar({ mostrar: false, id: null })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios;
