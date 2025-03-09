import React, { useState, useEffect } from "react";
import ListaUsuarios from "./ListaUsuarios";
import ModalConfirmacion from "./ModalConfirmacion";
import Boton from "../Boton/Boton";
import { useNavigate } from "react-router-dom";
import "./AdminUsuarios.css";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalEliminar, setModalEliminar] = useState({ mostrar: false, id: null });
  const navigate = useNavigate(); // Obtiene la función navigate para la navegación programática

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
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/api/user/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setUsuarios(usuarios.filter((user) => user.id !== id));
      } else {
        console.error("No se pudo eliminar el usuario.");
      }
    } catch (error) {
      console.error("Error en el servidor.");
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
      <div className="card custom-card">
        <div className="card-header custom-header text-white fw-bold">
          ADMINISTRAR USUARIOS
        </div>
        <div className="card-body custom-body mb-5">
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
          <div className="volver-container"> {/* Contenedor para el botón de volver */}
            <Boton onClick={() => navigate("/zona-usuario")}>VOLVER</Boton> {/* Botón para volver a la zona de usuario */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsuarios;
