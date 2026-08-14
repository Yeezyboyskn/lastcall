"use client";

import { FormEvent, useState } from "react";

export default function RegistrationForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="formSuccess" role="status" aria-live="polite">
        <span>✓</span>
        <p className="eyebrow">Registro demo completado</p>
        <h3>Tu equipo ya dio el primer paso.</h3>
        <p>
          En la versión final, Last Call recibirá estos datos para validar la
          elegibilidad y coordinar el kickoff de septiembre.
        </p>
        <button type="button" onClick={() => setSent(false)}>Registrar otra empresa</button>
      </div>
    );
  }

  return (
    <form className="registrationForm" onSubmit={handleSubmit}>
      <div className="formRow">
        <label>
          Nombre y apellido
          <input required name="name" autoComplete="name" placeholder="Ej. Andrea Rojas" />
        </label>
        <label>
          Cargo
          <input required name="role" autoComplete="organization-title" placeholder="Ej. Gerente de TI" />
        </label>
      </div>
      <div className="formRow">
        <label>
          Correo corporativo
          <input required type="email" name="email" autoComplete="email" placeholder="nombre@empresa.com" />
        </label>
        <label>
          Teléfono
          <input required type="tel" name="phone" autoComplete="tel" placeholder="+56 / +51" />
        </label>
      </div>
      <div className="formRow">
        <label>
          Empresa
          <input required name="company" autoComplete="organization" placeholder="Nombre de la empresa" />
        </label>
        <label>
          País
          <select required name="country" defaultValue="">
            <option value="" disabled>Selecciona</option>
            <option>Chile</option>
            <option>Perú</option>
            <option>Otro país de LATAM</option>
          </select>
        </label>
      </div>
      <label>
        Tamaño de la organización
        <select required name="companySize" defaultValue="">
          <option value="" disabled>Selecciona un rango</option>
          <option>30 a 49 colaboradores</option>
          <option>50 a 99 colaboradores</option>
          <option>100 a 299 colaboradores</option>
          <option>300 o más colaboradores</option>
        </select>
      </label>
      <label className="checkField">
        <input required type="checkbox" name="consent" />
        <span>Acepto que Last Call me contacte para validar mi participación y enviarme información de esta iniciativa.</span>
      </label>
      <button className="formSubmit" type="submit">Quiero postular al trial <span>↗</span></button>
      <p className="formNote">Este formulario es demostrativo: no envía ni almacena datos.</p>
    </form>
  );
}
