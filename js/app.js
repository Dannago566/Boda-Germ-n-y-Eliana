/* Invitación de boda — Germán & Eliana · lógica de la página */
(() => {
  "use strict";
  const C = invitacionConfig;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } }
  };

  const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  const DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  const fechaBoda = new Date(C.fecha + (C.zonaHoraria || "-05:00"));
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const fechaLarga = d => `${d.getDate()} de ${cap(MESES[d.getMonth()])}, ${d.getFullYear()}`;
  const fechaCorta = d => `${String(d.getDate()).padStart(2, "0")} · ${MESES[d.getMonth()].toUpperCase()} · ${d.getFullYear()}`;
  const pad = n => String(n).padStart(2, "0");

  /* ---------- Textos desde config ---------- */
  function rellenar() {
    const T = C.textos;
    $$("[data-c]").forEach(el => { el.textContent = C.novios[el.dataset.c]; });
    $("#portadaEtiqueta").textContent = T.etiquetaPortada;
    $("#sobreFecha").textContent = fechaCorta(fechaBoda);
    $("#heroFecha").textContent = fechaCorta(fechaBoda);
    $("#footerFecha").textContent = fechaCorta(fechaBoda);
    $("#heroBendicion").textContent = T.bendicion;
    $("#mensaje").textContent = T.mensaje;
    $("#cita").textContent = "“" + T.cita + "”";
    $("#citaAutor").textContent = T.citaAutor ? "— " + T.citaAutor : "";
    $("#nombreCompleto1").textContent = C.novios.nombre1;
    $("#nombreCompleto2").textContent = C.novios.nombre2;
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

    // Eventos
    const ev = (p, d) => {
      $(`#${p}Nombre`).textContent = d.nombre || "";
      $(`#${p}Lugar`).textContent = d.lugar || "";
      $(`#${p}Hora`).textContent = d.hora || "";
      const dir = $(`#${p}Dir`); d.direccion ? dir.textContent = d.direccion : dir.remove();
      const m = $(`#${p}Mapa`); d.mapa && d.lugar ? m.href = d.mapa : m.remove();
    };
    ev("cer", C.ceremonia); ev("rec", C.recepcion);
    if (!C.recepcion.lugar) { $("#recNombre").remove(); $("#recPendiente").classList.remove("is-hidden"); }

    // Padres (opcional)
    if (C.padres && (C.padres.novio || C.padres.novia)) {
      $("#padresSec").classList.remove("is-hidden");
      const lista = (id, arr) => { $(id).innerHTML = (arr || []).map(n => `<span>${n.replace(/</g, "&lt;")}</span>`).join(""); };
      lista("#padresNovio", C.padres.novio); lista("#padresNovia", C.padres.novia);
    }

    // Foto de la pareja (con respaldo elegante si no existe)
    const f = $("#foto"), img = $("#fotoImg");
    f.dataset.forma = C.imagenes.forma || "arco";
    img.addEventListener("error", () => f.classList.add("sin-foto"));
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

    // RSVP
    $("#rsvpTexto").textContent = C.confirmacion.texto;
    if (C.confirmacion.fechaLimite) {
      const l = $("#rsvpLimite"); l.textContent = "Confirma antes del " + C.confirmacion.fechaLimite; l.classList.remove("is-hidden");
    }
  }

  /* ---------- Apertura del sobre ---------- */
  let audio = null;
  function abrir(irA) {
    const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sobre = $("#sobre");
    if (sobre.classList.contains("open")) return;
    sobre.classList.add("open");
    const mostrar = () => {
      $("#portada").classList.add("is-open");
      $("#invitacion").classList.remove("is-hidden");
      document.body.classList.remove("is-locked");
      const destino = typeof irA === "string" && $(irA);
      destino ? destino.scrollIntoView() : window.scrollTo(0, 0);
      iniciarReveal(); iniciarPetalos();
    };
    setTimeout(mostrar, reducir || typeof irA === "string" ? 50 : 1900);
    if (C.musica) {
      audio = new Audio(C.musica); audio.loop = true; audio.volume = .5;
      const b = $("#btnMusica"); b.classList.remove("is-hidden");
      audio.play().then(() => b.setAttribute("aria-pressed", "true")).catch(() => {});
      b.addEventListener("click", () => {
        if (audio.paused) { audio.play(); b.setAttribute("aria-pressed", "true"); }
        else { audio.pause(); b.setAttribute("aria-pressed", "false"); }
      });
    }
  }

  /* ---------- Reveal + parallax ---------- */
  function iniciarReveal() {
    const els = $$(".reveal");
    // retraso escalonado entre hermanos para una entrada más fina
    els.forEach(el => {
      const sibs = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
      el.style.setProperty("--d", (sibs.indexOf(el) * 0.12).toFixed(2) + "s");
    });
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(e => io.observe(e));

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const px = $$(".parallax");
    let tick = false;
    addEventListener("scroll", () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => {
        px.forEach(el => {
          const r = el.getBoundingClientRect();
          const off = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(el.dataset.speed || 0);
          el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
        });
        tick = false;
      });
    }, { passive: true });
  }

  /* ---------- Cuenta regresiva ---------- */
  function contador() {
    const d = $("#dias"), h = $("#horas"), m = $("#minutos"), s = $("#segundos");
    const paso = () => {
      let t = Math.floor((fechaBoda - Date.now()) / 1000);
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
      const z = C.zonaHoraria || "-05:00";
      const fmt = iso => new Date(iso + z).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
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

  /* ---------- Formulario de confirmación ---------- */
  function formulario() {
    const form = $("#rsvpForm"), conf = C.confirmacion;
    const params = new URLSearchParams(location.search);
    const invitado = (params.get("invitado") || "").trim().slice(0, 80);
    const pases = Math.min(Math.max(parseInt(params.get("pases"), 10) || 0, 0), 30);
    const max = pases || conf.maxAcompanantes || 6;
    let personas = 1;

    // Cierre automático del formulario
    if (conf.cierre && new Date(conf.cierre + (C.zonaHoraria || "-05:00")) < new Date()) {
      form.classList.add("is-hidden"); $("#cerrado").classList.remove("is-hidden");
      return;
    }

    // Invitación personalizada: ?invitado=Familia%20Perez&pases=3
    if (invitado) {
      $("#fNombre").value = invitado;
      const g = $("#saludoInvitado");
      g.textContent = `Invitación para ${invitado}` + (pases ? ` · ${pases} ${pases === 1 ? "pase" : "pases"}` : "");
      g.classList.remove("is-hidden");
    }

    const out = $("#personas"), menos = $("#menos"), mas = $("#mas");
    const pintar = () => { out.textContent = personas; menos.disabled = personas <= 1; mas.disabled = personas >= max; };
    menos.onclick = () => { personas = Math.max(1, personas - 1); pintar(); };
    mas.onclick = () => { personas = Math.min(max, personas + 1); pintar(); };
    pintar();

    const bloque = $("#bloqueAsiste");
    $$('input[name="asistencia"]').forEach(r => r.addEventListener("change", () => {
      bloque.classList.toggle("is-hidden", r.value === "no" && r.checked);
    }));

    $("#fNombre").addEventListener("input", () => {
      $("#fNombre").closest(".field").classList.remove("invalid");
      $('[data-for="nombre"]').textContent = "";
    });

    const estado = $("#estado"), btn = $("#btnEnviar");
    const setEstado = (t, err) => { estado.textContent = t; estado.classList.toggle("error", !!err); };

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const fd = new FormData(form);
      if (fd.get("web")) return; // trampa para bots
      const nombre = (fd.get("nombre") || "").toString().trim();
      if (nombre.length < 3) {
        $("#fNombre").closest(".field").classList.add("invalid");
        $('[data-for="nombre"]').textContent = "Por favor escribe tu nombre completo.";
        $("#fNombre").focus(); return;
      }
      const asiste = fd.get("asistencia") === "si";
      const data = {
        fecha: new Date().toISOString(),
        nombre,
        asistencia: asiste ? "Sí" : "No",
        personas: asiste ? personas : 0,
        pases: pases || "",
        origen: invitado ? "enlace personalizado" : "enlace general"
      };

      btn.disabled = true; setEstado("Enviando…");
      try {
        if (conf.endpoint) {
          // Apps Script acepta texto plano sin pre-vuelo CORS; la respuesta es opaca.
          await fetch(conf.endpoint, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(data) });
        } else {
          // Modo demostración: guarda en el navegador para poder probar el flujo.
          const prev = JSON.parse(store.get("rsvp-demo") || "[]"); prev.push(data); store.set("rsvp-demo", JSON.stringify(prev));
          console.info("[RSVP demo] Configura confirmacion.endpoint para recibir respuestas reales.", data);
        }
        store.set("rsvp-enviado", "1");
        mostrarGracias(data);
      } catch (err) {
        setEstado("No pudimos enviar tu respuesta. Revisa tu conexión e inténtalo de nuevo" + (conf.whatsapp ? ", o confirma por WhatsApp." : "."), true);
        if (conf.whatsapp) mostrarWa(data);
        btn.disabled = false;
      }
    });

    function mensajeWa(d) {
      return d.asistencia === "Sí"
        ? `Hola, soy ${d.nombre}. Confirmo mi asistencia a la boda de ${C.novios.corto1} y ${C.novios.corto2}. Asistiremos ${d.personas} ${d.personas === 1 ? "persona" : "personas"}.`
        : `Hola, soy ${d.nombre}. Lamentablemente no podré asistir a la boda de ${C.novios.corto1} y ${C.novios.corto2}. ¡Les deseo toda la felicidad!`;
    }
    function mostrarWa(d) {
      if (!conf.whatsapp) return;
      const a = $("#graciasWa");
      a.href = `https://wa.me/${conf.whatsapp}?text=${encodeURIComponent(mensajeWa(d))}`;
      a.classList.remove("is-hidden");
    }
    function mostrarGracias(d) {
      form.classList.add("is-hidden");
      $("#gracias").classList.remove("is-hidden");
      $("#graciasTitulo").textContent = d.asistencia === "Sí" ? "¡Gracias por confirmar!" : "Gracias por avisarnos";
      $("#graciasTexto").textContent = d.asistencia === "Sí"
        ? `Nos hace muy felices contar contigo, ${d.nombre.split(" ")[0]}. ¡Nos vemos pronto!`
        : "Lamentamos que no puedas acompañarnos. Te llevamos en el corazón.";
      mostrarWa(d);
      $("#gracias").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------- Pétalos suaves en canvas ---------- */
  function iniciarPetalos() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = $("#petalos"), ctx = cv.getContext("2d");
    let W, H, dpr;
    const colores = ["rgba(214,170,165,", "rgba(232,200,190,", "rgba(201,160,150,", "rgba(238,214,205,"];
    const n = innerWidth < 600 ? 12 : 22;
    const ps = [];
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    };
    const nuevo = (arriba) => ({
      x: Math.random() * W, y: arriba ? -20 : Math.random() * H,
      r: (6 + Math.random() * 8) * dpr, vy: (.25 + Math.random() * .5) * dpr,
      vx: (Math.random() - .5) * .3 * dpr, a: Math.random() * 6.28, va: (Math.random() - .5) * .02,
      ph: Math.random() * 6.28, c: colores[Math.floor(Math.random() * colores.length)], o: .35 + Math.random() * .35
    });
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
  rellenar(); contador(); calendario(); formulario(); compartir();
  $("#btnAbrir").addEventListener("click", () => abrir());
  // Permite abrir directamente con #confirmar (por si comparten ese enlace)
  if (location.hash === "#confirmar") abrir("#confirmar");
})();
