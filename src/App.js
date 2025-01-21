import React, { useState } from "react";
import Indicators from "./components/indicators/Indicators";
import Sidebar from "./components/sidebar/SideBar";
import EmailList from "./components/emailList/EmailList";
import EmailViewer from "./components/emailViewer/EmailViewer";
import Tabs from "./components/tabs/Tabjs.jsx";
import "./styles.css"; // Asegúrate de importar los estilos si usas create-react-app

const App = () => {
  // ==================================
  // Estados de las métricas del juego
  // ==================================
  const [credibilidad, setCredibilidad] = useState(100);
  const [polarizacion, setPolarizacion] = useState(50);
  const [economia, setEconomia] = useState(70);

  // =========================
  // Lista completa de correos
  // =========================
  const allEmailsData = [
    {
      id: 1,
      subject: "Crisis económica en el planeta Alpha",
      snippet: "Lee más sobre la reciente crisis...",
      content: `
        El planeta Alpha está enfrentando una grave crisis económica debido a la escasez de recursos.
        Los gobiernos están en disputa sobre cómo manejar la situación.
      `,
      revisado: false,
      effects: {
        approve: { credibilidad: -10, polarizacion: +5,  economia: +10 },
        reject:  { credibilidad: +5,  polarizacion:  0,  economia: -5  },
      },
    },
    {
      id: 2,
      subject: "Avance científico revolucionario",
      snippet: "Un nuevo avance promete energía infinita.",
      content: `
        Investigadores afirman haber descubierto una nueva fuente de energía renovable que podría cambiar el destino del planeta.
      `,
      revisado: false,
      effects: {
        approve: { credibilidad: +10, polarizacion: -5,  economia: +15 },
        reject:  { credibilidad: -5,  polarizacion: +5,  economia: -10 },
      },
    },
    {
      id: 3,
      subject: "Reforma en la ley de exploración espacial",
      snippet: "Nuevos límites para las misiones internacionales.",
      content: `
        La asamblea galáctica debate nuevas regulaciones sobre los viajes y exploraciones espaciales
        para evitar conflictos territoriales y escasez de recursos en el futuro.
      `,
      revisado: false,
      effects: {
        approve: { credibilidad: +2, polarizacion: +5,  economia: +5 },
        reject:  { credibilidad: -2, polarizacion: -5,  economia: -2 },
      },
    },
    {
      id: 4,
      subject: "Descubrimiento de vida microbiana",
      snippet: "Se ha hallado vida en las lunas de Beta.",
      content: `
        Un equipo de científicos confirma la presencia de microbios en las zonas subterráneas
        de las lunas del sistema Beta, marcando un hito en la búsqueda de vida.
      `,
      revisado: false,
      effects: {
        approve: { credibilidad: +5, polarizacion: -3,  economia: +2 },
        reject:  { credibilidad: -5, polarizacion: +3,  economia: -2 },
      },
    },
    {
      id: 5,
      subject: "Nuevas rutas comerciales",
      snippet: "Las rutas comerciales con Gamma se amplían.",
      content: `
        Los líderes del sistema Gamma firman un nuevo tratado para abrir rutas de comercio
        y compartir recursos con el resto de la galaxia.
      `,
      revisado: false,
      effects: {
        approve: { credibilidad: +5, polarizacion: -2,  economia: +10 },
        reject:  { credibilidad: -5, polarizacion: +2,  economia: -10 },
      },
    },
    // ... Puedes agregar más correos si deseas
  ];

  // =========================
  // Correos cargados y visibles
  // =========================
  // Iniciamos con los primeros 3 (3 sin leer)
  const [emails, setEmails] = useState(allEmailsData.slice(0, 3));
  // Índice que señala el próximo correo a cargar
  const [nextEmailIndex, setNextEmailIndex] = useState(3);

  // Correo seleccionado para ver en el panel derecho
  const [selectedEmail, setSelectedEmail] = useState(null);

  // ==================================================
  // Cuando se hace clic en un correo de la lista:
  //   1) Lo marcamos como leído (revisado = true)
  //   2) Vemos cuántos sin leer quedan
  //   3) Si hay < 3 sin leer y quedan correos, cargamos otro
  // ==================================================
  const handleEmailClick = (email) => {
    if (!email.revisado) {
      // Marcarlo como leído
      const updatedEmails = emails.map((e) =>
        e.id === email.id ? { ...e, revisado: true } : e
      );
      setEmails(updatedEmails);

      // Ver cuántos sin leer quedan
      const unreadCount = updatedEmails.filter((e) => !e.revisado).length;
      // Cargar uno nuevo si quedan menos de 3 y hay correos disponibles
      if (unreadCount < 3 && nextEmailIndex < allEmailsData.length) {
        const newEmail = allEmailsData[nextEmailIndex];
        setNextEmailIndex((prev) => prev + 1);
        setEmails([...updatedEmails, newEmail]);
      }
    }

    // Seleccionar para mostrar en vista lateral
    setSelectedEmail(email);
  };

  // ==================================================
  // Maneja la decisión del jugador (Aprobar/Rechazar)
  // y aplica los cambios en métricas
  // ==================================================
  const handleDecision = (emailId, action) => {
    const email = emails.find((em) => em.id === emailId);
    if (!email) return;

    const effects = email.effects[action];
    if (!effects) return;

    // Ajustamos métricas
    setCredibilidad((prev) => Math.max(0, Math.min(100, prev + effects.credibilidad)));
    setPolarizacion((prev) => Math.max(0, Math.min(100, prev + effects.polarizacion)));
    setEconomia((prev) => Math.max(0, Math.min(100, prev + effects.economia)));

    // Cierra el panel de lectura
    setSelectedEmail(null);
  };

  return (
    <div className="gmail-container">
      <header className="header">
        <div className="header-left">
          <button className="hamburger">&#9776;</button>
          <img src="gmail-logo.png" alt="Gmail" className="logo" />
        </div>
        <div className="header-center">
          <input type="text" placeholder="Buscar en correos" />
        </div>
        <div className="header-right">
          <button className="apps">🔳</button>
          <button className="profile">👤</button>
        </div>
      </header>

      <Indicators
        credibilidad={credibilidad}
        polarizacion={polarizacion}
        economia={economia}
      />

      <div className="content">
        <Sidebar />
        <main className="email-section">
          <Tabs />
          <EmailList emails={emails} onEmailClick={handleEmailClick} />
        </main>
        <EmailViewer
          email={selectedEmail}
          handleDecision={handleDecision}
          goBack={() => setSelectedEmail(null)}
        />
      </div>
    </div>
  );
};

export default App;
