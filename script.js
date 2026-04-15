const flipbook = new St.PageFlip(
  document.getElementById("book"),
  {
    width: 340,
    height: 520,

    size: "fixed",
    showCover: true,

    maxShadowOpacity: 0.6,
    drawShadow: true,

    flippingTime: 900,

    usePortrait: true,
    useMouseEvents: true,
    mobileScrollSupport: false,

    startZIndex: 10
  }
);
// 🔥 ESTA LÍNEA ES CLAVE
flipbook.loadFromHTML(document.querySelectorAll(".page"));

//// EMPIEZA VIDEO

const video = document.getElementById("introVideo");
const intro = document.getElementById("intro");
const bookContainer = document.getElementById("book");

// 👇 IMPORTANTE: aseguramos que NO arranque solo
video.pause();
video.currentTime = 0;

// 🎯 reproducir video CON sonido al hacer click
document.addEventListener("click", async () => {
  try {
    // 🎬 VIDEO (PRIMERO)
    video.muted = false;
    await video.play();

    // 🔓 desbloquear trompeta (sin sonar)
    await audio.play();
    audio.pause();
    audio.currentTime = 0;
    audioListo = true;

    // 🔓 preparar música (sin sonido aún)
    musica.volume = 0;
    await musica.play();
    musica.pause();
    musica.currentTime = 0;

    console.log("todo desbloqueado correctamente");

  } catch (e) {
    console.log("error:", e);
  }
}, { once: true });


// 🎬 cuando termina el video
video.addEventListener("ended", async () => {

  // ocultar video
  intro.style.display = "none";

  // mostrar libro
  bookContainer.style.display = "block";

  // 🎵 AHORA SÍ → música
  try {
    musica.currentTime = 0;
    musica.volume = 0.4;
    await musica.play();

    console.log("🎵 música iniciada después del video");
  } catch (e) {
    console.log("error música:", e);
  }
});

// ❌ QUITA esto de aquí (esto rompe cosas si se ejecuta antes)
// flipbook.loadFromHTML(...);


// 📖 función del libro
video.addEventListener("ended", () => {

  intro.style.display = "none";
  bookContainer.style.display = "block";

  // 🔥 IMPORTANTE: actualizar layout
  flipbook.update();
});

// 🧾 tu otra función (ok)
function abrirPergamino() {
  const pergamino = document.getElementById("pergamino");
  pergamino.classList.add("abierto");

  const trigger = document.getElementById("boton");
  trigger.style.display = "none";
}

// TERMINA VIDEO























// AUDIOOOO
const audio = document.getElementById("audioTrompeta");

let audioListo = false;

// 🔓 desbloqueo (OBLIGATORIO)
document.addEventListener("click", () => {
  if (!audioListo) {
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audioListo = true;
      console.log("audio listo");
    }).catch(() => {});
  }
}, { once: true });

// 🎺 reproducir al llegar
flipbook.on("flip", () => {
  const pagina = flipbook.getCurrentPageIndex();

  if (pagina === 1 && audioListo) { // 👈 usa el número real
    audio.currentTime = 0;
    audio.play().catch(e => console.log(e));
  }
});



let escenaYaEjecutada = false;

flipbook.on("flip", () => {

  const paginaActual = flipbook.getCurrentPageIndex();

  if (paginaActual === 2) {

    if (!escenaYaEjecutada) {
      escenaYaEjecutada = true;
      iniciarEscena();
    }

  } else {
    escenaYaEjecutada = false; // 🔥 permite repetir si regresa
  }

});
function iniciarEscena() {

  // ⏳ 3 SEGUNDOS → TRANSFORMACIÓN
  setTimeout(() => {


  const calabaza = document.getElementById("calabaza");
  const carroza = document.getElementById("carroza");
  const destello = document.getElementById("destello");
  const espejo = document.getElementById("espejo");
    // ✨ DESTELLO
    destello.style.left = (calabaza.offsetLeft + calabaza.offsetWidth / 2 - 80) + "px";
    destello.style.top = (calabaza.offsetTop + calabaza.offsetHeight / 2 - 80) + "px";

    destello.style.opacity = 1;
    destello.style.transform = "scale(2)";

    setTimeout(() => {
      destello.style.opacity = 0;
      destello.style.transform = "scale(0)";
    }, 400);

    // 🎃 → 🚗
    calabaza.style.opacity = 0;

    setTimeout(() => {
      carroza.style.opacity = 1;
      carroza.style.transform = "scale(1)";
    }, 200);

  }, 1000);

  // 🪞 ESPEJO (1s después)
  setTimeout(() => {
    espejo.style.opacity = 1;
  }, 2000);

}

//ALADDIN
const alfombra = document.getElementById("alfombra");
const popup = document.getElementById("popup");

// ⛔ bloquear swipe SOLO en la imagen
["touchstart", "mousedown"].forEach(evento => {
  alfombra.addEventListener(evento, (e) => {
    e.stopPropagation();
  });
});

// 🪄 abrir popup
alfombra.addEventListener("click", (e) => {
  e.stopPropagation();
  popup.classList.add("activo");
});
document.getElementById("enviar").addEventListener("click", () => {

  const texto = document.getElementById("mensaje").value;
  if (!texto.trim()) return;

  const url = `https://wa.me/584269825361?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");

  popup.classList.remove("activo");
});
setTimeout(() => {
  alfombra.style.transform = "translateX(0)";
}, 6000);

// permitir escribir sin que el swipe interfiera
["touchstart", "mousedown", "click"].forEach(evento => {
  popup.addEventListener(evento, (e) => {
    e.stopPropagation(); // 🔥 clave
  });
});
// PAGINA FINAL
const cofre = document.getElementById("cofre");
const popup3 = document.getElementById("popup-tiempo");
const overlay2 = document.getElementById("overlay3");
const texto = document.getElementById("texto-tiempo");

// calcular días
function calcularDias() {
  const hoy = new Date();
  const fecha = new Date("2026-05-01");
  return Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
}

// contador animado
function animarNumero(final) {
  let actual = 0;
  const intervalo = setInterval(() => {
    actual += Math.ceil(final / 20);

    if (actual >= final) {
      actual = final;
      clearInterval(intervalo);
    }

    texto.textContent = `Faltan ${actual} días`;
  }, 50);
}

// evitar swipe SOLO en cofre
["touchstart", "mousedown"].forEach(evt => {
  cofre.addEventListener(evt, e => e.stopPropagation());
});

// click cinematográfico
cofre.addEventListener("click", (e) => {
  e.stopPropagation();

  // 💥 animación visual
  cofre.classList.add("flash");

  setTimeout(() => {
    cofre.classList.remove("flash");
  }, 500);

  // abrir popup
  overlay2.classList.add("activo");
  popup3.classList.add("activo");

  const dias = calcularDias();
  animarNumero(dias);
});

// cerrar
overlay2.addEventListener("click", () => {
  popup3.classList.remove("activo");
  overlay2.classList.remove("activo");
});

popup3.addEventListener("click", e => e.stopPropagation());

// PAGINA FINAL
const btn = document.getElementById("btn-confirmar");
const popup2 = document.getElementById("popup-confirmacion");
const overlay = document.getElementById("overlay2");

// abrir popup
btn.addEventListener("click", (e) => {
  e.stopPropagation();
  popup2.classList.add("activo");
  overlay.classList.add("activo");
});

// cerrar tocando fuera
overlay.addEventListener("click", () => {
  popup2.classList.remove("activo");
  overlay.classList.remove("activo");
});

// evitar cierre dentro
popup2.addEventListener("click", (e) => {
  e.stopPropagation();
});

// opción SÍ
document.getElementById("si").addEventListener("click", () => {
  const url = `https://wa.me/584269825361?text=${encodeURIComponent("Claro que iré!")}`;
  window.open(url, "_blank");
});

// opción NO
document.getElementById("no").addEventListener("click", () => {
  const url = `https://wa.me/584269825361?text=${encodeURIComponent("Disculpa, no voy a poder asistir, gracias por la invitación!")}`;
  window.open(url, "_blank");
});


const musica = document.getElementById("musicaFondo");

let musicaIniciada = false;

// iniciar con primer toque REAL
function iniciarMusica() {
  if (!musicaIniciada) {
    musica.volume = 0.4; // 🔥 no muy alto
    musica.play().then(() => {
      musicaIniciada = true;
      console.log("🎵 música iniciada");
    }).catch(e => console.log(e));
  }
}
