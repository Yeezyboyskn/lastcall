import RegistrationForm from "./RegistrationForm";
import { ErrorBoundary } from "./ErrorBoundary";

const sessions = [
  {
    period: "Semana 1",
    date: "Martes 27 de octubre",
    title: "Fundamentos y puesta en marcha",
    tag: "Kickoff · Onboarding",
    copy: "Activamos Copilot en el entorno, alineamos objetivos de negocio y enseñamos a tu equipo a formular prompts efectivos, iterar con confianza y aplicar la IA desde el primer día.",
    tools: "Copilot Chat · Teams · Outlook",
  },
  {
    period: "Semana 2",
    date: "Martes 3 de noviembre",
    title: "Casos de uso por perfil",
    tag: "Talleres prácticos",
    copy: "Sesiones dirigidas por rol —Finanzas, RR.HH., Ventas, Operaciones, TI, Gerencia— para transformar tareas que hoy toman horas en minutos y construir una biblioteca de prompts reutilizables.",
    tools: "Word · Excel · PowerPoint",
  },
  {
    period: "Semana 3",
    date: "Martes 10 de noviembre",
    title: "Medición y adopción real",
    tag: "Q&A · Métricas",
    copy: "Resolvemos bloqueos, revisamos telemetría de uso y documentamos evidencias antes/después en los escenarios de mayor impacto para validar el retorno de la inversión.",
    tools: "Dashboard · Champions · Q&A",
  },
  {
    period: "Semana 4",
    date: "Martes 17 de noviembre",
    title: "Del piloto a la decisión ejecutiva",
    tag: "Demo Day · Roadmap",
    copy: "Presentamos resultados cuantificables, aprendizajes clave y una hoja de ruta clara para escalar Copilot con gobernanza, seguridad y presupuesto aprobado.",
    tools: "KPIs · ROI · Próximos pasos",
  },
];

const outcomes = [
  ["01", "Reuniones que terminan en acción", "Resume conversaciones, identifica acuerdos y deja próximos pasos listos para ejecutar."],
  ["02", "Documentos que parten con ventaja", "De la página en blanco a un primer borrador con contexto, estructura y tono corporativo en segundos."],
  ["03", "Datos que cuentan una historia", "Explora, ordena y explica información en Excel con lenguaje natural sin fórmulas complejas."],
  ["04", "Bandeja de entrada bajo control", "Recupera hilos, redacta respuestas y prepara reuniones sin perder el contexto ni el hilo."],
];

export default function Home() {
  return (
    <main id="contenido-principal">
      <nav className="nav shell" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Last Call, inicio">
          <img src="lastcall-logo.png" alt="Last Call" />
        </a>
        <div className="navLinks">
          <a href="#programa">Programa</a>
          <a href="#sesiones">Sesiones</a>
          <a href="#requisitos">Requisitos</a>
          <a className="navCta" href="#registro">Quiero participar</a>
        </div>
      </nav>

      <section className="hero" id="inicio">
        <div className="heroGlow" aria-hidden="true" />
        <div className="shell heroGrid">
          <div className="heroCopy">
            <div className="partnerLine">
              <img src="microsoft-logo.png" alt="Microsoft" />
              <span aria-hidden="true" className="divider" />
              <strong>27 de octubre – 17 de noviembre de 2026</strong>
            </div>
            <p className="eyebrow">Last Call presenta · experiencia guiada</p>
            <h1>Tu equipo, con <span>Copilot</span>.<br />30 días para ir más lejos.</h1>
            <p className="heroLead">
              Activa Microsoft 365 Copilot Business sin costo para hasta 25 usuarios
              y convierte el último trimestre en un laboratorio real de productividad
              con acompañamiento experto de Last Call.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#registro">Solicitar mi cupo</a>
              <a className="textLink" href="#programa">Ver cómo funciona</a>
            </div>
            <p className="microcopy">Martes · 4:00 – 5:00 pm · Sesiones de 1 hora<br />Cupos limitados · Sujeto a elegibilidad y disponibilidad de la oferta CSP</p>
          </div>
          <div className="heroVisual" aria-label="Programa Copilot en 30 días">
            <div className="orbit orbitOne" />
            <div className="orbit orbitTwo" />
            <div className="dayCard">
              <span className="dayTop">COPILOT</span>
              <strong>30</strong>
              <span className="dayBottom">DÍAS</span>
              <i>con Last Call</i>
            </div>
            <div className="appChip chipWord">W</div>
            <div className="appChip chipExcel">X</div>
            <div className="appChip chipTeams">T</div>
            <div className="metricChip"><strong>25</strong><span>usuarios</span></div>
          </div>
        </div>
      </section>

      <section className="proofBar" aria-label="Beneficios principales">
        <div className="shell proofGrid">
          <div><strong>30</strong><span>días de prueba guiada</span></div>
          <div><strong>04</strong><span>encuentros en vivo</span></div>
          <div><strong>01</strong><span>plan de adopción real</span></div>
        </div>
      </section>

      <section className="manifesto section shell" id="programa">
        <div className="sectionLabel"><span>01</span> La propuesta</div>
        <div className="manifestoGrid">
          <div>
            <p className="eyebrow darkEyebrow">No es una demo que observas</p>
            <h2>Es un mes que tu equipo <em>vive.</em></h2>
          </div>
          <div className="manifestoCopy">
            <p>La IA demuestra su valor cuando entra al flujo de trabajo diario, no cuando se queda en una presentación.</p>
            <p>Por eso Last Call suma acompañamiento, seguridad y medición a la prueba oficial de Microsoft: para que cada semana entregue una capacidad instalada, un caso de uso validado y una señal concreta de valor.</p>
            <a href="#sesiones">Explorar el recorrido</a>
          </div>
        </div>
      </section>

      <section className="outcomes section">
        <div className="shell">
          <div className="sectionHeading">
            <div className="sectionLabel light"><span>02</span> Lo que cambia</div>
            <h2>Menos tiempo buscando.<br /><em>Más tiempo decidiendo.</em></h2>
          </div>
          <div className="outcomeGrid">
            {outcomes.map(([number, title, copy]) => (
              <article className="outcomeCard" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sessions section shell" id="sesiones">
        <div className="sessionsIntro">
          <div className="sectionLabel"><span>03</span> Cuatro semanas, un objetivo</div>
          <h2>Una sesión semanal.<br /><em>Una razón para avanzar.</em></h2>
          <p>Encuentros virtuales en vivo. Grabaciones disponibles para participantes y sus equipos.</p>
        </div>
        <div className="sessionList">
          {sessions.map((session) => (
            <article className="sessionCard" key={session.period}>
              <div className="sessionPeriod">
                {session.period}
                <span className="sessionDate">{session.date} · 4:00 – 5:00 pm</span>
              </div>
              <div className="sessionContent">
                <p>{session.tag}</p>
                <h3>{session.title}</h3>
                <span>{session.copy}</span>
              </div>
              <div className="sessionTools">{session.tools}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="difference section">
        <div className="shell differenceGrid">
          <div className="differenceCopy">
            <div className="sectionLabel light"><span>04</span> La diferencia Last Call</div>
            <h2>La licencia abre la puerta.<br /><em>Nosotros caminamos contigo.</em></h2>
            <p>Más de 34 años convirtiendo tecnología en resultados de negocio, ahora aplicados a una adopción de IA segura, medible y humana.</p>
          </div>
          <div className="differenceList">
            <div><span>01</span><h3>Adopción por perfiles</h3><p>Casos reales para Finanzas, RR.HH., Ventas, Operaciones, TI y Gerencia.</p></div>
            <div><span>02</span><h3>Seguridad desde el inicio</h3><p>Revisión de permisos, preparación del entorno y gobernanza antes de escalar.</p></div>
            <div><span>03</span><h3>Evidencia para decidir</h3><p>Seguimiento de uso, casos antes/después y cierre ejecutivo con roadmap aprobado.</p></div>
          </div>
        </div>
      </section>

      <section className="eligibility section shell" id="requisitos">
        <div className="sectionLabel"><span>05</span> Elegibilidad</div>
        <div className="eligibilityGrid">
          <div>
            <p className="eyebrow darkEyebrow">Un buen piloto comienza con el equipo correcto</p>
            <h2>¿Esta experiencia es para tu organización?</h2>
            <p className="eligibilityLead">Diseñado para empresas que quieren experimentar, medir y decidir con datos en 30 días.</p>
          </div>
          <ul className="checkList">
            <li><i aria-hidden="true">✓</i><span><strong>30 a 300+ colaboradores</strong> y un grupo piloto de hasta 25 usuarios.</span></li>
            <li><i aria-hidden="true">✓</i><span><strong>Microsoft 365 activo y compatible</strong> o disposición a evaluar la preparación técnica.</span></li>
            <li><i aria-hidden="true">✓</i><span><strong>Sin licencias Copilot pagadas</strong> en los usuarios que participarán del trial.</span></li>
            <li><i aria-hidden="true">✓</i><span><strong>Sponsor ejecutivo</strong> y compromiso de asistir a las cuatro sesiones.</span></li>
          </ul>
        </div>
        <div className="eligibilityNote"><strong>¿Aún no usan Microsoft 365?</strong><span>Conversemos. Last Call evalúa contigo la ruta de preparación o migración antes de activar la experiencia completa.</span></div>
      </section>

      <section className="registration section" id="registro">
        <div className="shell registrationGrid">
          <div className="registrationIntro">
            <img src="lastcall-logo.png" alt="Last Call" />
            <p className="eyebrow">Sesiones: 27 de octubre – 17 de noviembre de 2026 · Martes, 4:00 – 5:00 pm</p>
            <h2>Haz de estos 30 días el punto de partida.</h2>
            <p>Completa el formulario y nuestro equipo validará elegibilidad, perfiles y el caso de uso con mayor impacto para tu organización.</p>
            <div className="regSteps">
              <div><strong>1</strong><span>Postulas a tu empresa</span></div>
              <div><strong>2</strong><span>Validamos el escenario</span></div>
              <div><strong>3</strong><span>Coordinamos el kickoff</span></div>
            </div>
          </div>
          <div className="formPanel">
            <div className="formHeader"><span>POSTULACIÓN</span><strong>27 OCT – 17 NOV 2026</strong></div>
            <div className="trustSignals" aria-label="Señales de confianza">
              <div className="trustItem">
                <span className="trustIcon" aria-hidden="true">🔒</span>
                <span>Seguridad y privacidad garantizadas</span>
              </div>
              <div className="trustItem">
                <span className="trustIcon" aria-hidden="true">📋</span>
                <span>Hasta 25 usuarios sin costo</span>
              </div>
              <div className="trustItem">
                <span className="trustIcon" aria-hidden="true">🤝</span>
                <span>4 sesiones guiadas por expertos</span>
              </div>
              <div className="trustItem">
                <span className="trustIcon" aria-hidden="true">✅</span>
                <span>Sujeto a elegibilidad CSP</span>
              </div>
            </div>
            <ErrorBoundary>
              <RegistrationForm />
            </ErrorBoundary>
          </div>
        </div>
      </section>

      <section className="faq section shell">
        <div className="sectionLabel"><span>06</span> Preguntas frecuentes</div>
        <div className="faqGrid">
          <h2>Antes de dar<br />el primer paso.</h2>
          <div>
            <details><summary>¿La prueba tiene costo?</summary><p>No. La prueba de Microsoft 365 Copilot Business cubre hasta 25 usuarios durante 30 días, sujeta a elegibilidad y disponibilidad de la oferta CSP.</p></details>
            <details><summary>¿Necesitamos tener Microsoft 365?</summary><p>Para la experiencia completa (correo, reuniones, archivos) se requiere un tenant Microsoft 365 compatible. Si no lo tienen, Last Call evalúa la ruta de preparación o migración adecuada.</p></details>
            <details><summary>¿Qué ocurre al finalizar los 30 días?</summary><p>Antes del cierre revisamos resultados y definimos juntos si la organización desea convertir, ajustar o cerrar el piloto. Las condiciones se acuerdan durante el kickoff.</p></details>
            <details><summary>¿Las fechas y horarios ya están confirmados?</summary><p>Sí. Las cuatro sesiones serán los martes 27 de octubre, 3, 10 y 17 de noviembre de 2026, de 4:00 a 5:00 pm. Cada sesión dura 1 hora.</p></details>
          </div>
        </div>
      </section>

      <footer>
        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <filter id="footer-logo-white" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feFlood floodColor="#fff" x="23%" y="0" width="77%" height="100%" result="white" />
              <feComposite in="white" in2="SourceAlpha" operator="in" result="whiteText" />
              <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="whiteText" /></feMerge>
            </filter>
          </defs>
        </svg>
        <div className="shell footerTop">
          <img src="lastcall-logo.png" alt="Last Call" />
          <p>Tecnología que deja huella.</p>
          <a href="https://lastcall.cl" target="_blank" rel="noopener noreferrer">Sitio corporativo</a>
        </div>
        <div className="shell footerBottom">
          <span>© 2026 Last Call. Todos los derechos reservados.</span>
          <span>Microsoft y Microsoft 365 Copilot son marcas de Microsoft Corporation.</span>
        </div>
      </footer>
    </main>
  );
}
