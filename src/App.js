// NOTA: Mantengo los comentarios y nombres de funciones en español, 
// solo se traducen al inglés los textos que ve el usuario en la interfaz.

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
import Error from "./Sound/Error.wav"; 
import Important from "./Sound/Important.wav"; 
import MusicPlayer from "./components/musicPlayer/MusicPlayer"; // opcional

// ====================================================
// 1) DEFINICIÓN DE LA HISTORIA (LINEAL)
// ====================================================

// --- Línea A: Acceso global ---
const storylineAccesoGlobal = [
  {
    id: "1.1",
    subject: "Control over global distribution",
    content: `Several countries are using the technology without restrictions, leading to inequalities and tensions. 
What editorial stance will we take?`,
    snippet: "Central control or total freedom?",
    options: [
      {
        label: "A) Centralize",
        cred: 0,
        econ: -10,
        polar: -15,
        nextStep: "1.2",
      },
      {
        label: "B) Total freedom",
        cred: +10,
        econ: -10,
        polar: +20,
        nextStep: "1.2",
      },
      {
        label: "C) International committee",
        cred: +5,
        econ: -5,
        polar: -10,
        nextStep: "1.2",
      },
    ],
  },
  {
    id: "1.2",
    subject: "Ethical use of technology",
    content: `The technology is being used for advanced weaponry, raising global concerns. 
What position will we take in our publications?`,
    snippet: "Prohibit, allow, or license weaponry use?",
    options: [
      {
        label: "A) Prohibit weaponry use",
        cred: +15,
        econ: -10,
        polar: +10,
        nextStep: "1.3",
      },
      {
        label: "B) Allow freedom",
        cred: -15,
        econ: +20,
        polar: 0,
        nextStep: "1.3",
      },
      {
        label: "C) Sell licenses selectively",
        cred: 0,
        econ: 0,
        polar: +5,
        nextStep: "1.3",
      },
    ],
  },
  {
    id: "1.3",
    subject: "Exposing misuse",
    content: `Accusations of misuse, including espionage and manipulation, have surfaced. 
Should we publish this information or keep it confidential?`,
    snippet: "Expose or keep silent about misuse?",
    options: [
      {
        label: "A) Publish accusations",
        cred: +20,
        econ: -15,
        polar: +10,
        nextStep: "1.4",
      },
      {
        label: "B) Keep accusations confidential",
        cred: -15,
        econ: +10,
        polar: 0,
        nextStep: "1.4",
      },
      {
        label: "C) Propose a joint investigation",
        cred: 0,
        econ: -10,
        polar: -10,
        nextStep: "1.4",
      },
    ],
  },
  {
    id: "1.4",
    subject: "Prioritizing access for developing countries",
    content: `Developing countries are requesting priority access to the technology, arguing it would resolve humanitarian crises. 
What position will we take?`,
    snippet: "Prioritize developing nations?",
    options: [
      {
        label: "A) Promote priority access",
        cred: +25,
        econ: -20,
        polar: +10,
        nextStep: "1.5",
      },
      {
        label: "B) Deny priority access",
        cred: -15,
        econ: +15,
        polar: 0,
        nextStep: "1.5",
      },
      {
        label: "C) Negotiate agreements",
        cred: +10,
        econ: -10,
        polar: +10,
        nextStep: "1.5",
      },
    ],
  },
  {
    id: "1.5",
    subject: "Democratic governance",
    content: `A global democratic committee is proposed to manage the technology. 
Will we support this transition in our editorial line?`,
    snippet: "Support democratic governance?",
    options: [
      {
        label: "A) Support governance",
        cred: +25,
        econ: -10,
        polar: 0,
        nextStep: "end",
      },
      {
        label: "B) Maintain current control",
        cred: -15,
        econ: 0,
        polar: 0,
        nextStep: "end",
      },
      {
        label: "C) Propose a hybrid model",
        cred: +10,
        econ: 0,
        polar: +10,
        nextStep: "end",
      },
    ],
  },
  {
    id: "end",
    subject: "Final Outcome",
    content: `Evaluate the final state of credibility, economy, and polarization to determine the ending.`,
    snippet: "Your decisions lead to the final outcome.",
    options: [],
  },
];


// --- Línea B: Monopolio ---
const storylineMonopolio = [
  {
    id: "1.1",
    subject: "Decision: Monopolize the technology",
    snippet: "You have decided to control the entire market...",
    content: "Initial consequences... (your text here)...",
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
    subject: "Decision: Regulate technology",
    snippet: "A regulated and supervised use.",
    content: "You have chosen a system of regulated licenses...",
    options: [
      // Personaliza los pasos de tu historia
    ],
  },
  // agrega más pasos C.x si hace falta
];

// Correo inicial (intro)
const initialEmail = {
  id: "intro",
  subject: "Revolutionary Technology: Choose your approach",
  snippet: "Global access, Monopoly, or Regulated",
  content: `A revolutionary discovery has emerged: a technology capable of generating unlimited energy. The possibilities are endless—ending poverty, powering innovation, reshaping humanity’s future. But such immense power demands an even greater decision.
  Will you choose to share this miracle with the world, risking chaos in the name of equality? Will you guard its secrets, monopolizing its benefits for the select few? Or will you enforce strict regulation, seeking to balance control and progress?

  Every choice has consequences. Every path will alter history. The eyes of the world are on you—what kind of legacy will you leave?`,
  
  options: [
    { label: "Global Access", line: "A" },
    { label: "Monopoly", line: "B" },
    { label: "Regulated", line: "C" },
  ],
};

// ====================================================
// 2) LISTAS FALSAS PARA SOCIAL Y PROMOCIONES
// ====================================================
const initialSocialPool = [
  {
    id: 101,
    subject: "Invitation to a social event",
    snippet: "Galactic party next Saturday...",
    content: "Social mail #1...",
    revisado: false,
    starred: false,
  },
  {
    id: 102,
    subject: "Meeting of stellar neighbors",
    snippet: "We're getting together to celebrate...",
    content: "Social mail #2...",
    revisado: false,
    starred: false,
  },
];

const initialPromotionsPool = [
  {
    id: 201,
    subject: "Interstellar discounts",
    snippet: "Travel offers...",
    content: "Promotions on galactic routes.",
    revisado: false,
    starred: false,
  },
  {
    id: 202,
    subject: "Special coupon",
    snippet: "20% discount...",
    content: "Limited promotion.",
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
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // ====================================================
  // EFECTO GLITCH
  // ====================================================
  const [glitchActive, setGlitchActive] = useState(false);

  // Función para activar el efecto glitch
  const triggerGlitchEffect = (duration = 500) => {
    setGlitchActive(true); // Activa el glitch

    setTimeout(() => {
      setGlitchActive(false); // Desactiva el glitch después de la duración
    }, duration);
  };
// ====================================================
// Mensaje importante
// ====================================================

const [isVisible, setIsVisible] = useState(false);
const [message, setMessage] = useState("");

// Método para mostrar el mensaje importante
const importantAudioRef = useRef(null);
const showImportantMessage = (msg) => {
  importantAudioRef.current = new Audio(Important);
  setMessage(msg);
  setIsVisible(true);
  importantAudioRef.current.play().catch(() => {});
};

// Método para cerrar el mensaje
const closeImportantMessage = () => {
  setIsVisible(false);
  setMessage("");
};

// Registrar la función globalmente para mostrar el mensaje
useEffect(() => {
  window.showImportantMessage = showImportantMessage;
  return () => {
    // Limpieza al desmontar el componente
    delete window.showImportantMessage;
  };
}, []);
  // ====================================================
  // Componente pop up
  // ====================================================
  const audioErrorRef = useRef(null);
  const handleShowPopup = (message) => {
    audioErrorRef.current = new Audio(Error);
    setPopupMessage(message);
    setShowPopup(true);
    audioErrorRef.current.play().catch(() => {});
    triggerGlitchEffect(); // Activa el efecto glitch
  };
  
  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

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

    let ligths = false; // Flip-flop inicializado

    const interval = setInterval(() => {
      specialEventsTimer();
    
      if (economia < 60) {
        document.documentElement.style.setProperty("--ligths", "visible");
        if (!ligths) { // Solo mostrar el mensaje si aún no se ha mostrado
          showImportantMessage("Our economy can no longer support paying for electricity, and as a result, our computers and other essential electrical devices are at risk of failing.");
          ligths = true; // Activar el flip-flop
        }
      } else {
        document.documentElement.style.setProperty("--ligths", "hidden");
        ligths = false; // Resetear el flip-flop cuando la economía sube
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
      setErrorMessage("You cannot send an empty email.");
      setShowErrorPopup(true);
      setShowComposePopup(false);
      return;
    }
    alert("Email sent (mocked): " + composeText);
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
    handleShowPopup(`This will have consequences...`);
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
      alert("You've reached an ending (or the next step was not found).");
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
    // 1) Pasos de la historia actual (no implementado starring)
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
      <div
        className={`glitch-container ${glitchActive ? "glitch-active" : ""}`}
      >
        <div className="glitch-overlay"></div>
        <div className="glitch-overlay"></div>
        <div className="glitch-overlay"></div>
      </div>
     {/* ============ POPUP “importante” ============ */}
      {isVisible && (
        <div className="important-message">
          <div className="important-message-content">
            <p>{message}</p>
            <button className="close-button" onClick={closeImportantMessage}>
              Close
            </button>
          </div>
        </div>
      )}
      {showComposePopup && (
        <PopupWindow95 title="Compose" onClose={handleCloseCompose}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              style={{ width: "300px", height: "150px" }}
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              placeholder="Write your email here..."
            />
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={handleSendCompose}>Send</button>
              <button onClick={handleCloseCompose}>Close</button>
            </div>
          </div>
        </PopupWindow95>
      )}

      {/* ============ POPUP “Error” ============ */}
      {showErrorPopup && (
        <PopupWindow95 title="Error" onClose={handleCloseError}>
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          <button onClick={handleCloseError}>Close</button>
        </PopupWindow95>
      )}
    {showPopup && (
      <PopupWindow95 title="Notice" onClose={handleClosePopup}>
        <p>{popupMessage}</p>
        <button onClick={handleClosePopup}>Close</button>
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
            <input type="text" placeholder="Search in emails" />
          </div>
          <div className="header-right">
            <button className="apps" onClick={() => alert("Open 'Apps' (mocked)")}>
              🔳
            </button>
            <button className="profile" onClick={() => alert("View profile (mocked)")}>
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
              setErrorMessage("Mock error");
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
                <h2>Main Line</h2>
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

                <h2>History (Used Steps)</h2>
                <EmailListUsados emails={usedSteps} />
              </div>
            )}

            {/* Pestaña SOCIAL */}
            {activeList === "social" && (
              <>
                <h2>Social Emails</h2>
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
                <h2>Promotions</h2>
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
                <h2>Starred</h2>
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
