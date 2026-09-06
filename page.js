"use client";

import { useMemo, useState } from "react";
import "./styles.css";

const categories = [
  "Supermercado",
  "Comida",
  "Transporte",
  "Salud",
  "Hogar",
  "Entretenimiento",
  "Otros",
];

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formattedAmount = useMemo(() => {
    if (!amount) return "—";
    const number = Number(String(amount).replace(",", "."));
    if (Number.isNaN(number)) return amount;
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    }).format(number);
  }, [amount]);

  function handleImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl(URL.createObjectURL(file));
    setFileName(file.name);
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  function resetForm() {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    setImageUrl("");
    setFileName("");
    setAmount("");
    setCategory("");
    setDate("");
    setSubmitted(false);
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="eyebrow">Registro manual</div>
        <h1>Cargar ticket de compra</h1>
        <p>
          Adjuntá una foto y completá los datos principales. La información
          permanece únicamente en esta pantalla y no se guarda.
        </p>
      </section>

      <section className="workspace">
        <form className="card form-card" onSubmit={handleSubmit}>
          <div className="card-heading">
            <div>
              <span className="step">01</span>
              <h2>Foto del ticket</h2>
            </div>
            <span className="optional">JPG, PNG o WEBP</span>
          </div>

          <label className={`upload-zone ${imageUrl ? "has-image" : ""}`}>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImage}
              required
            />
            {imageUrl ? (
              <div className="preview-wrap">
                <img src={imageUrl} alt="Vista previa del ticket" />
                <div className="preview-meta">
                  <strong>{fileName}</strong>
                  <span>Tocá para cambiar la imagen</span>
                </div>
              </div>
            ) : (
              <div className="upload-content">
                <div className="upload-icon">＋</div>
                <strong>Seleccionar foto</strong>
                <span>o arrastrar un archivo hasta acá</span>
              </div>
            )}
          </label>

          <div className="divider" />

          <div className="card-heading">
            <div>
              <span className="step">02</span>
              <h2>Datos de la compra</h2>
            </div>
          </div>

          <div className="fields">
            <label>
              <span>Monto</span>
              <div className="input-prefix">
                <b>$</b>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSubmitted(false);
                  }}
                  required
                />
              </div>
            </label>

            <label>
              <span>Categoría</span>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubmitted(false);
                }}
                required
              >
                <option value="">Seleccionar</option>
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="full-field">
              <span>Fecha</span>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSubmitted(false);
                }}
                required
              />
            </label>
          </div>

          <div className="actions">
            <button type="button" className="secondary" onClick={resetForm}>
              Limpiar
            </button>
            <button type="submit" className="primary">
              Revisar ticket
            </button>
          </div>

          {submitted && (
            <div className="success">
              Listo. Los datos se cargaron sólo en memoria del navegador y no
              fueron enviados ni guardados.
            </div>
          )}
        </form>

        <aside className="card summary-card">
          <div className="summary-top">
            <span className="summary-label">Vista previa</span>
            <span className="status-dot">Sin guardar</span>
          </div>

          <div className="receipt">
            <div className="receipt-line">
              <span>Monto</span>
              <strong>{formattedAmount}</strong>
            </div>
            <div className="receipt-line">
              <span>Categoría</span>
              <strong>{category || "—"}</strong>
            </div>
            <div className="receipt-line">
              <span>Fecha</span>
              <strong>{date || "—"}</strong>
            </div>
            <div className="receipt-line">
              <span>Imagen</span>
              <strong>{fileName ? "Adjunta" : "—"}</strong>
            </div>
          </div>

          <div className="privacy-note">
            <span>Privacidad</span>
            <p>
              Esta demo no tiene base de datos, API ni almacenamiento externo.
              Al recargar la página, la información desaparece.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
