import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/SideBar";
import Indicators from "./components/Indicators/Indicators";
import Tabs from "./components/tabs/Tabjs";
import EmailViewer from "./components/emailViewer/EmailViewer";
import WeatherClockLocation from "./components/weatherClockLocation/weatherClockLocation";

// Listas (se usan "falsas" para las otras pestañas)
import EmailListSocial from "./components/emailListSocial/EmailListSocial";
import EmailListPromotions from "./components/emailListPromotions/EmailListPromotions";
import EmailListStarred from "./components/emailList/EmailListStarred";
import EmailListUsados from "./components/emailList/EmailListUsados";
// Popup Win95
import PopupWindow95 from "./components/popUpWindow95/PopUpWindows95";

// Sonidos, estilos y Music
import "./styles.css";
import Click from "./Sound/Click.wav";
import NewMail from "./Sound/NewMail.wav";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";

/** 
 * EJEMPLO DE HISTORIA: “Tecnología Revolucionaria”
 * - Un correo "intro" que define a cuál de 3 líneas vas (acceso global, monopolio o regulada).
 * - Cada línea con pasos secuenciales (1.1, 1.2, etc.).
 * Ajusta y amplía según tu texto completo.
 */

// Línea A: Acceso global
const storylineAccesoGlobal = [
  {
    id: "1.1",
    subject: "Control sobre la distribución global",
    content: `Hay países que están usando la tecnología sin restricciones...
¿Imponemos un control centralizado o dejamos que cada país administre libremente?`,
    snippet: "¿Control central o libertad total?",
    options: [
      {
        label: "A) Centralizar",
        cred: 0,
        econ: -10,
        polar: -15,
        nextStep: "1.2",
      },
      {
        label: "B) Libertad total",
        cred: +10,
        econ: -10,
        polar: +20,
        nextStep: "1.2",
      },
      {
        label: "C) Comité internacional",
        cred: +5,
        econ: -5,
        polar: -10,
        nextStep: "1.2",
      },
    ],
  },
  {
    id: "1.2",
    subject: "Uso ético de la tecnología",
    snippet: "La tecnología se está usando para armamento avanzado...",
    content: `¿Prohibimos este uso o dejamos libertad?
(A) Prohibir armamento (+15 cred -10 econ +10 polar)
(B) Dejar libertad (-15 cred +20 econ) 
(C) Vender licencias (+0 cred +0 econ +5 polar)`,
    options: [
      {
        label: "Prohibir armamento",
        cred: +15,
        econ: -10,
        polar: +10,
        nextStep: "1.3",
      },
      {
        label: "Dejar libertad",
        cred: -15,
        econ: +20,
        polar: 0,
        nextStep: "1.3",
      },
      {
        label: "Vender licencias",
        cred: 0,
        econ: 0,
        polar: +5,
        nextStep: "1.3",
      },
    ],
  },
  {
    id: "1.3",
    subject: "Fin (ejemplo)",
    snippet: "Has llegado al fin de la línea A (ejemplo).",
    content: `Aquí podrías chequear si credibilidad >80 etc. 
  y mostrar un final. Ajusta para tu 1.3, 1.4, 1.5...`,
    options: [],
  },
];

// Línea B: Monopolio (ejemplo)
const storylineMonopolio = [
  {
    id: "1.1",
    subject: "Decisión: Monopolizar la tecnología",
    snippet: "Has decidido controlar todo el mercado...",
    content: "Consecuencias iniciales... (aquí va tu texto)...",
    options: [
      // ...
    ],
  },
];

// Línea C: Regular (ejemplo)
const storylineRegulada = [
  {
    id: "1.1",
    subject: "Decisión: Regular la tecnología",
    snippet: "Un uso regulado y supervisado.",
    content: "Has elegido un sistema de licencias reguladas...",
    options: [
      // ...
    ],
  },
];
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


/** Correo inicial: El jugador elige a cuál "línea" (A, B o C) ir. */
const initialEmail = {
  id: "intro",
  subject: "Tecnología Revolucionaria: Elige tu enfoque",
  snippet: "Acceso global, Monopolio, o Regulada",
  content: `Un grupo de científicos ha desarrollado una tecnología
capaz de generar energía ilimitada. 
¿Permitir acceso global (línea A), monopolizar (línea B) o regular (línea C)?`,
  options: [
    { label: "Acceso Global", line: "A" },
    { label: "Monopolio", line: "B" },
    { label: "Regulada", line: "C" },
  ],
};

  
function App() {
  // Métricas
  const [credibilidad, setCredibilidad] = useState(100);
  const [polarizacion, setPolarizacion] = useState(50);
  const [economia, setEconomia] = useState(70);

  // Pestañas => "principal", "social", "promotions", "starred"
  const [activeList, setActiveList] = useState("principal");

  // Popup => Redactar & Error
  const [showComposePopup, setShowComposePopup] = useState(false);
  const [composeText, setComposeText] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Lógica lineal:
  // currentLine => "A", "B", o "C"
  // currentStepIndex => índice en la storyline
  const [currentLine, setCurrentLine] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // email "seleccionado" => si el usuario clic en la "lista"
  // (realmente la "lista" es un solo "correo" en principal)
  const [selectedEmail, setSelectedEmail] = useState(null);

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
  // SOCIAL
  // ==============================
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

  // =============== Manejo Audio Clic ===============
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

  // =============== Efecto Luces ===============
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

  // =============== Popup Compose & Error ===============
  const handleOpenCompose = () => setShowComposePopup(true);
  const handleCloseCompose = () => {
    setShowComposePopup(false);
    setComposeText("");
  };
  const handleSendCompose = () => {
    if (!composeText.trim()) {
      setErrorMessage("No puedes enviar un correo vacío.");
      setShowErrorPopup(true);
      setShowComposePopup(false);
      return;
    }
    alert("Correo enviado (fingido): " + composeText);
    setShowComposePopup(false);
    setComposeText("");
  };
  const handleCloseError = () => {
    setShowErrorPopup(false);
    setErrorMessage("");
  };

  // =============== Data de la línea actual ===============
  function getStoryline() {
    if (currentLine === "A") return storylineAccesoGlobal;
    if (currentLine === "B") return storylineMonopolio;
    if (currentLine === "C") return storylineRegulada;
    return null; // si no hay
  }

  function getCurrentStep() {
    if (!currentLine) return initialEmail; // Intro
    const line = getStoryline();
    if (!line || currentStepIndex == null) return null;
    return line[currentStepIndex];
  }

  // =============== Manejo de decisiones lineales ===============
  const handleIntroDecision = (line) => {
    // line => "A", "B", "C"
    setCurrentLine(line);
    setCurrentStepIndex(0);
    setSelectedEmail(null);
  };

  const handleLineDecision = (option) => {
    // option => { label, cred, econ, polar, nextStep }
    setCredibilidad((prev) => Math.max(0, Math.min(100, prev + (option.cred || 0))));
    setPolarizacion((prev) => Math.max(0, Math.min(100, prev + (option.polar || 0))));
    setEconomia((prev) => Math.max(0, Math.min(100, prev + (option.econ || 0))));

    // Buscar nextStep en la storyline actual
    const line = getStoryline();
    if (!line) return;

    const nextIndex = line.findIndex((step) => step.id === option.nextStep);
    if (nextIndex >= 0) {
      setCurrentStepIndex(nextIndex);
      setSelectedEmail(null);
    } else {
      // Si no hay next => final
      alert("Has llegado a un final. Ajusta tu lógica de finales aquí.");
    }
  };

  // =============== “Lista” de correos en "principal" ===============
  // En modo lineal, la “lista” principal tendrá:
  // - El "introEmail" si currentLine = null
  // - O el step actual de la storyline si currentLine != null
  // (Podrías mostrar "historial" si deseas)
  const [selectedEmailStarred, setSelectedEmailStarred] = useState(null);

  // "Favoritos" => no implemento la lógica entera, solo placeholders
  const getAllStarredEmails = () => [];

  // =============== RENDER ===============
  let starredEmails = [];
  if (activeList === "starred") {
    starredEmails = getAllStarredEmails();
  }

  // “currentStep” => el correo actual en la línea o el “intro” si no eligió
  const currentStep = getCurrentStep();

  return (
    <div>
      {/* Popup “Redactar” */}
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

      {/* Popup “Error” */}
      {showErrorPopup && (
        <PopupWindow95 title="Error" onClose={handleCloseError}>
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          <button onClick={handleCloseError}>Cerrar</button>
        </PopupWindow95>
      )}

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
            <button className="apps" onClick={() => alert("Abrir 'Apps' (fingido)")}>🔳</button>
            <button className="profile" onClick={() => alert("Ver perfil (fingido)")}>👤</button>
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
            onCompose={() => setShowComposePopup(true)}
            onShowError={() => {
              setErrorMessage("Error fingido");
              setShowErrorPopup(true);
            }}
            onShowStarred={() => setActiveList("starred")}
          />

          <main className="email-section">
            <Tabs activeList={activeList} setActiveList={setActiveList} />

            {/* Pestaña principal => Muestra “currentStep” o “introEmail” */}
            {activeList === "principal" && (
              <>
                <h2>Línea Principal</h2>
                <div className="email-list">
                  {/* “Lista” con un solo correo => currentStep */}
                  {currentStep && (
                    <div
                      className="email-item"
                      onClick={() => setSelectedEmail(currentStep)}
                      style={{ marginBottom: "1rem" }}
                    >
                      <span className="subject">{currentStep.subject}</span>
                      <span className="snippet">{currentStep.snippet}</span>
                    </div>
                  )}
                </div>

                <h2>Historial (Usados)</h2>
                {/* No hay “usados” en lineal, 
                    podrías mostrar “pasos previos” si quisieras */}
                <EmailListUsados emails={[]} />
              </>
            )}

            {activeList === "social" && (
              <>
                <h2>Correos Sociales</h2>
                <EmailListSocial
                  emails={socialPool}
                  onEmailClick={(em) => setSelectedEmailSocial(em)}
                />
              </>
            )}

            {activeList === "promotions" && (
              <>
                <h2>Promociones</h2>
                <EmailListPromotions
                  emails={promotionsPool}
                  onEmailClick={(em) => setSelectedEmailPromo(em)}
                />
              </>
            )}

            {activeList === "starred" && (
              <>
                <h2>Destacados</h2>
                <EmailListStarred
                  emails={starredEmails}
                  onEmailClick={(em) => setSelectedEmailStarred(em)}
                />
              </>
            )}
          </main>

          {/* VISOR a la derecha */}
          <EmailViewer
            email={
              // En la pestaña principal => si currentLine no existe => es “introEmail”
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
            handleIntroDecision={(line) => {
              // Solo si es “introEmail”
              if (selectedEmail && selectedEmail.id === "intro") {
                setSelectedEmail(null);
                setCurrentLine(line);
                setCurrentStepIndex(0);
              }
            }}
            handleDecision={(option) => {
              if (!selectedEmail) return;
              // Si es intro => line
              if (selectedEmail.id === "intro") {
                // no haría nada, o lo haríamos en handleIntroDecision
              } else {
                // line decision
                setSelectedEmail(null);
                handleLineDecision(option);
              }
            }}
            goBack={() => {
              if (activeList === "principal") setSelectedEmail(null);
              else if (activeList === "social") setSelectedEmailSocial(null);
              else if (activeList === "promotions") setSelectedEmailPromo(null);
              else if (activeList === "starred") setSelectedEmailStarred(null);
            }}
          />

          <WeatherClockLocation />
        </div>
      </div>
    </div>
  );
}

export default App;
