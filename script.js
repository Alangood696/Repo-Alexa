document.addEventListener("DOMContentLoaded", () => {
  const svgDoc = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;

  const dbDefault = {
    materia: { titulo: "Materia", subtitulo: "Apuntes e información", bg: "fondo/2.jpg", items: { p1: { "Apuntes": [] }, p2: { "Apuntes": [] } } },
    evaluaciones: { titulo: "Evaluaciones", subtitulo: "Pruebas y calificaciones", bg: "fondo/3.jpg", items: { p1: { "Virtuales": [], "A mano": [] }, p2: { "Virtuales": [], "A mano": [] } } },
    deberes: { titulo: "Deberes", subtitulo: "Tareas del semestre", bg: "fondo/4.jpg", items: { p1: { "Tareas": [] }, p2: { "Tareas": [] } } },
    apes: { titulo: "APES", subtitulo: "Aprendizaje autónomo", bg: "fondo/5.jpg", items: { p1: { "Tareas": [] }, p2: { "Tareas": [] } } },
    ekos: { titulo: "EKOS", subtitulo: "Plataforma", bg: "fondo/6.jpg", items: { p1: { "Tareas": [] }, p2: { "Tareas": [] } } },
    consultas: { titulo: "Consultas", subtitulo: "Comp y mano", bg: "fondo/7.jpg", items: { p1: { "Consultas": [] }, p2: { "Consultas": [] } } },
    lecturas: { titulo: "Lecturas", subtitulo: "Análisis", bg: "fondo/8.jpg", items: { p1: { "Lecturas": [] }, p2: { "Lecturas": [] } } },
    anexos: { titulo: "Anexos", subtitulo: "Material extra", bg: "fondo/9.jpg", items: { p1: { "Anexos": [] }, p2: { "Anexos": [] } } },
    index: { titulo: "Inicio", subtitulo: "Información", bg: "fondo/1.jpg", items: {}, perfil: {} }
  };

  const perfilDefault = {
    nombre: "[Nombre del Estudiante]",
    rol: "Contabilidad y Auditoría",
    universidad: "Universidad Técnica de Ambato",
    facultad: "Contabilidad y Auditoría",
    curso: "Primer Semestre - Paralelo 'A'",
    docente: "Lic. Claudio Hidalgo",
    foto: ""
  };

  // ============================================================
  // INICIALIZACIÓN ROBUSTA DE LA BASE DE DATOS
  // Fusiona los defaults con lo guardado en localStorage para
  // evitar errores cuando el db viejo está incompleto o corrupto.
  // ============================================================
  let db;
  try {
    db = JSON.parse(localStorage.getItem("portafolio_db")) || {};
  } catch (e) {
    console.warn("DB corrupta en localStorage, reiniciando...", e);
    db = {};
  }

  if (typeof db !== "object" || Array.isArray(db)) db = {};

  Object.keys(dbDefault).forEach(key => {
    if (!db[key] || typeof db[key] !== "object" || Array.isArray(db[key])) {
      db[key] = JSON.parse(JSON.stringify(dbDefault[key]));
    } else {
      db[key].titulo = db[key].titulo || dbDefault[key].titulo;
      db[key].subtitulo = db[key].subtitulo || dbDefault[key].subtitulo;
      db[key].bg = db[key].bg || dbDefault[key].bg;
      if (!db[key].items || typeof db[key].items !== "object" || Array.isArray(db[key].items)) {
        db[key].items = JSON.parse(JSON.stringify(dbDefault[key].items));
      }
    }
  });

  // Perfil: rellenar SOLO los campos que falten
  const perfilGuardado = (db.index.perfil && typeof db.index.perfil === "object" && !Array.isArray(db.index.perfil))
    ? db.index.perfil
    : {};
  db.index.perfil = { ...perfilDefault };
  Object.keys(perfilGuardado).forEach(k => {
    if (perfilGuardado[k] !== undefined && perfilGuardado[k] !== null) {
      db.index.perfil[k] = perfilGuardado[k];
    }
  });
  Object.keys(perfilDefault).forEach(k => {
    if (db.index.perfil[k] === undefined || db.index.perfil[k] === null) {
      db.index.perfil[k] = perfilDefault[k];
    }
  });

  // Guardar la versión "reparada"
  try {
    localStorage.setItem("portafolio_db", JSON.stringify(db));
  } catch (e) {
    console.warn("No se pudo guardar la db reparada:", e);
  }

  let hash = window.location.hash.replace("#", "") || "index";
  if (!db[hash]) hash = "index";

  const setBackground = (seccion) => {
    let bgImg = db[seccion] && db[seccion].bg ? db[seccion].bg : "fondo/1.jpg";
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

  const adminPanel = document.createElement("div");
  adminPanel.className = "admin-panel";
  adminPanel.innerHTML = `
    <div class="admin-form">
      <h3 id="admin-form-title">Agregar Documento</h3>
      <input type="text" id="admin-title" placeholder="Título (Ej. Semana 1)">
      <input type="text" id="admin-desc" placeholder="Descripción o Fecha (DD/MM/AAAA)">
      <input type="text" id="admin-file" placeholder="Ruta del PDF (Ej. archivos/deberes/p1/d1.pdf)">
      <input type="text" id="admin-grade" placeholder="Nota (Ej. 10/10)">
      <select id="admin-parcial">
        <option value="p1">Primer Parcial</option>
        <option value="p2">Segundo Parcial</option>
      </select>
      <select id="admin-subseccion"></select>
      <input type="hidden" id="admin-edit-id">
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button id="admin-save">Guardar</button>
        <button id="admin-cancel" class="cancel">Cancelar</button>
      </div>
    </div>
  `;

  const newSectionPanel = document.createElement("div");
  newSectionPanel.className = "admin-panel new-section-panel";
  newSectionPanel.innerHTML = `
    <div class="admin-form">
      <h3>Agregar Subsección</h3>
      <input type="text" id="new-section-name" placeholder="Nombre (Ej. Evaluaciones Orales)">
      <select id="new-section-parcial">
        <option value="p1">Primer Parcial</option>
        <option value="p2">Segundo Parcial</option>
      </select>
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button id="new-section-save">Crear</button>
        <button id="new-section-cancel" class="cancel">Cancelar</button>
      </div>
    </div>
  `;

  const profileEditPanel = document.createElement("div");
  profileEditPanel.className = "admin-panel";
  profileEditPanel.id = "profile-edit-panel";
  profileEditPanel.innerHTML = `
    <div class="admin-form">
      <h3>Editar Perfil</h3>
      <input type="text" id="perfil-nombre" placeholder="Nombre completo">
      <input type="text" id="perfil-rol" placeholder="Carrera / Rol">
      <input type="text" id="perfil-universidad" placeholder="Universidad">
      <input type="text" id="perfil-facultad" placeholder="Facultad">
      <input type="text" id="perfil-curso" placeholder="Curso y Paralelo">
      <input type="text" id="perfil-docente" placeholder="Docente">
      <input type="text" id="perfil-foto" placeholder="Ruta de la foto (Ej. fondo/foto.jpg)">
      <div style="display: flex; gap: 1rem; margin-top: 1rem;">
        <button id="perfil-save">Guardar</button>
        <button id="perfil-cancel" class="cancel">Cancelar</button>
      </div>
    </div>
  `;

  document.body.prepend(modal);
  document.body.prepend(progressContainer);
  document.body.prepend(overlay);
  document.body.prepend(sidebar);
  document.body.prepend(mobileHeader);
  document.body.prepend(customCursor);
  document.body.prepend(preloader);
  document.body.appendChild(adminPanel);
  document.body.appendChild(newSectionPanel);
  document.body.appendChild(profileEditPanel);

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

  let clickCount = 0;
  let clickTimer;
  document.getElementById("secret-trigger").addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 1000);

    if (clickCount === 5) {
      document.body.classList.add("admin-mode");
      clickCount = 0;
      alert("¡Modo Administrador Activado! Ahora puedes crear, editar y eliminar.");
      renderContent();
    }
  });

  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => { document.getElementById("modal-iframe").src = ""; }, 300);
  };
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

  const openAdminForm = (editIndex = null, parcial = "p1", subseccion = null) => {
    document.getElementById("admin-form-title").innerText = editIndex !== null ? "Editar Documento" : "Agregar Documento";
    document.getElementById("admin-edit-id").value = editIndex !== null ? `${parcial}-${editIndex}` : "";

    const selectSub = document.getElementById("admin-subseccion");
    selectSub.innerHTML = "";
    const subs = Object.keys(db[hash].items[parcial] || {});
    subs.forEach(sub => {
      const opt = document.createElement("option");
      opt.value = sub;
      opt.innerText = sub;
      if (sub === subseccion) opt.selected = true;
      selectSub.appendChild(opt);
    });

    document.getElementById("admin-parcial").value = parcial;

    if (editIndex !== null) {
      const item = db[hash].items[parcial][subseccion][editIndex];
      document.getElementById("admin-title").value = item.t;
      document.getElementById("admin-desc").value = item.d;
      document.getElementById("admin-file").value = item.f;
      document.getElementById("admin-grade").value = item.g || "";
    } else {
      document.getElementById("admin-title").value = "";
      document.getElementById("admin-desc").value = "";
      document.getElementById("admin-file").value = "";
      document.getElementById("admin-grade").value = "";
    }
    adminPanel.classList.add("active");
  };

  document.getElementById("admin-cancel").addEventListener("click", () => adminPanel.classList.remove("active"));

  document.getElementById("admin-save").addEventListener("click", () => {
    const id = document.getElementById("admin-edit-id").value;
    const t = document.getElementById("admin-title").value;
    const d = document.getElementById("admin-desc").value;
    const f = document.getElementById("admin-file").value;
    const g = document.getElementById("admin-grade").value;
    const p = document.getElementById("admin-parcial").value;
    const sub = document.getElementById("admin-subseccion").value;

    if (!t || !f) return alert("Título y Ruta del PDF son obligatorios");

    if (!db[hash].items[p]) db[hash].items[p] = {};
    if (!db[hash].items[p][sub]) db[hash].items[p][sub] = [];

    if (id) {
      const [oldP, oldIndex] = id.split("-");
      db[hash].items[oldP][sub].splice(oldIndex, 1);
      db[hash].items[p][sub].push({ t, d, f, g });
    } else {
      db[hash].items[p][sub].push({ t, d, f, g });
    }

    localStorage.setItem("portafolio_db", JSON.stringify(db));
    adminPanel.classList.remove("active");
    renderContent(p);
  });

  document.getElementById("new-section-cancel").addEventListener("click", () => newSectionPanel.classList.remove("active"));

  document.getElementById("new-section-save").addEventListener("click", () => {
    const name = document.getElementById("new-section-name").value.trim();
    const p = document.getElementById("new-section-parcial").value;

    if (!name) return alert("El nombre de la sección es obligatorio");
    if (!db[hash].items[p]) db[hash].items[p] = {};
    if (!db[hash].items[p][name]) {
      db[hash].items[p][name] = [];
      localStorage.setItem("portafolio_db", JSON.stringify(db));
      alert(`Sección "${name}" creada con éxito.`);
      newSectionPanel.classList.remove("active");
      renderContent(p);
    } else {
      alert("Esa subsección ya existe en este parcial.");
    }
  });

  window.deleteSubsection = (parcial, sub) => {
    if (confirm(`¿Estás seguro de que quieres eliminar la subsección "${sub}" y todos sus documentos?`)) {
      delete db[hash].items[parcial][sub];
      localStorage.setItem("portafolio_db", JSON.stringify(db));
      renderContent(parcial);
    }
  };

  document.getElementById("perfil-cancel").addEventListener("click", () => profileEditPanel.classList.remove("active"));

  document.getElementById("perfil-save").addEventListener("click", () => {
    db.index.perfil = {
      nombre: document.getElementById("perfil-nombre").value,
      rol: document.getElementById("perfil-rol").value,
      universidad: document.getElementById("perfil-universidad").value,
      facultad: document.getElementById("perfil-facultad").value,
      curso: document.getElementById("perfil-curso").value,
      docente: document.getElementById("perfil-docente").value,
      foto: document.getElementById("perfil-foto").value
    };
    localStorage.setItem("portafolio_db", JSON.stringify(db));
    profileEditPanel.classList.remove("active");
    renderContent();
  });

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

    if (!appContent) {
      console.error("Falta el elemento <div id='app-content'></div> en el HTML.");
      return;
    }

    if (hash === "index") {
      const p = db.index.perfil;
      const inicial = (p.nombre && p.nombre.trim()) ? p.nombre.trim().charAt(0).toUpperCase() : "?";
      const avatarContent = p.foto
        ? `<img src="${p.foto}" alt="Foto de perfil" onerror="this.replaceWith(document.createTextNode('${inicial}'))">`
        : inicial;

      appContent.innerHTML = `
        <div class="page-header">
          <div>
            <h1 class="page-title">Información del Estudiante</h1>
            <p class="page-subtitle">Datos académicos y perfil del portafolio</p>
          </div>
          <button class="add-new-btn" id="edit-profile-btn" style="display: none;">Editar Perfil</button>
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

      const editBtn = document.getElementById("edit-profile-btn");
      if (document.body.classList.contains("admin-mode")) {
        editBtn.style.display = "block";
      }

      editBtn.addEventListener("click", () => {
        document.getElementById("perfil-nombre").value = p.nombre;
        document.getElementById("perfil-rol").value = p.rol;
        document.getElementById("perfil-universidad").value = p.universidad;
        document.getElementById("perfil-facultad").value = p.facultad;
        document.getElementById("perfil-curso").value = p.curso;
        document.getElementById("perfil-docente").value = p.docente;
        document.getElementById("perfil-foto").value = p.foto || "";
        profileEditPanel.classList.add("active");
      });
      return;
    }

    const data = db[hash];

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
        <button class="add-new-btn" onclick="document.getElementById('admin-save').click()">+ Documento</button>
        <button class="add-new-btn" style="background: rgba(255,255,255,0.1); margin-left: 0.5rem;" onclick="document.querySelector('.new-section-panel').classList.add('active')">+ Subsección</button>
      </div>
      <div class="tabs-container" id="sub-tabs-container" style="border-bottom: none; padding-bottom: 0; margin-bottom: 1.5rem;">
    `;

    const subsecciones = Object.keys(data.items[parcialActivo] || {});
    subsecciones.forEach((sub, idx) => {
      html += `
        <div style="display: flex; align-items: center; gap: 0.2rem; margin-right: 0.5rem;">
          <button class="tab-btn sub-tab-btn ${idx === 0 ? 'active' : ''}" data-sub="${sub}" style="font-size: 0.9rem; padding: 0.3rem 0.8rem;">${sub}</button>
          <button class="delete-sub-btn" onclick="deleteSubsection('${parcialActivo}', '${sub}')" style="display: none; background: rgba(239, 68, 68, 0.2); border: none; color: #ef4444; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; font-size: 0.7rem; align-items: center; justify-content: center;">X</button>
        </div>
      `;
    });

    html += `
      </div>
      <div class="grid-container" id="grid-content"></div>
    `;
    appContent.innerHTML = html;

    if (document.body.classList.contains("admin-mode")) {
      document.querySelectorAll(".delete-sub-btn").forEach(btn => btn.style.display = "flex");
    }

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
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span class="grade-badge">${item.g || "Sin nota"}</span>
                  <div class="admin-controls">
                    <button class="edit-btn" onclick="editItem(${index}, '${parcial}', '${sub}')">Editar</button>
                    <button class="delete-btn" onclick="deleteItem(${index}, '${parcial}', '${sub}')">Borrar</button>
                  </div>
                </div>
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

    document.querySelectorAll(".add-new-btn")[0].onclick = (e) => {
      e.preventDefault();
      openAdminForm(null, parcialActivo, subActiva);
    };

    document.querySelectorAll(".add-new-btn")[1].onclick = (e) => {
      e.preventDefault();
      document.querySelector(".new-section-panel").classList.add("active");
    };

    renderCards(parcialActivo, subActiva);
    setupSearch();
  };

  window.editItem = (index, parcial, sub) => openAdminForm(index, parcial, sub);
  window.deleteItem = (index, parcial, sub) => {
    if (confirm("¿Seguro que quieres eliminar este documento?")) {
      db[hash].items[parcial][sub].splice(index, 1);
      localStorage.setItem("portafolio_db", JSON.stringify(db));
      renderContent(parcial);
    }
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