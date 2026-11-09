/* Invitación de boda — Germán & Eliana · lógica de la página */
(() => {
  "use strict";
  const C = invitacionConfig;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const DIAS_CORTOS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const pad = n => String(n).padStart(2, "0");
  const ZONA = C.zonaHoraria || "-05:00";

  // La fecha se lee del texto (AAAA-MM-DD) para que se vea igual en cualquier zona horaria
  const [Y, M, D] = C.fecha.slice(0, 10).split("-").map(Number);
  const fechaBoda = new Date(C.fecha + ZONA);
  const fechaCorta = `${pad(D)} · ${MESES[M - 1].toUpperCase()} · ${Y}`;
  const fechaPortada = `${pad(D)} | ${MESES[M - 1].toUpperCase()} | ${Y}`;

  /* ---------- Textos desde config ---------- */
  function rellenar() {
    const T = C.textos;
    $$("[data-c]").forEach(el => { el.textContent = C.novios[el.dataset.c]; });
    $("#portadaEtiqueta").textContent = T.etiquetaPortada;
    $("#portadaFecha").textContent = fechaPortada;
    $("#sobreFecha").textContent = fechaCorta;
    $("#heroEtiqueta").textContent = T.etiquetaPortada;
    $("#footerFecha").textContent = fechaCorta;
    $("#mensaje").textContent = T.mensaje;
    $("#bendicion").textContent = T.bendicion;
    $("#cita").textContent = "“" + T.cita + "”";
    $("#citaAutor").textContent = T.citaAutor || "";
    $("#cierre").textContent = T.cierre;
    $("#despedida").textContent = T.despedida;
    $("#contadorFinal").textContent = T.finalContador;
    document.title = `${C.novios.corto1} & ${C.novios.corto2} · Nos casamos`;

    // Vestimenta y regalos
    $("#vestCodigo").textContent = C.vestimenta.codigo;
    $("#vestMensaje").textContent = C.vestimenta.mensaje;
    $("#vestNota").textContent = C.vestimenta.nota || "";
    $("#regTitulo").textContent = C.regalos.titulo;
    $("#regMensaje").textContent = C.regalos.mensaje;
    if (C.regalos.cuentas && C.regalos.cuentas.length) {
      const box = $("#cuentas"); box.classList.remove("is-hidden");
      C.regalos.cuentas.forEach(c => {
        const row = document.createElement("div"); row.className = "account";
        row.innerHTML = `<div><small></small><strong></strong></div><button type="button">Copiar</button>`;
        $("small", row).textContent = c.etiqueta; $("strong", row).textContent = c.valor;
        const btn = $("button", row);
        btn.addEventListener("click", async () => {
          try { await navigator.clipboard.writeText(c.valor); } catch { /* sin portapapeles */ }
          btn.textContent = "¡Copiado!"; btn.classList.add("ok");
          setTimeout(() => { btn.textContent = "Copiar"; btn.classList.remove("ok"); }, 1800);
        });
        box.appendChild(row);
      });
    }

    // Ceremonia y recepción
    const ev = (p, d) => {
      $(`#${p}Nombre`).textContent = d.nombre || "";
      $(`#${p}Lugar`).textContent = d.lugar || "";
      $(`#${p}Hora`).textContent = d.hora || "";
      const dir = $(`#${p}Dir`); d.direccion ? dir.textContent = d.direccion : dir.remove();
      const m = $(`#${p}Mapa`); d.mapa && d.lugar ? m.href = d.mapa : m.remove();
    };
    ev("cer", C.ceremonia); ev("rec", C.recepcion);
    if (!C.recepcion.lugar) { $("#recNombre").remove(); $("#recPendiente").classList.remove("is-hidden"); }

    // Padres (opcional): novio · & · novia
    if (C.padres && ((C.padres.novio || []).length || (C.padres.novia || []).length)) {
      const box = $("#padres"); box.classList.remove("is-hidden");
      const add = (tag, txt) => { const e = document.createElement(tag); e.textContent = txt; box.appendChild(e); };
      (C.padres.novio || []).forEach(n => add("span", n));
      if ((C.padres.novio || []).length && (C.padres.novia || []).length) add("i", "&");
      (C.padres.novia || []).forEach(n => add("span", n));
    }

    // Foto de la pareja: solo aparece si el archivo existe
    const f = $("#foto"), img = $("#fotoImg");
    f.dataset.forma = C.imagenes.forma || "arco";
    img.addEventListener("load", () => f.classList.remove("is-hidden"));
    img.src = C.imagenes.pareja;

    // Galería (opcional)
    if (C.galeria && C.galeria.length) {
      $("#galeriaSec").classList.remove("is-hidden");
      const lb = $("#lightbox"), lbImg = $("img", lb);
      C.galeria.forEach((src, i) => {
        const b = document.createElement("button"); b.type = "button"; b.className = "reveal";
        b.setAttribute("aria-label", "Ver foto " + (i + 1));
        b.innerHTML = `<img loading="lazy" alt="Foto ${i + 1} de los novios">`; $("img", b).src = src;
        b.addEventListener("click", () => { lbImg.src = src; lb.showModal(); });
        $("#galeria").appendChild(b);
      });
      lb.addEventListener("click", () => lb.close());
    }
  }

  /* ---------- Calendario del mes (Reserva la fecha) ---------- */
  function calendarioMes() {
    $("#calMes").textContent = `${cap(MESES[M - 1])} ${Y}`;
    const grid = $("#calGrid");
    DIAS_CORTOS.forEach(d => { const e = document.createElement("span"); e.className = "cal-dow"; e.textContent = d; grid.appendChild(e); });
    const primero = new Date(Y, M - 1, 1).getDay();
    const total = new Date(Y, M, 0).getDate();
    for (let i = 0; i < primero; i++) grid.appendChild(document.createElement("span"));
    for (let d = 1; d <= total; d++) {
      const e = document.createElement("span");
      e.className = "cal-day" + (d === D ? " hit" : "");
      e.textContent = d;
      if (d === D) e.setAttribute("aria-label", `${d} de ${MESES[M - 1]}: día de la boda`);
      grid.appendChild(e);
    }
    $("#calHora").textContent = (C.ceremonia.hora || "").toUpperCase();
  }

  /* ---------- Apertura del sobre ---------- */
  let audio = null;
  function abrir() {
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sobre = $("#sobre");
    if (sobre.classList.contains("open")) return;
    sobre.classList.add("open");
    setTimeout(() => {
      $("#portada").classList.add("is-open");
      $("#invitacion").classList.remove("is-hidden");
      document.body.classList.remove("is-locked");
      window.scrollTo(0, 0);
      iniciarReveal(); iniciarPetalos();
    }, reducir ? 50 : 1900);
    if (C.musica) iniciarMusica();
  }

  function iniciarMusica() {
    audio = new Audio(C.musica); audio.loop = true; audio.volume = .5;
    const flotante = $("#btnMusica"), play = $("#btnPlay");
    flotante.classList.remove("is-hidden"); play.classList.remove("is-hidden");
    const estado = on => { flotante.setAttribute("aria-pressed", on); play.setAttribute("aria-pressed", on); };
    audio.play().then(() => estado(true)).catch(() => estado(false));
    const alternar = () => { if (audio.paused) { audio.play(); estado(true); } else { audio.pause(); estado(false); } };
    flotante.addEventListener("click", alternar);
    play.addEventListener("click", alternar);
  }

  /* ---------- Reveal + parallax ---------- */
  function iniciarReveal() {
    const els = $$(".reveal");
    els.forEach(el => {
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
      el.style.setProperty("--d", (sibs.indexOf(el) * 0.1).toFixed(2) + "s");
    });
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: "0px 0px -5% 0px" });
    els.forEach(e => io.observe(e));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const px = $$(".parallax");
    // Se usa la propiedad "translate" para no pisar el giro/espejo (transform) de cada flor
    let tick = false;
    addEventListener("scroll", () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => {
        px.forEach(el => {
          const r = el.getBoundingClientRect();
          const off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed || 0);
          el.style.translate = `0 ${off.toFixed(1)}px`;
        });
        tick = false;
      });
    }, { passive: true });
  }

  /* ---------- Cuenta regresiva ---------- */
  function contador() {
    const d = $("#dias"), h = $("#horas"), m = $("#minutos"), s = $("#segundos");
    const paso = () => {
      const t = Math.floor((fechaBoda - Date.now()) / 1000);
      if (t <= 0) {
        d.textContent = "0"; h.textContent = m.textContent = s.textContent = "00";
        $("#contadorFinal").classList.remove("is-hidden");
        return false;
      }
      d.textContent = Math.floor(t / 86400);
      h.textContent = pad(Math.floor(t % 86400 / 3600));
      m.textContent = pad(Math.floor(t % 3600 / 60));
      s.textContent = pad(t % 60);
      return true;
    };
    if (paso()) { const id = setInterval(() => { if (!paso()) clearInterval(id); }, 1000); }
  }

  /* ---------- Agregar al calendario (.ics) ---------- */
  function calendario() {
    $("#btnCalendario").addEventListener("click", () => {
      const fmt = iso => new Date(iso + ZONA).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      const esc = t => t.replace(/[,;]/g, m => "\\" + m);
      const ics = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Boda Germán y Eliana//ES", "BEGIN:VEVENT",
        `UID:boda-${fmt(C.calendario.inicio)}@invitacion`,
        "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""),
        `DTSTART:${fmt(C.calendario.inicio)}`, `DTEND:${fmt(C.calendario.fin)}`,
        `SUMMARY:${esc("Boda de " + C.novios.corto1 + " y " + C.novios.corto2)}`,
        `LOCATION:${esc(C.ceremonia.lugar)}`,
        `DESCRIPTION:${esc("Ceremonia " + C.ceremonia.hora + (C.recepcion.lugar ? " · Recepción " + (C.recepcion.hora ? C.recepcion.hora + " " : "") + "en " + C.recepcion.lugar : ""))}`,
        "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Mañana es la boda", "END:VALARM",
        "END:VEVENT", "END:VCALENDAR"
      ].join("\r\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
      a.download = "boda-german-y-eliana.ics";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    });
  }

  /* ---------- Confirmar por WhatsApp (sin formulario) ---------- */
  function confirmar() {
    const conf = C.confirmacion;
    const params = new URLSearchParams(location.search);
    const invitado = (params.get("invitado") || "").trim().slice(0, 80);
    const pases = Math.min(Math.max(parseInt(params.get("pases"), 10) || 0, 0), 30);

    $("#rsvpTexto").textContent = `${conf.texto}${conf.fechaLimite ? " hasta el " + conf.fechaLimite : ""} en el siguiente enlace:`;
    $("#btnConfirmarTxt").textContent = conf.boton || "Confirmar";

    // Cierre automático del botón
    if (conf.cierre && new Date(conf.cierre + ZONA) < new Date()) {
      $("#btnConfirmar").classList.add("is-hidden"); $("#cerrado").classList.remove("is-hidden");
      return;
    }

    // Enlace personalizado: ?invitado=Familia%20Perez&pases=3
    if (invitado) {
      const g = $("#saludoInvitado");
      g.textContent = `Invitación para ${invitado}` + (pases ? ` · ${pases} ${pases === 1 ? "pase" : "pases"}` : "");
      g.classList.remove("is-hidden");
    }

    const lineas = [
      `¡Hola! Quiero confirmar mi asistencia a la boda de ${C.novios.corto1} y ${C.novios.corto2} 💙`,
      "",
      `Nombre: ${invitado}`,
      `Número de personas: ${pases || ""}`
    ];
    const numero = (conf.whatsapp || "").replace(/\D/g, "");
    if (!numero) console.warn("[Invitación] Falta confirmacion.whatsapp en js/config.js: el botón abrirá WhatsApp sin un contacto elegido.");
    $("#btnConfirmar").href = `https://wa.me/${numero}?text=${encodeURIComponent(lineas.join("\n"))}`;
  }

  /* ---------- Pétalos suaves en canvas (los que caen) ---------- */
  function iniciarPetalos() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("#petalos"), ctx = cv.getContext("2d");
    let W, H, dpr;
    // azul rey y azules claros sobre fondo blanco
    const colores = ["rgba(28,63,181,", "rgba(58,92,207,", "rgba(110,140,232,", "rgba(169,189,240,", "rgba(205,218,248,"];
    const n = innerWidth < 600 ? 14 : 24;
    const ps = [];
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    };
    const nuevo = (arriba) => {
      const i = Math.floor(Math.random() * colores.length);
      return {
        x: Math.random() * W, y: arriba ? -20 : Math.random() * H,
        r: (6 + Math.random() * 8) * dpr, vy: (.25 + Math.random() * .5) * dpr,
        vx: (Math.random() - .5) * .3 * dpr, a: Math.random() * 6.28, va: (Math.random() - .5) * .02,
        ph: Math.random() * 6.28, c: colores[i],
        o: i < 2 ? .22 + Math.random() * .22 : .45 + Math.random() * .35   // los más oscuros, más sutiles
      };
    };
    resize(); for (let i = 0; i < n; i++) ps.push(nuevo(false));
    addEventListener("resize", resize);
    let activo = true;
    document.addEventListener("visibilitychange", () => { activo = !document.hidden; if (activo) loop(); });
    function loop() {
      if (!activo) return;
      ctx.clearRect(0, 0, W, H);
      for (const p of ps) {
        p.y += p.vy; p.ph += .015; p.x += p.vx + Math.sin(p.ph) * .5 * dpr; p.a += p.va;
        if (p.y > H + 20) Object.assign(p, nuevo(true));
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a);
        ctx.fillStyle = p.c + p.o + ")";
        ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * .55, 0, 0, 6.28); ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- Compartir ---------- */
  function compartir() {
    $("#btnCompartir").addEventListener("click", async () => {
      const data = { title: `${C.novios.corto1} & ${C.novios.corto2} · Nos casamos`, text: C.textos.mensaje, url: location.href.split("?")[0] };
      try { if (navigator.share) { await navigator.share(data); return; } } catch { return; }
      location.href = "https://wa.me/?text=" + encodeURIComponent(data.text + " " + data.url);
    });
  }

  /* ---------- Inicio ---------- */
  rellenar(); calendarioMes(); contador(); calendario(); confirmar(); compartir();
  $("#btnAbrir").addEventListener("click", abrir);
  // Permite abrir directamente con #confirmar (por si comparten ese enlace)
  if (location.hash === "#confirmar") {
    abrir();
    setTimeout(() => $("#confirmar").scrollIntoView(), 2100);
  }
})();
