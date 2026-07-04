import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    empresa: "",
    servicio: "",
    mensaje: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo);

    if (!form.nombre || !form.correo || !form.servicio || !form.mensaje) {
      alert("Completa los campos obligatorios");
      return;
    }

    if (!emailValido) {
      alert("Ingresa un correo válido (ej: nombre@gmail.com)");
      return;
    }

    alert("Mensaje enviado a BrawlSoft");
    console.log("Contacto recibido:", form);

    setForm({
      nombre: "",
      correo: "",
      empresa: "",
      servicio: "",
      mensaje: "",
    });
  };

  return (
    <div className="container">
      <header className="hero">
        <h1>BrawlSoft</h1>
        <p className="subtitle">
          Construimos software moderno para empresas que quieren crecer en el mundo digital.
        </p>

        <div className="hero-buttons">
          <button onClick={() => document.getElementById("servicios").scrollIntoView({ behavior: "smooth" })}>
            Ver Más Detalles
          </button>

          <button className="secondary" onClick={() => document.getElementById("contacto").scrollIntoView({ behavior: "smooth" })}>
            Contáctanos
          </button>
        </div>
      </header>

      <section id="servicios">
        <h2>Nuestros Servicios</h2>
        <p className="subtitle">
          Diseñamos soluciones digitales enfocadas en rendimiento, escalabilidad y experiencia de usuario.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Web Apps</h3>
            <p>Aplicaciones web modernas, rápidas y responsivas para empresas.</p>
          </div>

          <div className="card">
            <h3>Mobile Apps</h3>
            <p>Aplicaciones móviles para Android y iOS con experiencia optimizada.</p>
          </div>

          <div className="card">
            <h3>Cloud</h3>
            <p>Infraestructura en la nube segura y escalable para negocios digitales.</p>
          </div>

          <div className="card">
            <h3>Soporte</h3>
            <p>Mantenimiento y soporte continuo para sistemas en producción.</p>
          </div>
        </div>
      </section>

<section>
  <h2>Servicios disponibles</h2>
  <p className="subtitle">
    Soluciones digitales cargadas desde nuestra arquitectura MultiCloud.
  </p>

        <div className="grid">
          {productos.length === 0 ? (
            <div className="card">No hay productos registrados todavía.</div>
          ) : (
            productos.map((producto) => (
              <div className="card" key={producto._id}>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p><strong>Categoría:</strong> {producto.categoria}</p>
                <p><strong>Desde:</strong> ${producto.precio.toLocaleString("es-CL")}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2>Proyectos</h2>
        <div className="grid">
          <div className="card">
            <h3>Sistema de Delivery</h3>
            <p>Plataforma para pedidos y gestión de entregas en tiempo real.</p>
          </div>

          <div className="card">
            <h3>Gestión de Inventario</h3>
            <p>Sistema para control de stock y productos en empresas.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Beneficios</h2>
        <div className="grid">
          <div className="card">Diseño moderno y escalable</div>
          <div className="card">Sistemas seguros</div>
          <div className="card">Alto rendimiento</div>
          <div className="card">Interfaces intuitivas</div>
        </div>
      </section>

      <section id="contacto">
        <h2>Contacto</h2>

        <form onSubmit={handleSubmit} className="form">
          <input name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} />
          <input name="correo" placeholder="Correo *" value={form.correo} onChange={handleChange} />
          <input name="empresa" placeholder="Empresa (opcional)" value={form.empresa} onChange={handleChange} />

          <select name="servicio" value={form.servicio} onChange={handleChange}>
            <option value="">Servicio de interés *</option>
            <option value="web">Web Apps</option>
            <option value="mobile">Mobile Apps</option>
            <option value="cloud">Cloud</option>
            <option value="soporte">Soporte</option>
          </select>

          <textarea name="mensaje" placeholder="Cuéntanos tu proyecto *" value={form.mensaje} onChange={handleChange} />

          <button type="submit">Enviar mensaje</button>
        </form>
      </section>
    </div>
  );
}

export default App;