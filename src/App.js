import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/SideBar";
import Indicators from "./components/Indicators/Indicators";
import Tabs from "./components/tabs/Tabjs";
import EmailViewer from "./components/emailViewer/EmailViewer";
import WeatherClockLocation from "./components/weatherClockLocation/weatherClockLocation";

// Listas
import EmailListActivos from "./components/emailList/EmailListActivos";
import EmailListUsados from "./components/emailList/EmailListUsados";
import EmailListSocial from "./components/emailListSocial/EmailListSocial";
import EmailListPromotions from "./components/emailListPromotions/EmailListPromotions";
import EmailListStarred from "./components/emailList/EmailListStarred";

// Popup Win95
import PopupWindow95 from "./components/popUpWindow95/PopUpWindows95";

// Sonidos, estilos y Music
import "./styles.css";
import Click from "./Sound/Click.wav";
import NewMail from "./Sound/NewMail.wav";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";

const App = () => {
  // ==============================
  // MÉTRICAS
  // ==============================
  const [credibilidad, setCredibilidad] = useState(100);
  const [polarizacion, setPolarizacion] = useState(50);
  const [economia, setEconomia] = useState(70);

  // ==============================
  // LISTA ACTIVA => "principal", "social", "promotions", "starred"
  // ==============================
  const [activeList, setActiveList] = useState("principal");

  // ==============================
  // POPUPS => Redactar & Error
  // ==============================
  const [showComposePopup, setShowComposePopup] = useState(false);
  const [composeText, setComposeText] = useState("");

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ==============================
  // PRINCIPAL => 3 correos activos
  // ==============================
  const initialPool = [
    {
      id: 1,
      subject: "Crisis económica en el planeta Alpha",
      snippet: "Lee más sobre la reciente crisis...",
      content: "El planeta Alpha enfrenta una grave crisis económica...",
      loop: true,
      cooldown: 2,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: -10, polarizacion: +5, economia: +10 },
        reject:  { credibilidad: +5,  polarizacion: 0,  economia: -5 },
      },
      starred: false,
    },
    {
      id: 2,
      subject: "Avance científico revolucionario",
      snippet: "Un nuevo avance promete energía infinita.",
      content: "Investigadores afirman haber descubierto...",
      loop: false,
      cooldown: 0,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: +10, polarizacion: -5, economia: +15 },
        reject:  { credibilidad: -5,  polarizacion: +5, economia: -10 },
      },
      starred: false,
    },
    {
      id: 3,
      subject: "Reforma en la ley de exploración espacial",
      snippet: "Nuevos límites para las misiones...",
      content: "La asamblea galáctica debate nuevas regulaciones...",
      loop: true,
      cooldown: 0,
      used: false,
      unlocked: true,
      nextAvailableTurn: 0,
      effects: {
        approve: { credibilidad: +2,  polarizacion: +5,  economia: +5 },
        reject:  { credibilidad: -2,  polarizacion: -5,  economia: -2 },
      },
      starred: false,
    },
  ];
  const [pool, setPool] = useState(initialPool);
  const [activeEmails, setActiveEmails] = useState([]);
  const [usedEmails, setUsedEmails] = useState([]);
  const [turn, setTurn] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Al montar => fillActives
  useEffect(() => {
    fillActives();
  }, []);

  const fillActives = () => {
    setActiveEmails((curr) => {
      let newActives = [...curr];
      while (newActives.length < 3) {
        const next = pickNextEmail(newActives);
        if (!next) break;
        newActives.unshift(next);
      }
      return newActives.slice(0, 3);
    });
  };

  const pickNextEmail = (currActives) => {
    const candidates = pool.filter((em) => {
      if (!em.unlocked) return false;
      if (!em.loop && em.used) return false;
      if (em.loop && turn < em.nextAvailableTurn) return false;
      const alreadyActive = currActives.some((a) => a.id === em.id);
      if (alreadyActive) return false;
      return true;
    });
    if (candidates.length === 0) return null;

    const randIndex = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[randIndex];

    if (!chosen.loop) {
      setPool((prev) =>
        prev.map((p) => (p.id === chosen.id ? { ...p, used: true } : p))
      );
    } else {
      setPool((prev) =>
        prev.map((p) =>
          p.id === chosen.id
            ? { ...p, nextAvailableTurn: turn + chosen.cooldown }
            : p
        )
      );
    }
    return {
      ...chosen,
      revisado: false,
      decision: false,
      used: false,
    };
  };

  const handleEmailClick = (email) => {
    setActiveEmails((prev) =>
      prev.map((a) => (a.id === email.id ? { ...a, revisado: true } : a))
    );
    setSelectedEmail(email);
  };

  const handleDecision = (emailId, action) => {
    const email = activeEmails.find((a) => a.id === emailId);
    if (!email) return;

    const fx = email.effects?.[action];
    if (fx) {
      setCredibilidad((c) => Math.max(0, Math.min(100, c + fx.credibilidad)));
      setPolarizacion((p) => Math.max(0, Math.min(100, p + fx.polarizacion)));
      setEconomia((e) => Math.max(0, Math.min(100, e + fx.economia)));
    }

    const decidedEmail = { ...email, used: true, revisado: true, decision: action };
    setActiveEmails((prev) => prev.filter((m) => m.id !== emailId));
    setUsedEmails((prev) => [decidedEmail, ...prev]);
    setTurn((t) => t + 1);

    const newMailAudio = new Audio(NewMail);
    setTimeout(() => {
      fillActives();
      newMailAudio.play().catch(() => {});
    }, 500);

    setSelectedEmail(null);
  };

  const handleToggleStarPrincipal = (emailId) => {
    setActiveEmails((prev) =>
      prev.map((em) => (em.id === emailId ? { ...em, starred: !em.starred } : em))
    );
    setPool((prev) =>
      prev.map((em) => (em.id === emailId ? { ...em, starred: !em.starred } : em))
    );
  };

  // ==============================
  // SOCIAL
  // ==============================
  const initialSocialPool = [
    {
      id: 101,
      subject: "Invitación a evento social",
      snippet: "Fiesta galáctica el próximo sábado...",
      content: "Correo social #1...",
      revisado: false,
      starred: false,
    },
    {
      id: 102,
      subject: "Reunión de vecinos estelares",
      snippet: "Nos juntamos a celebrar...",
      content: "Correo social #2...",
      revisado: false,
      starred: false,
    },
  ];
  const [socialPool, setSocialPool] = useState(initialSocialPool);
  const [selectedEmailSocial, setSelectedEmailSocial] = useState(null);

  const handleEmailClickSocial = (email) => {
    setSocialPool((prev) =>
      prev.map((m) => (m.id === email.id ? { ...m, revisado: true } : m))
    );
    setSelectedEmailSocial(email);
  };
  const handleToggleStarSocial = (emailId) => {
    setSocialPool((prev) =>
      prev.map((em) => (em.id === emailId ? { ...em, starred: !em.starred } : em))
    );
  };

  // ==============================
  // PROMOTIONS
  // ==============================
  const initialPromotionsPool = [
    {
      id: 201,
      subject: "Descuentos interestelares",
      snippet: "Ofertas de viaje...",
      content: "Promociones en rutas galácticas.",
      revisado: false,
      starred: false,
    },
    {
      id: 202,
      subject: "Cupón especial",
      snippet: "Descuento del 20%...",
      content: "Promoción limitada.",
      revisado: false,
      starred: false,
    },
  ];
  const [promotionsPool, setPromotionsPool] = useState(initialPromotionsPool);
  const [selectedEmailPromo, setSelectedEmailPromo] = useState(null);

  const handleEmailClickPromo = (email) => {
    setPromotionsPool((prev) =>
      prev.map((m) => (m.id === email.id ? { ...m, revisado: true } : m))
    );
    setSelectedEmailPromo(email);
  };
  const handleToggleStarPromo = (emailId) => {
    setPromotionsPool((prev) =>
      prev.map((em) => (em.id === emailId ? { ...em, starred: !em.starred } : em))
    );
  };

  // ==============================
  // STARRED => recolectar de principal, social, promotions
  // ==============================
  const [selectedEmailStarred, setSelectedEmailStarred] = useState(null);

  const getAllStarredEmails = () => {
    // principal => de activeEmails, usedEmails, pool
    const principalStarred = [
      ...activeEmails.filter((e) => e.starred),
      ...usedEmails.filter((e) => e.starred),
      ...pool.filter((p) => p.starred && !p.used),
    ];
    // social
    const socialStar = socialPool.filter((s) => s.starred);
    // promos
    const promoStar = promotionsPool.filter((p) => p.starred);

    return [...principalStarred, ...socialStar, ...promoStar];
  };

  const handleEmailClickStarred = (email) => {
    setSelectedEmailStarred(email);
  };
  const handleToggleStarGeneric = (emailId) => {
    // revisamos dónde está ese correo
    if (pool.some((p) => p.id === emailId)) {
      handleToggleStarPrincipal(emailId);
    } else if (socialPool.some((p) => p.id === emailId)) {
      handleToggleStarSocial(emailId);
    } else if (promotionsPool.some((p) => p.id === emailId)) {
      handleToggleStarPromo(emailId);
    }
  };

  // ==============================
  // Popup Compose
  // ==============================
  const handleOpenCompose = () => {
    setShowComposePopup(true);
  };
  const handleCloseCompose = () => {
    setShowComposePopup(false);
    setComposeText("");
  };
  const handleSendCompose = () => {
    if (!composeText.trim()) {
      setErrorMessage("No puedes enviar un correo vacío.");
      setShowComposePopup(false);
      setShowErrorPopup(true);
      return;
    }
    alert("Correo enviado (fingido):\n" + composeText);
    setShowComposePopup(false);
    setComposeText("");
  };

  // Popup error
  const handleCloseError = () => {
    setShowErrorPopup(false);
    setErrorMessage("");
  };

  // ==============================
  // Audio Clic
  // ==============================
  const clickAudioRef = useRef(null);
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

  // ==============================
  // Efecto Luces
  // ==============================
  useEffect(() => {
    let overlayOpacity = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--overlay-opacity")
    );
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const specialEventsTimer = async () => {
      const overlayOpacityVariation = Math.min(1, overlayOpacity + 0.1);
      document.documentElement.style.setProperty("--overlay-opacity", overlayOpacityVariation);
      overlayOpacity = overlayOpacityVariation;
      await delay(1000);
    };
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

  // Capturar mouse => animación
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

  // ==============================
  // RENDER => MANTENER LA ESTRUCTURA
  // ==============================
  let starredEmails = [];
  if (activeList === "starred") {
    starredEmails = getAllStarredEmails();
  }

  return (
    <div>
      {/* POPUP "Redactar" */}
      {showComposePopup && (
        <PopupWindow95 title="Redactar" onClose={handleCloseCompose}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              style={{ width: "300px", height: "150px" }}
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              placeholder="Escribe tu correo aquí..."
            />
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={handleSendCompose}>Enviar</button>
              <button onClick={handleCloseCompose}>Cerrar</button>
            </div>
          </div>
        </PopupWindow95>
      )}

      {/* POPUP Error */}
      {showErrorPopup && (
        <PopupWindow95 title="Error" onClose={handleCloseError}>
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          <button onClick={handleCloseError}>Cerrar</button>
        </PopupWindow95>
      )}

      <div className="ligthsOut"></div>
      <div className="gmail-container">
        {/* Encabezado */}
        <header className="header">
          <div className="header-left">
            <button className="hamburger">&#9776;</button>
            <img src="gmail-logo.png" alt="Gmail" className="logo" />
          </div>
          <div className="header-center">
            <input type="text" placeholder="Buscar en correos" />
          </div>
          <div className="header-right">
            <button className="apps" onClick={() => alert("Abrir 'Apps' (fingido)")}>🔳</button>
            <button className="profile" onClick={() => alert("Ver perfil (fingido)")}>👤</button>
          </div>
        </header>

        {/* Indicadores */}
        <Indicators
          credibilidad={credibilidad}
          polarizacion={polarizacion}
          economia={economia}
        />

        <div className="content">
          {/* Sidebar a la izquierda */}
          <Sidebar
            economia={economia}
            credibilidad={credibilidad}
            polarizacion={polarizacion}
            onCompose={() => setShowComposePopup(true)}
            onShowError={() => {
              setErrorMessage("Error fingido.");
              setShowErrorPopup(true);
            }}
            onShowStarred={() => setActiveList("starred")}
          />

          {/* Sección principal => TABS + Lista */}
          <main className="email-section">
            <Tabs activeList={activeList} setActiveList={setActiveList} />

            {activeList === "principal" && (
              <>
                <h2>Correos Activos</h2>
                <EmailListActivos
                  emails={activeEmails}
                  onEmailClick={handleEmailClick}
                  onToggleStar={handleToggleStarPrincipal}
                />

                <h2>Historial (Usados)</h2>
                <EmailListUsados
                  emails={usedEmails}
                  onToggleStar={handleToggleStarPrincipal}
                />
              </>
            )}

            {activeList === "social" && (
              <>
                <h2>Correos Sociales</h2>
                <EmailListSocial
                  emails={socialPool}
                  onEmailClick={handleEmailClickSocial}
                  onToggleStar={handleToggleStarSocial}
                />
              </>
            )}

            {activeList === "promotions" && (
              <>
                <h2>Promociones</h2>
                <EmailListPromotions
                  emails={promotionsPool}
                  onEmailClick={handleEmailClickPromo}
                  onToggleStar={handleToggleStarPromo}
                />
              </>
            )}

            {activeList === "starred" && (
              <>
                <h2>Destacados</h2>
                <EmailListStarred
                  emails={starredEmails}
                  onEmailClick={handleEmailClickStarred}
                  onToggleStar={handleToggleStarGeneric}
                />
              </>
            )}
          </main>

          {/* Visor a la derecha */}
          <EmailViewer
            email={
              activeList === "principal"
                ? selectedEmail
                : activeList === "social"
                ? selectedEmailSocial
                : activeList === "promotions"
                ? selectedEmailPromo
                : activeList === "starred"
                ? selectedEmailStarred
                : null
            }
            handleDecision={
              activeList === "principal" ? handleDecision : null
            }
            onToggleStar={
              activeList === "principal"
                ? handleToggleStarPrincipal
                : activeList === "social"
                ? handleToggleStarSocial
                : activeList === "promotions"
                ? handleToggleStarPromo
                : activeList === "starred"
                ? handleToggleStarGeneric
                : null
            }
            goBack={() => {
              if (activeList === "principal") setSelectedEmail(null);
              else if (activeList === "social") setSelectedEmailSocial(null);
              else if (activeList === "promotions") setSelectedEmailPromo(null);
              else if (activeList === "starred") setSelectedEmailStarred(null);
            }}
          />

          {/* WeatherClockLocation en la misma fila, 
              si lo quieres abajo del visor, podrías moverlo 
              a otra parte */}
          <WeatherClockLocation />
        </div>
      </div>
    </div>
  );
};

export default App;
