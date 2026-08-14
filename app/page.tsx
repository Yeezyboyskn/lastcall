import RegistrationForm from "./RegistrationForm";

const sessions = [
  {
    date: "08 SEP",
    week: "01",
    title: "Encender el hábito",
    tag: "Kickoff + onboarding",
    copy: "Activamos Copilot, alineamos objetivos y aprendemos a preguntar, iterar y aplicar con seguridad.",
    tools: "Copilot Chat · Teams · Outlook",
  },
  {
    date: "15 SEP",
    week: "02",
    title: "Trabajo real, valor real",
    tag: "Casos de uso",
    copy: "Taller por perfiles para llevar tareas cotidianas de horas a minutos y construir prompts reutilizables.",
    tools: "Word · Excel · PowerPoint",
  },
  {
    date: "22 SEP",
    week: "03",
    title: "Medir lo que cambia",
    tag: "Q&A + adopción",
    copy: "Resolvemos bloqueos, revisamos uso y documentamos evidencias antes/después en los casos de mayor impacto.",
    tools: "Dashboard · Champions · Q&A",
  },
  {
    date: "29 SEP",
    week: "04",
    title: "Del piloto a la decisión",
    tag: "Demo Day",
    copy: "Presentamos resultados, aprendizajes y una hoja de ruta clara para escalar Copilot con confianza.",
    tools: "KPIs · ROI · Próximos pasos",
  },
];

const outcomes = [
  ["01", "Reuniones que terminan en acción", "Resume conversaciones, identifica acuerdos y deja próximos pasos listos."],
  ["02", "Documentos que parten con ventaja", "Pasa de una hoja en blanco a un primer borrador con contexto y estructura."],
  ["03", "Datos que cuentan una historia", "Explora, ordena y explica información en Excel con lenguaje natural."],
  ["04", "Correos con menos fricción", "Recupera hilos, redacta respuestas y prepara reuniones sin perder el contexto."],
];

export default function Home() {
  return (
    <main>
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
              <span />
              <strong>Septiembre 2026</strong>
            </div>
            <p className="eyebrow">Last Call presenta · experiencia guiada</p>
            <h1>Tu equipo, con <span>Copilot</span>.<br />Treinta días para ir más lejos.</h1>
            <p className="heroLead">
              Activa sin costo Microsoft 365 Copilot Business para hasta 25 personas
              y convierte septiembre en un laboratorio real de productividad, con
              acompañamiento experto de Last Call.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#registro">Solicitar mi cupo</a>
              <a className="textLink" href="#programa">Ver cómo funciona <span>↘</span></a>
            </div>
            <p className="microcopy">Cupos limitados · Sujeto a elegibilidad y disponibilidad</p>
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
            <p className="eyebrow darkEyebrow">No es una demo que miras</p>
            <h2>Es un mes que tu equipo <em>vive.</em></h2>
          </div>
          <div className="manifestoCopy">
            <p>La IA muestra su valor cuando entra al flujo de trabajo, no cuando se queda en una presentación.</p>
            <p>Por eso Last Call suma acompañamiento, seguridad y medición a la prueba oficial de Microsoft: para que cada semana deje una capacidad instalada, un caso de uso y una señal concreta de valor.</p>
            <a href="#sesiones">Explorar el recorrido <span>→</span></a>
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
                <i>↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sessions section shell" id="sesiones">
        <div className="sessionsIntro">
          <div className="sectionLabel"><span>03</span> Septiembre en cuatro actos</div>
          <h2>Una sesión por semana.<br /><em>Una razón para avanzar.</em></h2>
          <p>Encuentros virtuales en vivo. Las sesiones quedarán disponibles para los participantes y sus equipos.</p>
        </div>
        <div className="sessionList">
          {sessions.map((session) => (
            <article className="sessionCard" key={session.week}>
              <div className="sessionDate"><strong>{session.date.split(" ")[0]}</strong><span>{session.date.split(" ")[1]}</span></div>
              <div className="sessionWeek">SEMANA {session.week}</div>
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
            <p>Más de 34 años convirtiendo tecnología en resultados, ahora aplicados a una adopción de IA segura, medible y humana.</p>
          </div>
          <div className="differenceList">
            <div><span>01</span><h3>Adopción por perfiles</h3><p>Casos reales para Finanzas, RR.HH., Ventas, Operaciones, TI y Gerencia.</p></div>
            <div><span>02</span><h3>Seguridad desde el inicio</h3><p>Revisión de permisos, preparación del entorno y buenas prácticas antes de escalar.</p></div>
            <div><span>03</span><h3>Evidencia para decidir</h3><p>Seguimiento de uso, casos antes/después y un cierre ejecutivo con próximos pasos.</p></div>
          </div>
        </div>
      </section>

      <section className="eligibility section shell" id="requisitos">
        <div className="sectionLabel"><span>05</span> Elegibilidad</div>
        <div className="eligibilityGrid">
          <div>
            <p className="eyebrow darkEyebrow">Un buen piloto comienza con el equipo correcto</p>
            <h2>¿Esta experiencia es para tu empresa?</h2>
            <p className="eligibilityLead">La postulación está pensada para organizaciones que quieran experimentar, medir y decidir en 30 días.</p>
          </div>
          <ul className="checkList">
            <li><i>✓</i><span><strong>Hasta 300 colaboradores</strong> y un grupo piloto de máximo 25 usuarios.</span></li>
            <li><i>✓</i><span><strong>Microsoft 365 activo y compatible</strong> o disposición para evaluar la preparación técnica.</span></li>
            <li><i>✓</i><span><strong>Sin licencias pagadas de Copilot</strong> en los usuarios que participarán del trial.</span></li>
            <li><i>✓</i><span><strong>Un sponsor interno</strong> y compromiso de participar en las cuatro sesiones.</span></li>
          </ul>
        </div>
        <div className="eligibilityNote"><strong>¿Aún no trabajas con Microsoft 365?</strong><span>Conversemos. Last Call puede evaluar contigo una ruta de preparación o migración antes de activar la experiencia completa.</span></div>
      </section>

      <section className="registration section" id="registro">
        <div className="shell registrationGrid">
          <div className="registrationIntro">
            <img src="lastcall-logo.png" alt="Last Call" />
            <p className="eyebrow">Cupos de septiembre</p>
            <h2>Haz de estos 30 días el punto de partida.</h2>
            <p>Completa el formulario y nuestro equipo validará la elegibilidad, los usuarios y el caso de uso con mayor impacto para tu organización.</p>
            <div className="regSteps">
              <div><strong>1</strong><span>Postula a tu empresa</span></div>
              <div><strong>2</strong><span>Validamos el escenario</span></div>
              <div><strong>3</strong><span>Coordinamos el kickoff</span></div>
            </div>
          </div>
          <div className="formPanel">
            <div className="formHeader"><span>POSTULACIÓN</span><strong>SEPT / 2026</strong></div>
            <RegistrationForm />
          </div>
        </div>
      </section>

      <section className="faq section shell">
        <div className="sectionLabel"><span>06</span> Preguntas frecuentes</div>
        <div className="faqGrid">
          <h2>Antes de dar<br />el primer paso.</h2>
          <div>
            <details><summary>¿La prueba tiene costo?</summary><p>No. La prueba de Microsoft 365 Copilot Business contempla hasta 25 usuarios durante 30 días, sujeta a elegibilidad y disponibilidad de la oferta CSP.</p></details>
            <details><summary>¿Necesitamos tener Microsoft 365?</summary><p>Para vivir la experiencia completa con correos, reuniones y archivos de trabajo se requiere un entorno Microsoft 365 compatible. Si aún no lo tienen, Last Call puede evaluar la ruta adecuada.</p></details>
            <details><summary>¿Qué ocurre al finalizar los 30 días?</summary><p>Antes del vencimiento revisamos resultados y definimos juntos si la organización desea convertir, ajustar o cerrar el piloto. Las condiciones finales se validarán durante el kickoff.</p></details>
            <details><summary>¿Las fechas y horarios ya están confirmados?</summary><p>Las cuatro sesiones están planificadas para los días 8, 15, 22 y 29 de septiembre de 2026. Los horarios definitivos se comunicarán en la invitación formal.</p></details>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footerTop">
          <img src="lastcall-logo.png" alt="Last Call" />
          <p>Tecnología que deja huella.<br />Chile · Perú</p>
          <a href="#inicio">Volver arriba ↑</a>
        </div>
        <div className="shell footerBottom">
          <span>© 2026 Last Call. Demo conceptual de campaña.</span>
          <span>Microsoft y Microsoft 365 Copilot son marcas de Microsoft Corporation.</span>
        </div>
      </footer>
    </main>
  );
}
