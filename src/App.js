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
import NewMail from "./Sound/NewMail.wav"; // si lo usas
import MusicPlayer from "./components/musicPlayer/MusicPlayer"; // opcional

// ====================================================
// 1) DEFINICIÓN DE LA HISTORIA (LINEAL)
// ====================================================

// --- Línea A: Acceso global ---
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

// --- Línea B: Monopolio ---
const storylineMonopolio = [
  {
    id: "1.1",
    subject: "Decisión: Monopolizar la tecnología",
    snippet: "Has decidido controlar todo el mercado...",
    content: "Consecuencias iniciales... (aquí va tu texto)...",
    options: [
      // Personaliza los pasos de tu historia
    ],
  },
  // agrega más pasos B.x si hace falta
];

// --- Línea C: Regulada ---
const storylineRegulada = [
  {
    id: "1.1",
    subject: "Decisión: Regular la tecnología",
    snippet: "Un uso regulado y supervisado.",
    content: "Has elegido un sistema de licencias reguladas...",
    options: [
      // Personaliza los pasos de tu historia
    ],
  },
  // agrega más pasos C.x si hace falta
];

// Correo inicial (intro)
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

// ====================================================
// 2) LISTAS FALSAS PARA SOCIAL Y PROMOCIONES
// ====================================================
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

// ====================================================
// COMBINACIÓN FINAL DE LÓGICA Y RENDER
// ====================================================
function App() {
  // ------------------------------
  // Métricas
  // ------------------------------
  const [credibilidad, setCredibilidad] = useState(100);
  const [polarizacion, setPolarizacion] = useState(50);
  const [economia, setEconomia] = useState(70);

  // ------------------------------
  // Pestañas => "principal", "social", "promotions", "starred"
  // ------------------------------
  const [activeList, setActiveList] = useState("principal");

  // ------------------------------
  // Popup => Redactar & Error
  // ------------------------------
  const [showComposePopup, setShowComposePopup] = useState(false);
  const [composeText, setComposeText] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ------------------------------
  // Lógica lineal de la historia
  // currentLine => "A", "B", o "C"
  // currentStepIndex => índice en la storyline
  // ------------------------------
  const [currentLine, setCurrentLine] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // Queremos también un "historial" de pasos usados (opcional)
  const [usedSteps, setUsedSteps] = useState([]);

  // Email “seleccionado” en la pestaña principal (el step actual o null)
  const [selectedEmail, setSelectedEmail] = useState(null);

  // ------------------------------
  // SOCIAL
  // ------------------------------
  const [socialPool, setSocialPool] = useState(initialSocialPool);
  const [selectedEmailSocial, setSelectedEmailSocial] = useState(null);

  // ------------------------------
  // PROMOTIONS
  // ------------------------------
  const [promotionsPool, setPromotionsPool] = useState(initialPromotionsPool);
  const [selectedEmailPromo, setSelectedEmailPromo] = useState(null);

  // ------------------------------
  // STARRED => se arma juntando
  // principal (historia), social, promos
  // ------------------------------
  const [selectedEmailStarred, setSelectedEmailStarred] = useState(null);

  // ====================================================
  // SONIDO DE CLIC EN CADA MOUSE DOWN
  // ====================================================
  const clickAudioRef = useRef(null);

  useEffect(() => {
    clickAudioRef.current = new Audio(Click);

    const mouseDownHandler = (e) => {
      // Clic izquierdo (0) o derecho (2)
      if (e.button === 0 || e.button === 2) {
        clickAudioRef.current.play().catch(() => {});
      }
    };

    window.addEventListener("mousedown", mouseDownHandler);
    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  // ====================================================
  // EFECTO LUCES SEGÚN ECONOMÍA
  // ====================================================
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

  // ====================================================
  // SEGUIMIENTO DEL PUNTERO PARA CURSOR VINTAGE
  // ====================================================
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

  // ====================================================
  // POPUP: Redactar
  // ====================================================
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

  // ====================================================
  // POPUP: Error
  // ====================================================
  const handleCloseError = () => {
    setShowErrorPopup(false);
    setErrorMessage("");
  };

  // ====================================================
  // OBTENER STORYLINE SEGÚN LÍNEA (A, B, C)
  // ====================================================
  function getStoryline() {
    if (currentLine === "A") return storylineAccesoGlobal;
    if (currentLine === "B") return storylineMonopolio;
    if (currentLine === "C") return storylineRegulada;
    return null; // Todavía no eligió
  }

  // ====================================================
  // OBTENER EL PASO ACTUAL
  // ====================================================
  function getCurrentStep() {
    if (!currentLine) {
      // Aún no eligió, mostrar el "intro" con opciones
      return initialEmail;
    }
    // Ya eligió => buscar en la storyline
    const line = getStoryline();
    if (!line || currentStepIndex == null) return null;
    return line[currentStepIndex];
  }

  // ====================================================
  // DECISIÓN EN EL CORREO INICIAL ("intro")
  // ====================================================
  const newAudioMail = useRef(null);
  const handleIntroDecision = (line) => {
    // line => "A", "B", "C"
    setCurrentLine(line);
    setCurrentStepIndex(0);
    setSelectedEmail(null);
    newAudioMail.current = new Audio(NewMail);
    newAudioMail.current.play().catch(() => {});
  };

  // ====================================================
  // DECISIÓN EN UN PASO DE LA HISTORIA
  // ====================================================
  const handleLineDecision = (option) => {
    // option => { label, cred, econ, polar, nextStep }
    // Ajustar métricas
    if (option.cred) {
      setCredibilidad((prev) => clamp(prev + option.cred, 0, 100));
    }
    if (option.econ) {
      setEconomia((prev) => clamp(prev + option.econ, 0, 100));
    }
    if (option.polar) {
      setPolarizacion((prev) => clamp(prev + option.polar, 0, 100));
    }

    // Guardar en historial el paso actual
    const step = getCurrentStep();
    if (step) {
      setUsedSteps((prev) => [{ ...step, chosen: option.label }, ...prev]);
    }

    // Ir al siguiente “id” en la misma línea
    const line = getStoryline();
    if (!line) return;

    const nextIndex = line.findIndex((stepObj) => stepObj.id === option.nextStep);
    if (nextIndex >= 0) {
      // Mover al paso
      setCurrentStepIndex(nextIndex);
      setSelectedEmail(null);
    } else {
      // No hay next => fin
      alert("Has llegado a un final (o no se encontró el siguiente paso).");
      setSelectedEmail(null);
    }
  };

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  // ====================================================
  // LISTA “PRINCIPAL”: Solo se muestra el paso actual
  // (o el intro si no eligió línea)
  // Más abajo, si deseas, mostramos “historial” con usedSteps
  // ====================================================
  const currentStep = getCurrentStep();

  // ====================================================
  // SOCIAL - CLICK / STAR
  // ====================================================
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

  // ====================================================
  // PROMOTIONS - CLICK / STAR
  // ====================================================
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

  // ====================================================
  // STARRED => recolectar de la historia + social + promos
  // ====================================================
  const getAllStarredEmails = () => {
    // 1) Pasos de la historia actual
    //    - El currentStep no tiene "starred" en su config,
    //      podrías agregárselo si deseas. Por simplicidad,
    //      omitimos starred en la historia. 
    //      O si quisieras, podrías extender la lógica.
    //    - Igualmente, "usedSteps" tampoco se marcó starred.
    //      Se podría soportar pero no está en el ejemplo.
    //    - Si lo quieres implementar, deberías darle un 
    //      'starred' a cada step en el state.

    // 2) Social
    const socialStarred = socialPool.filter((em) => em.starred);

    // 3) Promotions
    const promoStarred = promotionsPool.filter((em) => em.starred);

    // Retorna todos
    return [...socialStarred, ...promoStarred];
  };

  const handleEmailClickStarred = (email) => {
    setSelectedEmailStarred(email);
  };

  const handleToggleStarGeneric = (emailId) => {
    // Determina dónde está ese email
    if (socialPool.some((em) => em.id === emailId)) {
      handleToggleStarSocial(emailId);
    } else if (promotionsPool.some((em) => em.id === emailId)) {
      handleToggleStarPromo(emailId);
    }
    // O si tuvieras principal con starred, lo manejarías también
  };

  // ====================================================
  // RENDERIZADO
  // ====================================================
  let starredEmails = [];
  if (activeList === "starred") {
    starredEmails = getAllStarredEmails();
  }

  return (
    <div>
      {/* ============ POPUP “Redactar” ============ */}
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

      {/* ============ POPUP “Error” ============ */}
      {showErrorPopup && (
        <PopupWindow95 title="Error" onClose={handleCloseError}>
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          <button onClick={handleCloseError}>Cerrar</button>
        </PopupWindow95>
      )}

      <div className="ligthsOut"></div>
      <div className="gmail-container">
        {/* ======= HEADER ======= */}
        <header className="header">
          <div className="header-left">
            <button className="hamburger">&#9776;</button>
            <img src="gmail-logo.png" alt="Gmail" className="logo" />
          </div>
          <div className="header-center">
            <input type="text" placeholder="Buscar en correos" />
          </div>
          <div className="header-right">
            <button className="apps" onClick={() => alert("Abrir 'Apps' (fingido)")}>
              🔳
            </button>
            <button className="profile" onClick={() => alert("Ver perfil (fingido)")}>
              👤
            </button>
          </div>
        </header>

        {/* ======= INDICADORES ======= */}
        <Indicators
          credibilidad={credibilidad}
          polarizacion={polarizacion}
          economia={economia}
        />

        <div className="content">
          {/* ======= SIDEBAR ======= */}
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

          {/* ======= SECCIÓN PRINCIPAL (LISTA + VISOR) ======= */}
          <main className="email-section">
            <Tabs activeList={activeList} setActiveList={setActiveList} />

            {/* Pestaña PRINCIPAL => historia lineal */}
            {activeList === "principal" && (
              <div>
                <h2>Línea Principal</h2>
                <div className="email-list">
                  {/* Solo 1 “correo” => currentStep (o intro) */}
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

                <h2>Historial (Pasos usados)</h2>
                <EmailListUsados emails={usedSteps} />
              </div>
            )}

            {/* Pestaña SOCIAL */}
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

            {/* Pestaña PROMOTIONS */}
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

            {/* Pestaña STARRED */}
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

          {/* ======= VISOR A LA DERECHA ======= */}
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
            // IMPORTANTE: Dentro del visor verificamos si es el “intro” 
            // o un step real para decidir qué botones mostrar
            handleIntroDecision={(line) => {
              // Solo aplica si el correo “selectedEmail” es "intro"
              if (selectedEmail?.id === "intro") {
                handleIntroDecision(line);
              }
            }}
            handleDecision={(option) => {
              // Aplica a los pasos de la historia
              if (!selectedEmail) return;
              if (selectedEmail.id === "intro") {
                // Intro => se maneja con handleIntroDecision
              } else {
                // Paso normal => handleLineDecision
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

          {/* ======= WIDGET CLIMA/RELOJ ======= */}
          <WeatherClockLocation />
        </div>
      </div>
    </div>
  );
}

export default App;
