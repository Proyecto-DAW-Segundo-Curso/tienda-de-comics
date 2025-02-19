import React, { useState } from 'react';

const TarjetaBancaria = () => {
  const [formData, setFormData] = useState({
    numeroTarjeta: '',
    titular: '',
    fechaExpiracion: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({
    numeroTarjeta: '',
    titular: '',
    fechaExpiracion: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    let formErrors = { ...errors };
    let valid = true;

    // Validación del número de tarjeta (debe tener 20 dígitos)
    if (formData.numeroTarjeta.length !== 20) {
      formErrors.numeroTarjeta = 'El número de tarjeta debe tener exactamente 20 dígitos';
      valid = false;
    } else {
      formErrors.numeroTarjeta = '';
    }

    // Validación de los demás campos
    if (!formData.titular) {
      formErrors.titular = 'El titular es obligatorio';
      valid = false;
    } else {
      formErrors.titular = '';
    }

    if (!formData.fechaExpiracion) {
      formErrors.fechaExpiracion = 'La fecha de expiración es obligatoria';
      valid = false;
    } else {
      formErrors.fechaExpiracion = '';
    }

    if (!formData.cvv) {
      formErrors.cvv = 'El CVV es obligatorio';
      valid = false;
    } else {
      formErrors.cvv = '';
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí va el código para enviar los datos al servidor
      console.log('Formulario enviado', formData);
    } else {
      console.log('Errores en el formulario');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Formulario de Tarjeta Bancaria</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="numeroTarjeta" className="form-label">Número de Tarjeta</label>
          <input
            type="text"
            className={`form-control ${errors.numeroTarjeta ? 'is-invalid' : ''}`}
            id="numeroTarjeta"
            name="numeroTarjeta"
            value={formData.numeroTarjeta}
            onChange={handleChange}
            maxLength="20"
            required
          />
          <div className="invalid-feedback">{errors.numeroTarjeta}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="titular" className="form-label">Titular</label>
          <input
            type="text"
            className={`form-control ${errors.titular ? 'is-invalid' : ''}`}
            id="titular"
            name="titular"
            value={formData.titular}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.titular}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="fechaExpiracion" className="form-label">Fecha de Expiración</label>
          <input
            type="month"
            className={`form-control ${errors.fechaExpiracion ? 'is-invalid' : ''}`}
            id="fechaExpiracion"
            name="fechaExpiracion"
            value={formData.fechaExpiracion}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">{errors.fechaExpiracion}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input
            type="text"
            className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            required
            maxLength="3"
          />
          <div className="invalid-feedback">{errors.cvv}</div>
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default TarjetaBancaria;
