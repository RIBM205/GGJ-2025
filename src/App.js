import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/SideBar";
import Indicators from "./components/Indicators/Indicators";
import Tabs from "./components/tabs/Tabjs";
import EmailViewer from "./components/emailViewer/EmailViewer";
import WeatherClockLocation from "./components/weatherClockLocation/weatherClockLocation";
// Nuestras dos listas separadas
import EmailListActivos from "./components/emailList/EmailListActivos";
import EmailListUsados from "./components/emailList/EmailListUsados";

import "./styles.css";

// Sonidos
import Click from "./Sound/Click.wav";
import NewMail from "./Sound/NewMail.wav";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
const App = () => {
  // ==============================
  // MÉTRICAS DEL JUEGO
  // ==============================
  const [credibilidad, setCredibilidad] = useState(100);
  const [polarizacion, setPolarizacion] = useState(50);
  const [economia, setEconomia] = useState(70);

  // ==============================
  // DATOS (POOL) DE TODOS LOS CORREOS
  // ==============================
  const initialPool = [
    {
      id: 1,
      subject: "Crisis económica en el planeta Alpha",
      snippet: "Lee más sobre la reciente crisis...",
      content: `El planeta Alpha enfrenta una grave crisis económica...`,
      loop: true,             // repetible
      cooldown: 2,           // cada 2 “turns” puede reaparecer
      used: false,           // en el pool: si es único y se usó, se marca true
      unlocked: true,        // si está habilitado al inicio
      nextAvailableTurn: 0,  // para cooldown
      effects: {
        approve: { credibilidad: -10, polarizacion: +5,  economia: +10 },
        reject:  { credibilidad: +5,  polarizacion:  0,  economia: -5  },
      },
    },
    {
      id: 2,
      subject: "Avance científico revolucionario",
      snippet: "Un nuevo avance promete energía infinita.",
      content: `Investigadores afirman haber descubierto...`,
      loop: false,           // único
      cooldown: 0,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: +10, polarizacion: -5, economia: +15 },
        reject:  { credibilidad: -5,  polarizacion: +5, economia: -10 },
      },
    },
    {
      id: 3,
      subject: "Reforma en la ley de exploración espacial",
      snippet: "Nuevos límites para las misiones internacionales.",
      content: `La asamblea galáctica debate nuevas regulaciones...`,
      loop: true,
      cooldown: 0,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: +2,  polarizacion: +5,  economia: +5 },
        reject:  { credibilidad: -2,  polarizacion: -5,  economia: -2 },
      },
    },
    {
      id: 4,
      subject: "Descubrimiento de vida microbiana",
      snippet: "Se ha hallado vida en las lunas de Beta.",
      content: `Un equipo de científicos confirma la presencia de microbios...`,
      loop: true,
      cooldown: 3,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: +5, polarizacion: -3,  economia: +2 },
        reject:  { credibilidad: -5, polarizacion: +3,  economia: -2 },
      },
    },
    {
      id: 5,
      subject: "Nuevas rutas comerciales",
      snippet: "Las rutas con Gamma se amplían.",
      content: `Los líderes del sistema Gamma firman un nuevo tratado...`,
      loop: true,
      cooldown: 0,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: +5,  polarizacion: -2,  economia: +10 },
        reject:  { credibilidad: -5,  polarizacion: +2,  economia: -10 },
      },
    },
    // ... Agrega más si deseas
  ];

  // POOL => todos los correos
  const [pool, setPool] = useState(initialPool);

  // LISTA DE CORREOS ACTIVOS (máx 3, con botones)
  const [activeEmails, setActiveEmails] = useState([]);

  // LISTA DE CORREOS USADOS (historial, sin botones)
  const [usedEmails, setUsedEmails] = useState([]);

  // Contador de turnos (decisiones) para cooldown
  const [turn, setTurn] = useState(0);

  // Correo seleccionado para ver en EmailViewer
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Refs de audio
  const clickAudioRef = useRef(null);
  const newMailAudioRef = useRef(null);

  // Al montar => rellenar la lista de correos activos
  useEffect(() => {
    fillActives();
  }, []);

  // ==========================================
  // fillActives => rellena hasta 3 correos activos
  // ==========================================
  const fillActives = () => {
    setActiveEmails((currActives) => {
      let newActives = [...currActives];

      // Mientras haya menos de 3, intenta sacar otro correo
      while (newActives.length < 3) {
        const next = pickNextEmail(newActives);
        if (!next) break;

        // lo agregamos al inicio => aparece “arriba”
        newActives.unshift(next);
      }

      // Por seguridad, si pasara de 3 (poco probable),
      // cortamos a 3
      return newActives.slice(0, 3);
    });
  };

  // ==========================================
  // pickNextEmail => elige 1 correo del pool
  //   que no esté duplicado como activo,
  //   que cumpla cooldown, etc.
  // ==========================================
  const pickNextEmail = (currentActives) => {
    // 1) Filtrar candidatos
    const candidates = pool.filter((em) => {
      // Debe estar desbloqueado
      if (!em.unlocked) return false;
      // Si es único y ya se marcó used en pool
      if (!em.loop && em.used) return false;
      // Si es repetible y cooldown no se cumple
      if (em.loop && turn < em.nextAvailableTurn) return false;

      // Evitar duplicado activo
      const alreadyActive = currentActives.some((a) => a.id === em.id);
      if (alreadyActive) return false;

      return true;
    });

    if (candidates.length === 0) {
      return null;
    }

    // 2) Escoger uno aleatorio
    const randIndex = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[randIndex];

    // 3) Si es único => en el pool se marca used=true
    if (!chosen.loop) {
      setPool((prevPool) =>
        prevPool.map((p) =>
          p.id === chosen.id ? { ...p, used: true } : p
        )
      );
    } else {
      // repetible => definimos cooldown
      setPool((prevPool) =>
        prevPool.map((p) =>
          p.id === chosen.id
            ? { ...p, nextAvailableTurn: turn + chosen.cooldown }
            : p
        )
      );
    }

    // 4) Creamos la instancia activa
    return {
      ...chosen,
      revisado: false,
      decision: false,
      used: false, // dentro de "activeEmails", used=false => se puede usar
    };
  };

  // ==========================================
  // handleEmailClick => abrir un correo (marcar leído)
  // ==========================================
  const handleEmailClick = (email) => {
    // Marcar revisado en la lista activa
    setActiveEmails((prev) =>
      prev.map((a) =>
        a.id === email.id ? { ...a, revisado: true } : a
      )
    );
    setSelectedEmail(email);
  };

  // ==========================================
  // handleDecision => el usuario Aprueba/Rechaza
  //   => mover de activeEmails a usedEmails
  // ==========================================
  const handleDecision = (emailId, action) => {
    const email = activeEmails.find((a) => a.id === emailId);
    if (!email) return;

    // Aplica efectos de la decisión
    const fx = email.effects[action];
    if (fx) {
      setCredibilidad((prev) => Math.max(0, Math.min(100, prev + fx.credibilidad)));
      setPolarizacion((prev) => Math.max(0, Math.min(100, prev + fx.polarizacion)));
      setEconomia((prev) => Math.max(0, Math.min(100, prev + fx.economia)));
    }

    // Marcarlo como “used” en la lista activa (para sacarlo)
    // y moverlo a usedEmails
    const decidedEmail = {
      ...email,
      used: true,
      revisado: true,
      decision: action,
    };

    // 1) Sacar de la lista activa
    setActiveEmails((prev) => prev.filter((a) => a.id !== emailId));

    // 2) Agregarlo a la lista de usados (puede haber duplicados
    //    si loop:true y aparece muchas veces)
    setUsedEmails((prev) => [decidedEmail, ...prev]);

    // 3) Subir el contador de turn => cooldown
    setTurn((prev) => prev + 1);

    // 4) Rellenar la lista de activos
    newMailAudioRef.current = new Audio(NewMail);
    setTimeout(() => {
      fillActives();
      newMailAudioRef.current.play().catch(() => {});
    }, 500);

    // 5) Cerrar panel de lectura
    setSelectedEmail(null);
  };

  // ============================
  // Manejar audio de clic (izq/der)
  // ============================
  useEffect(() => {
    clickAudioRef.current = new Audio(Click);
    const mouseDownHandler = (e) => {
      if (e.button === 0 || e.button === 2) {
        clickAudioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("mousedown", mouseDownHandler);
    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  // ============================
  // Efecto opacidad (specialEventsTimer)
  // ============================
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let overlayOpacity = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--overlay-opacity")
  );

  
  const specialEventsTimer = async () => {
    const overlayOpacityVariation = Math.min(1, overlayOpacity + 0.1); // Ensure opacity does not exceed 1
    document.documentElement.style.setProperty("--overlay-opacity", overlayOpacityVariation);
    overlayOpacity = overlayOpacityVariation; // Update overlayOpacity for the next iteration
    await delay(1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      specialEventsTimer();
      if (economia < 60) {
        document.documentElement.style.setProperty("--ligths", "visible");
      } else {
        document.documentElement.style.setProperty("--ligths", "hidden");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [economia]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--pointerX", e.clientX + "px");
      document.documentElement.style.setProperty("--pointerY", e.clientY + "px");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ============================
  // RENDER
  // ============================
  return (
    <div>
      <div className="ligthsOut"></div>
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
        <Sidebar 
  economia={economia} 
  credibilidad={credibilidad} 
  polarizacion={polarizacion} 
/>

          <main className="email-section">
            <Tabs />

            {/* 1) Lista de correos activos (máx 3) */}
            <h2>Correos Activos</h2>
            <EmailListActivos
              emails={activeEmails}
              onEmailClick={handleEmailClick}
            />

            {/* 2) Lista de correos usados (historial) */}
            <h2>Historial (Usados)</h2>
            <EmailListUsados
              emails={usedEmails}
            />
          </main>

          {/* Panel de lectura */}
          <EmailViewer
            email={selectedEmail}
            handleDecision={handleDecision}
            goBack={() => setSelectedEmail(null)}
          
          />
            <WeatherClockLocation />
        </div>
      </div>
    </div>
  );
};

export default App;
