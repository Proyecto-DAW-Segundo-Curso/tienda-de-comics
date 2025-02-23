import React from "react";
import { useNavigate } from "react-router-dom";

const ListaUsuarios = ({ usuarios, onEliminar }) => {
  const obtenerPermiso = (permiso) => (permiso === 9 ? "Administrador" : "Usuario");
  const navigate = useNavigate(); // Permite redirigir a otras rutas dentro de la aplicación

  return (
    <div className="row g-3">
      {usuarios.map((usuario) => (
        <div key={usuario.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="card-title">{usuario.nombre}</h5>
              <p className="card-text text-muted">{usuario.email}</p>
              <span className={`badge ${usuario.permiso === 9 ? "bg-danger" : "bg-secondary"}`}>
                {obtenerPermiso(usuario.permiso)}
              </span>
              <div className="mt-3 d-flex flex-row ">
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/editar-usuario/${usuario.id}`)}>
                  ✏️ Editar
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => onEliminar(usuario.id)}>
                  🗑 Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListaUsuarios;
