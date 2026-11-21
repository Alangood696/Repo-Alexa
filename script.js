document.addEventListener("DOMContentLoaded", () => {
  const svgDoc = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;

  const dbDefault = {
    materia: { 
      titulo: "Materia", 
      subtitulo: "Apuntes e información", 
      bg: "fondo/2.jpg", 
      items: { 
        p1: { "Apuntes": [ { t: "MATERIA PRIMER PARCIAL", d: "22/11/2026", f: "documentos/materia/primero/MATERIA PRIMER PARCIAL.pdf", g: "..." } ] }, 
        p2: { "Apuntes": [ { t: "MATERIA SEGUNDO PARCIAL", d: "22/11/2026", f: "documentos/materia/segundo/MATERIA SEGUNDO PARCIAL.pdf", g: "..." } ] } 
      } 
    },
    
    evaluaciones: { 
      titulo: "Evaluaciones", 
      subtitulo: "Pruebas y calificaciones", 
      bg: "fondo/3.jpg", 
      items: { 
        p1: { 
          "Evaluaciones en Plataforma": [
            { t: "DEFINICIONES BÁSICA FUNCIONES", d: "19/08/2026", f: "documentos/evaluaciones/primero/ev-pl/DEFINICIONES_BÁSICA_FUNCIOES_19-08-2026.pdf", g: "10/10" },
            { t: "EVALUACIÓN FUNCIONES", d: "26/08/2026", f: "documentos/evaluaciones/primero/ev-pl/EVALUACIÓN_FUNCIONES_26-08-2026.pdf", g: "5/10" },
            { t: "EVALUACIÓN LA CONJETURA DE POINCARÉ", d: "26/08/2026", f: "documentos/evaluaciones/primero/ev-pl/EVALUACIÓN_LA_CONJETURA_DE_POINCARÉ_26-08-2026.pdf", g: "7.5/10" },
            { t: "EVALUACIÓN BINOMIO DE NEWTON", d: "09/09/2026", f: "documentos/evaluaciones/primero/ev-pl/EVALUACIÓN_BINOMIO_DE_NEWTON_09-09-2026.pdf", g: "5/10" },
            { t: "EVALUACIÓN APLICACIÓN DE LAS FUNCIONES", d: "16/09/2026", f: "documentos/evaluaciones/primero/ev-pl/EVALUACIÓN_APLICACIÓN_DE_LAS_FUNCIONES_16-09-2026.pdf", g: "10/10" },
            { t: "EVALUACIÓN EL PROBLEMA DE SIERPINSKI", d: "16/09/2026", f: "documentos/evaluaciones/primero/ev-pl/EVALUACIÓN_EL_PROBLEMA_DE_SIERPINSKI_16-09-2026.pdf", g: "6/10" },
            { t: "EVALUACIÓN LÍMITES", d: "23/09/2026", f: "documentos/evaluaciones/primero/ev-pl/EVALUACIÓN_LÍMITES_23-09-2026.pdf", g: "5/10" }
          ],
          "Evaluaciones Escritas": [
            { t: "EVALUACIÓN CLASIFICACIÓN DE LAS FUNCIONES", d: "24/08/2026", f: "documentos/evaluaciones/primero/ev-escritas/EVALUACIÓN_CLASIFICACIÓN_DE_LAS_FUNCIONES_24-08-2026.pdf", g: "3/10" },
            { t: "EVALUACIÓN TRIÁNGULO DE PASCAL", d: "25/08/2026", f: "documentos/evaluaciones/primero/ev-escritas/EVALUACIÓN_TRIÁNGULO_DE_PASCAL_25-08-2026.pdf", g: "2/10" },
            { t: "TALLER BINOMIO DE NEWTON", d: "01/09/2026", f: "documentos/evaluaciones/primero/ev-escritas/TALLER_BINOMIO_DE_NEWTON_01-09-2026.pdf", g: "5.5/10" },
            { t: "EVALUACIÓN FUNCIONES DOMINIO Y RANGO", d: "09/09/2026", f: "documentos/evaluaciones/primero/ev-escritas/EVALUACIÓN_FUNCIONES_DOMINIO_Y_RANGO_09-09-2026.pdf", g: "8/10" },
            { t: "EVALUACION APLICACION FUNCIONES", d: "16/09/2026", f: "documentos/evaluaciones/primero/ev-escritas/EVALUACION_APLICACION_FUNCIONES_16-09-2026.pdf", g: "3/10" }
          ],
          "Evaluación Parcial": [
            { t: "EVALUACIÓN PRIMER PARCIAL", d: "22/09/2026", f: "documentos/evaluaciones/primero/ev-par/PRUEBA_MATEMATICAS_compressed.pdf", g: "6.25/10" }
          ]
        }, 
        p2: { "Evaluaciones en Plataforma": [], "Evaluaciones Escritas": [], "Evaluación Parcial": [] } 
      } 
    },
    
    deberes: { 
      titulo: "Deberes", 
      subtitulo: "Tareas del semestre", 
      bg: "fondo/4.jpg", 
      items: { 
        p1: { 
          "Tareas": [
            { t: "TAREA SEMANA 1 MATE", d: "21/06/2026", f: "documentos/deberes/primero/TAREA SEMANA 1 MATE.pdf", g: "..." },
            { t: "TAREA SEMANA 2 MATE", d: "22/06/2026", f: "documentos/deberes/primero/TAREA SEMANA 2 MATE.pdf", g: "..." },
            { t: "TAREAS TERCERA SEMANA", d: "24/06/2026", f: "documentos/deberes/primero/TAREAS TERCERA SEMANA.pdf", g: "9.5/10" },
            { t: "TAREA SEMANA 4 MATE", d: "25/06/2026", f: "documentos/deberes/primero/TAREA SEMANA 4 MATE.pdf", g: "..." },
            { t: "TAREAS QUINTA SEMANA", d: "09/08/2026", f: "documentos/deberes/primero/TAREAS QUINTA SEMANA.pdf", g: "9/10" },
            { t: "TAREA SEMANA 6 MATE", d: "10/09/2026", f: "documentos/deberes/primero/TAREA SEMANA 6 MATE.pdf", g: "..." },
            { t: "TAREA SEMANA 7 MATE", d: "11/09/2026", f: "documentos/deberes/primero/TAREA SEMANA 7 MATE.pdf", g: "..." },
            { t: "TAREA SEMANA 8 MATE", d: "15/09/2026", f: "documentos/deberes/primero/TAREA SEMANA 8 MATE.pdf", g: "..." }
          ],
          "Foro": [
            { t: "FORO DE PRESENTACIÓN", d: "21/08/2026", f: "documentos/deberes/primero/FORO.pdf", g: "9.5/10" }
          ]
        }, 
        p2: { "Tareas": [], "Foro": [] } 
      } 
    },
    
    apes: { 
      titulo: "APES", 
      subtitulo: "Aprendizaje autónomo", 
      bg: "fondo/5.jpg", 
      items: { 
        p1: { 
          "Tareas": [
            { t: "ENSAYO DE LÍMITES Y DERIVADAS", d: "30/08/2026", f: "documentos/apes/primero/Ensayo_de_limites_y_derivadas.pdf", g: "9.5/10" },
            { t: "FUNCIONES ALGEBRAICAS Y TRASCENDENTES", d: "27/09/2026", f: "documentos/apes/primero/FUNCIONES_ALGEBRAICAS_Y_TRASCENDENTES.pdf", g: "8/10" }
          ] 
        }, 
        p2: { "Tareas": [] } 
      } 
    },
    
    ekos: { 
      titulo: "EKOS", 
      subtitulo: "Plataforma", 
      bg: "fondo/6.jpg", 
      items: { 
        p1: { 
          "Tareas": [
            { t: "LECTURA CRÍTICA PRIMERA SEMANA EKOS", d: "18/08/2026", f: "documentos/ekos/primero/EKOS_SEMANA_1.pdf", g: "4.3/10" },
            { t: "LECTURA CRITICA SEGUNDA SEMANA FUNCIONES EKOS", d: "20/08/2026", f: "documentos/ekos/primero/SEMANA_2.pdf", g: "5/10" },
            { t: "LECTURA CRÍTICA TERCERA SEMANA EKOS", d: "26/08/2026", f: "documentos/ekos/primero/LECTURA_CRÍTICA_TERCERA_SEMANA_EKOS.pdf", g: "6/10" },
            { t: "LECTURA CRÍTICA CUARTA SEMANA BINOMIO DE NEWTON EKOS", d: "02/09/2026", f: "documentos/ekos/primero/CÁLCULO_DEL_DOMINIO_Y_RANGO_DE_UNA_FUNCIÓN.pdf", g: "9/10" },
            { t: "LECTURA CRÍTICA QUINTA SEMANA EKOS", d: "09/09/2026", f: "documentos/ekos/primero/EKOS.pdf", g: "5/10" },
            { t: "LECTURA CRÍTICA LÍMITES SEXTA SEMANA EKOS", d: "16/09/2026", f: "documentos/ekos/primero/FUNCIONES_EN_ECONOMÍA.pdf", g: "8/10" },
          ] 
            { t: "LECTURA CRÍTICA SEPTIMA SEMANA EKOS", d: "17/09/2026", f: "documentos/ekos/primero/SÉPTIMA_SEMANA.pdf", g: "9.5/10" }
        }, 
        p2: { "Tareas": [] } 
      } 
    },
    
    consultas: { titulo: "Consultas", subtitulo: "Comp y mano", bg: "fondo/7.jpg", items: { p1: { "Consultas": [] }, p2: { "Consultas": [] } } },
    
    lecturas: { 
      titulo: "Lecturas", 
      subtitulo: "Análisis", 
      bg: "fondo/8.jpg", 
      items: { 
        p1: { 
          "Lecturas": [
            { t: "CONJETURA DE POINCARÉ", d: "26/08/2026", f: "documentos/lecturas/primero/Conjetura_de_Poincaré.pdf", g: "9.5/10" },
            { t: "PROBLEMA DE SIERPINSKI", d: "16/09/2026", f: "documentos/lecturas/primero/PROBLEMA_DE_SIERPINSKI.pdf", g: "10/10" }
          ] 
        }, 
        p2: { "Lecturas": [] } 
      } 
    },
    
    anexos: { titulo: "Anexos", subtitulo: "Material extra", bg: "fondo/9.jpg", items: { p1: { "Anexos": [] }, p2: { "Anexos": [] } } },
    
    index: { 
      titulo: "Inicio", 
      subtitulo: "Información", 
      bg: "fondo/1.jpg", 
      items: {}, 
      perfil: {
        nombre: "[Nombre del Estudiante]", 
        rol: "Contabilidad y Auditoría", 
        universidad: "Universidad Técnica de Ambato", 
        facultad: "Contabilidad y Auditoría", 
        curso: "Primer Semestre - Paralelo 'A'", 
        docente: "Lic. Claudio Hidalgo", 
        foto: "" 
      } 
    }
  };

  let hash = window.location.hash.replace("#", "") || "index";
  if (!dbDefault[hash]) hash = "index";

  const setBackground = (seccion) => {
    let bgImg = dbDefault[seccion] && dbDefault[seccion].bg ? dbDefault[seccion].bg : "fondo/1.jpg";
    const isLight = document.body.classList.contains("light-theme");
    const overlay = isLight ? "rgba(248, 250, 252, 0.6)" : "rgba(11, 15, 25, 0.5)";
    document.body.style.backgroundImage = `linear-gradient(${overlay}, ${overlay}), url('${bgImg}')`;
  };

  setBackground(hash);

  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `<div class="spinner"></div>`;
  
  const customCursor = document.createElement("div");
  customCursor.className = "custom-cursor";

  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-bar-container";
  progressContainer.innerHTML = `<div class="progress-bar"></div>`;

  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";

  let menuHTML = `<button class="sidebar-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`;
  menuHTML += `<h2 id="secret-trigger">Portafolio Matemática</h2>`;
  menuHTML += `<div class="theme-toggle-container"><button class="theme-toggle-btn desktop-theme-toggle" aria-label="Cambiar tema"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div>`;

  const rutas = [
    { nombre: "Inicio", id: "index" }, { nombre: "Materia", id: "materia" }, { nombre: "Evaluaciones", id: "evaluaciones" },
    { nombre: "Deberes", id: "deberes" }, { nombre: "APES", id: "apes" }, { nombre: "EKOS", id: "ekos" },
    { nombre: "Consultas", id: "consultas" }, { nombre: "Lecturas Críticas", id: "lecturas" }, { nombre: "Anexos", id: "anexos" }
  ];

  rutas.forEach(ruta => {
    const activeClass = hash === ruta.id ? "active" : "";
    menuHTML += `<a href="#${ruta.id}" class="nav-link ${activeClass}">${ruta.nombre}</a>`;
  });

  const sidebar = document.createElement("aside");
  sidebar.className = "sidebar";
  sidebar.innerHTML = menuHTML;

  const mobileHeader = document.createElement("header");
  mobileHeader.className = "mobile-header";
  mobileHeader.innerHTML = `
    <div class="mobile-logo">Portafolio Mate</div>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <button class="theme-toggle-btn mobile-theme-toggle" aria-label="Cambiar tema"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button>
      <button class="menu-toggle" aria-label="Abrir menú">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>
    </div>
  `;

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">Vista Previa del Documento</div>
        <button class="modal-close"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
      </div>
      <div class="modal-body"><iframe id="modal-iframe" src=""></iframe></div>
    </div>
  `;

  document.body.prepend(modal);
  document.body.prepend(progressContainer);
  document.body.prepend(overlay);
  document.body.prepend(sidebar);
  document.body.prepend(mobileHeader);
  document.body.prepend(customCursor);
  document.body.prepend(preloader);

  setTimeout(() => { preloader.classList.add("hidden"); }, 500);

  const toggleMenu = () => document.body.classList.toggle("menu-open");
  document.querySelector(".menu-toggle").addEventListener("click", toggleMenu);
  document.querySelector(".sidebar-close").addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("menu-open")) toggleMenu();
      setTimeout(() => window.location.reload(), 100);
    });
  });

  const themeBtns = document.querySelectorAll(".theme-toggle-btn");
  if (localStorage.getItem("theme") === "light") document.body.classList.add("light-theme");
  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
      setBackground(hash);
    });
  });

  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.querySelector(".progress-bar").style.width = ((winScroll / height) * 100) + "%";
  });

  document.addEventListener("mousemove", (e) => {
    customCursor.style.left = e.clientX + "px";
    customCursor.style.top = e.clientY + "px";
  });

  document.querySelectorAll("a, button, .card, .tab-btn").forEach(el => {
    el.addEventListener("mouseenter", () => customCursor.classList.add("hovering"));
    el.addEventListener("mouseleave", () => customCursor.classList.remove("hovering"));
  });

  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => { document.getElementById("modal-iframe").src = ""; }, 300);
  };
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  const extraerFecha = (texto) => {
    if (!texto) return null;
    const regex = /(\d{1,2})\/(\d{1,2})\/(\d{2,4})/;
    const match = texto.match(regex);
    if (match) {
      let dia = parseInt(match[1], 10);
      let mes = parseInt(match[2], 10);
      let anio = parseInt(match[3], 10);
      if (anio < 100) anio += 2000;
      return new Date(anio, mes - 1, dia).getTime();
    }
    return null;
  };

  const renderContent = (parcialActivo = "p1") => {
    const appContent = document.getElementById("app-content");
    if (!appContent) return;

    if (hash === "index") {
      const p = dbDefault.index.perfil;
      const inicial = (p.nombre && p.nombre.trim()) ? p.nombre.trim().charAt(0).toUpperCase() : "?";
      const avatarContent = p.foto ? `<img src="${p.foto}" alt="Foto de perfil" onerror="this.replaceWith(document.createTextNode('${inicial}'))">` : inicial;

      appContent.innerHTML = `
        <div class="page-header">
          <div>
            <h1 class="page-title">Información del Estudiante</h1>
            <p class="page-subtitle">Datos académicos y perfil del portafolio</p>
          </div>
        </div>
        <div class="profile-layout">
          <div class="profile-card">
            <div class="avatar">${avatarContent}</div>
            <h2 class="profile-name">${p.nombre}</h2>
            <p class="profile-role">${p.rol}</p>
            <div class="info-list">
              <div class="info-item"><span class="info-label">Universidad</span><span class="info-value">${p.universidad}</span></div>
              <div class="info-item"><span class="info-label">Facultad</span><span class="info-value">${p.facultad}</span></div>
              <div class="info-item"><span class="info-label">Curso</span><span class="info-value">${p.curso}</span></div>
              <div class="info-item"><span class="info-label">Docente</span><span class="info-value">${p.docente}</span></div>
            </div>
          </div>
          <div class="about-card">
            <h3 class="card-title" style="font-size: 1.5rem; margin-bottom: 1.5rem;">Sobre el Portafolio</h3>
            <p class="about-text">Este espacio digital ha sido creado con el propósito de recopilar y organizar todos los deberes, tareas, evaluaciones y actividades realizadas durante el semestre en la asignatura de Matemática I.</p>
            <p class="about-text">A través de este portafolio se busca evidenciar el progreso académico, el desarrollo de habilidades analíticas y el esfuerzo constante aplicado en cada uno de los trabajos presentados.</p>
          </div>
        </div>
      `;
      return;
    }

    const data = dbDefault[hash];

    let html = `
      <div class="page-header">
        <div>
          <h1 class="page-title">${data.titulo}</h1>
          <p class="page-subtitle">${data.subtitulo}</p>
        </div>
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" class="search-input" placeholder="Buscar documento...">
        </div>
      </div>
      <div class="tabs-container">
        <button class="tab-btn ${parcialActivo === 'p1' ? 'active' : ''}" data-parcial="p1">Primer Parcial</button>
        <button class="tab-btn ${parcialActivo === 'p2' ? 'active' : ''}" data-parcial="p2">Segundo Parcial</button>
      </div>
      <div class="tabs-container" id="sub-tabs-container" style="border-bottom: none; padding-bottom: 0; margin-bottom: 1.5rem;">
    `;

    const subsecciones = Object.keys(data.items[parcialActivo] || {});
    subsecciones.forEach((sub, idx) => {
      html += `
        <div style="display: flex; align-items: center; gap: 0.2rem; margin-right: 0.5rem;">
          <button class="tab-btn sub-tab-btn ${idx === 0 ? 'active' : ''}" data-sub="${sub}" style="font-size: 0.9rem; padding: 0.3rem 0.8rem;">${sub}</button>
        </div>
      `;
    });

    html += `
      </div>
      <div class="grid-container" id="grid-content"></div>
    `;
    appContent.innerHTML = html;

    const subTabs = document.querySelectorAll(".sub-tab-btn");
    let subActiva = subsecciones.length > 0 ? subsecciones[0] : "General";

    subTabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        subTabs.forEach(t => t.classList.remove("active"));
        e.target.classList.add("active");
        subActiva = e.target.dataset.sub;
        renderCards(parcialActivo, subActiva);
      });
    });

    const renderCards = (parcial, sub) => {
      const grid = document.getElementById("grid-content");
      let items = data.items[parcial] && data.items[parcial][sub] ? [...data.items[parcial][sub]] : [];

      items.sort((a, b) => {
        const fechaA = extraerFecha(a.d);
        const fechaB = extraerFecha(b.d);
        if (fechaA && fechaB) return fechaA - fechaB;
        if (fechaA) return -1;
        if (fechaB) return 1;
        return 0;
      });

      if (items.length === 0) {
        grid.innerHTML = `<div class="empty-state" style="display:block"><h3>No hay documentos en esta sección</h3></div>`;
      } else {
        grid.innerHTML = "";
        items.forEach((item, index) => {
          grid.innerHTML += `
            <div class="card" data-pdf="${item.f}" style="animation-delay: ${index * 0.1}s">
              <div class="card-preview"></div>
              <div class="card-icon">${svgDoc}</div>
              <div class="card-title">${item.t}</div>
              <div class="card-desc">${item.d}</div>
              <a href="${item.f}" class="btn">Ver Documento</a>
              <div class="grade-container">
                <span class="grade-label">Calificación</span>
                <span class="grade-badge">${item.g || "Sin nota"}</span>
              </div>
            </div>
          `;
        });
      }
      setupCardEvents();
    };

    document.querySelectorAll(".tab-btn[data-parcial]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".tab-btn[data-parcial]").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");
        renderContent(e.target.dataset.parcial);
      });
    });

    renderCards(parcialActivo, subActiva);
    setupSearch();
  };

  const setupCardEvents = () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      card.classList.add("reveal");
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        if (window.innerWidth > 768) {
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -5;
          const rotateY = ((x - centerX) / centerX) * 5;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      });
      
      const btn = card.querySelector('.btn');
      const urlPdf = card.getAttribute('data-pdf');
      if (btn && urlPdf) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById('modal-iframe').src = urlPdf;
          modal.classList.add('active');
        });
      }
    });
  };

  const setupSearch = () => {
    const searchInput = document.querySelector(".search-input");
    if (!searchInput) return;
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll(".card").forEach(card => {
        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const desc = card.querySelector(".card-desc").textContent.toLowerCase();
        if (title.includes(term) || desc.includes(term)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  };

  renderContent();
});
