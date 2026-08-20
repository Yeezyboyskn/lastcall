"use client";

import { FormEvent, useState } from "react";

type FormData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  companySize: string;
  consent: boolean;
  twentyFiveUsers: boolean;
  dataProcessing: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{4,6}$/;

export default function RegistrationForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    role: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    companySize: "",
    consent: false,
    twentyFiveUsers: false,
    dataProcessing: false,
  });

  function validateForm(data: FormData): FormErrors {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Nombre y apellido son obligatorios";
    } else if (data.name.trim().length < 3) {
      newErrors.name = "Ingresa tu nombre completo";
    }

    if (!data.role.trim()) {
      newErrors.role = "Cargo es obligatorio";
    }

    if (!data.email.trim()) {
      newErrors.email = "Correo corporativo es obligatorio";
    } else if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = "Ingresa un correo válido (ej. nombre@empresa.com)";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Teléfono es obligatorio";
    } else if (!PHONE_REGEX.test(data.phone)) {
      newErrors.phone = "Formato inválido. Ej: +56 9 1234 5678";
    }

    if (!data.company.trim()) {
      newErrors.company = "Nombre de la empresa es obligatorio";
    }

    if (!data.country) {
      newErrors.country = "Selecciona un país";
    }

    if (!data.companySize) {
      newErrors.companySize = "Selecciona el tamaño de la organización";
    }

    if (!data.consent) {
      newErrors.consent = "Debes autorizar el contacto de Last Call";
    }

    if (!data.twentyFiveUsers) {
      newErrors.twentyFiveUsers = "Confirma que participan hasta 25 usuarios";
    }

    if (!data.dataProcessing) {
      newErrors.dataProcessing = "Debes autorizar el tratamiento de datos personales";
    }

    return newErrors;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const target = event.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al enviar la postulación");
      }

      setSent(true);
      setFormData({
        name: "", role: "", email: "", phone: "", company: "",
        country: "", companySize: "", consent: false, twentyFiveUsers: false, dataProcessing: false,
      });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Error desconocido");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="formSuccess" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Postulación enviada</p>
        <h3>Tu organización ya dio el primer paso.</h3>
        <p>
          Nuestro equipo revisará la elegibilidad, validará los perfiles
          y se pondrá en contacto para coordinar el kickoff del programa.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setFormData({
              name: "", role: "", email: "", phone: "", company: "",
              country: "", companySize: "", consent: false, twentyFiveUsers: false, dataProcessing: false,
            });
          }}
        >
          Nueva postulación
        </button>
      </div>
    );
  }

  return (
    <form className="registrationForm" onSubmit={handleSubmit} noValidate>
      <div className="formRow">
        <label>
          Nombre y apellido
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Ej. Andrea Rojas"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <span id="name-error" className="errorMsg" role="alert">{errors.name}</span>}
        </label>
        <label>
          Cargo
          <input
            required
            name="role"
            autoComplete="organization-title"
            placeholder="Ej. Gerente de TI"
            value={formData.role}
            onChange={handleChange}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
          />
          {errors.role && <span id="role-error" className="errorMsg" role="alert">{errors.role}</span>}
        </label>
      </div>
      <div className="formRow">
        <label>
          Correo corporativo
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            placeholder="nombre@empresa.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <span id="email-error" className="errorMsg" role="alert">{errors.email}</span>}
        </label>
        <label>
          Teléfono
          <input
            required
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <span id="phone-error" className="errorMsg" role="alert">{errors.phone}</span>}
        </label>
      </div>
      <div className="formRow">
        <label>
          Empresa
          <input
            required
            name="company"
            autoComplete="organization"
            placeholder="Nombre de la empresa"
            value={formData.company}
            onChange={handleChange}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && <span id="company-error" className="errorMsg" role="alert">{errors.company}</span>}
        </label>
        <label>
          País
          <select
            required
            name="country"
            defaultValue=""
            value={formData.country}
            onChange={handleChange}
            aria-invalid={!!errors.country}
            aria-describedby={errors.country ? "country-error" : undefined}
          >
            <option value="" disabled>Selecciona</option>
            <option>Chile</option>
            <option>Perú</option>
            <option>Otro país de LATAM</option>
          </select>
          {errors.country && <span id="country-error" className="errorMsg" role="alert">{errors.country}</span>}
        </label>
      </div>
      <label>
        Tamaño de la organización
        <select
          required
          name="companySize"
          defaultValue=""
          value={formData.companySize}
          onChange={handleChange}
          aria-invalid={!!errors.companySize}
          aria-describedby={errors.companySize ? "companySize-error" : undefined}
        >
          <option value="" disabled>Selecciona un rango</option>
          <option>30 a 49 colaboradores</option>
          <option>50 a 99 colaboradores</option>
          <option>100 a 299 colaboradores</option>
          <option>300 o más colaboradores</option>
        </select>
        {errors.companySize && <span id="companySize-error" className="errorMsg" role="alert">{errors.companySize}</span>}
      </label>
      <label className="checkField">
        <input
          required
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>Acepto que Last Call me contacte para validar mi participación y enviarme información de esta iniciativa.</span>
        {errors.consent && <span id="consent-error" className="errorMsg" role="alert">{errors.consent}</span>}
      </label>
      <label className="checkField">
        <input
          required
          type="checkbox"
          name="twentyFiveUsers"
          checked={formData.twentyFiveUsers}
          onChange={handleChange}
          aria-invalid={!!errors.twentyFiveUsers}
          aria-describedby={errors.twentyFiveUsers ? "twentyFiveUsers-error" : undefined}
        />
        <span>Confirmo que mi organización destinará hasta 25 usuarios para el programa de 30 días.</span>
        {errors.twentyFiveUsers && <span id="twentyFiveUsers-error" className="errorMsg" role="alert">{errors.twentyFiveUsers}</span>}
      </label>
      <label className="checkField">
        <input
          required
          type="checkbox"
          name="dataProcessing"
          checked={formData.dataProcessing}
          onChange={handleChange}
          aria-invalid={!!errors.dataProcessing}
          aria-describedby={errors.dataProcessing ? "dataProcessing-error" : undefined}
        />
        <span>Autorizo el tratamiento de mis datos personales según la política de privacidad de Last Call.</span>
        {errors.dataProcessing && <span id="dataProcessing-error" className="errorMsg" role="alert">{errors.dataProcessing}</span>}
      </label>
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />
      {submitError && <div className="errorMsg" role="alert" style={{ gridColumn: "1 / -1", textAlign: "center" }}>{submitError}</div>}
      <button className="formSubmit" type="submit" disabled={submitting}>
        {submitting ? "Enviando postulación…" : "Enviar postulación"}
      </button>
      <p className="formNote">La información se gestiona mediante Microsoft Power Automate bajo estricta confidencialidad.</p>
    </form>
  );
}