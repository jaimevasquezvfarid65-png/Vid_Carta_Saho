// Generar corazones flotantes decorativos
const bgHearts = document.getElementById('bg-hearts');

for (let i = 0; i < 18; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 6 + 6) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
    bgHearts.appendChild(heart);
}

// 1. Quitar el desenfoque inicial al dar "Aceptar"
function aceptarMensaje() {
    const overlay = document.getElementById('intro-overlay');
    overlay.classList.add('oculto');
}

// 2. Animación de abrir el sobre
function abrirSobre() {
    const sobre = document.getElementById('sobre-wrapper');
    const btnAbrir = document.getElementById('btn-abrir-sobre');

    sobre.classList.add('abierto');
    btnAbrir.style.opacity = '0';
    btnAbrir.style.pointerEvents = 'none';
}

// 3. Controlar la música de fondo y su volumen
const audioFondo = document.getElementById('musica-fondo');
const btnMusica = document.getElementById('btn-musica');
const textoMusica = document.getElementById('texto-musica');
const sliderVolumen = document.getElementById('slider-volumen');
const valorVolumen = document.getElementById('valor-volumen');
let musicaSonando = false;

audioFondo.volume = sliderVolumen.value / 100;

function toggleMusica() {
    if (!musicaSonando) {
        audioFondo.play();
        musicaSonando = true;
        btnMusica.classList.add('reproduciendo');
        textoMusica.textContent = 'Pausar música';
    } else {
        audioFondo.pause();
        musicaSonando = false;
        btnMusica.classList.remove('reproduciendo');
        textoMusica.textContent = 'Reproducir fondo musical';
    }
}

function cambiarVolumen(valor) {
    const porcentaje = Number(valor);
    audioFondo.volume = porcentaje / 100;
    valorVolumen.textContent = porcentaje + '%';
}

// 4. Abrir y cerrar el video SOLO sobre la carta (la música sigue sonando)
const cajaVideoCarta = document.getElementById('video-sobre-carta');
const videoPlayer = document.getElementById('mi-video');

function abrirVideo() {
    cajaVideoCarta.classList.add('activo');
    videoPlayer.play();
}

function cerrarVideo() {
    videoPlayer.pause();
    cajaVideoCarta.classList.remove('activo');
}

// 5. AQUÍ COLOCAS LAS LÍNEAS DE LA CANCIÓN Y EL SEGUNDO EN QUE APARECEN
// Solo se resaltan y animan mientras la música está reproduciéndose.
const LETRA_CANCION = [
    { tiempo: 0, texto: "Eleji esta cancion, porque cada que la escucho me recuerda a ti" },
    { tiempo: 4, texto: "The First Time — Damiano David" },
    { tiempo: 15, texto: "I thought my heart had felt it all" },
    { tiempo: 22, texto: "I swam for miles across the ocean, never met the shore" },
    { tiempo: 29, texto: "My eyes were closed, my highs were lows" },
    { tiempo: 37, texto: "Just gettin' drunk on pills and potions, cravin' something more" },
    { tiempo: 45, texto: "Traveled the world, but it got me nowhere" },
    { tiempo: 49, texto: "Nothing could ever compare" },
    { tiempo: 52, texto: "A kiss, a touch, a song that made me cry" },
    { tiempo: 56, texto: "And all the drugs I've done, they never got me higher" },
    { tiempo: 60, texto: "Than the first time we met" },
    { tiempo: 63, texto: "There's nothing like the first time we met" },
    { tiempo: 67, texto: "I crashed my car, oh, baby, I was flyin'" },
    { tiempo: 71, texto: "And I talk to God, He couldn't get me higher" },
    { tiempo: 75, texto: "Than the first time we met" },
    { tiempo: 77, texto: "There's nothing like the first time, the first time we met" },
    { tiempo: 85, texto: "That night, the stars aligned" },
    { tiempo: 90, texto: "Heaven dropped a line" },
    { tiempo: 94, texto: "Before you, I was just a flare in the sky" },
    { tiempo: 98, texto: "A kid too afraid to go play in the light" },
    { tiempo: 102, texto: "A colorless painter, a man with no sight" },
    { tiempo: 105, texto: "Before you, I was nothing, was nothing, had nothing" },
    { tiempo: 109, texto: "I only had" },
    { tiempo: 110, texto: "A kiss, a touch, a song that made me cry" },
    { tiempo: 114, texto: "And all the drugs I've done, they never got me higher" },
    { tiempo: 117, texto: "Than the first time we met" },
    { tiempo: 120, texto: "There's nothing like the first time we met" },
    { tiempo: 125, texto: "I crashed my car, oh, baby, I was flyin'" },
    { tiempo: 129, texto: "And I talk to God, He couldn't get me higher" },
    { tiempo: 133, texto: "Than the first time we met" },
    { tiempo: 135, texto: "There's nothing like the first time, the first time we met" },
    { tiempo: 145, texto: "You set the room on fire" },
    { tiempo: 149, texto: "You take the angels higher" },
    { tiempo: 153, texto: "I heard a thousand choirs" },
    { tiempo: 156, texto: "Oh, baby, you ain't seen nothing yet" },
    { tiempo: 160, texto: "Traveled the world, it got me nowhere" },
    { tiempo: 164, texto: "Nothing could ever compare" },
    { tiempo: 167, texto: "A kiss, a touch, a song that made me cry" },
    { tiempo: 170, texto: "The drugs I've done, they never got me higher" },
    { tiempo: 174, texto: "Than the first time we met" },
    { tiempo: 177, texto: "There's nothing like the first time we met" },
    { tiempo: 181, texto: "I crashed my car, oh, baby, I was flying" },
    { tiempo: 185, texto: "And I talk to God, He couldn't get me higher" },
    { tiempo: 189, texto: "Than the first time we met" },
    { tiempo: 192, texto: "There's nothing like the first time, the first time we met" },
    { tiempo: 198, texto: "The first time we met" },
    { tiempo: 202, texto: "The first time we met" },
    { tiempo: 207, texto: "There's nothing like the first time, the first time we met" }
];

const listaLetraEl = document.getElementById('lista-letra');

function renderizarLetra() {
    listaLetraEl.innerHTML = '';
    LETRA_CANCION.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('linea-letra');
        div.dataset.index = index;
        div.textContent = item.texto;
        listaLetraEl.appendChild(div);
    });
}

function actualizarLetraSincronizada() {
    const lineas = listaLetraEl.querySelectorAll('.linea-letra');

    // Si la canción está pausada, quitamos la animación activa pero conservamos el avance
    if (!musicaSonando) {
        lineas.forEach((linea) => linea.classList.remove('activa'));
        return;
    }

    const tiempoActual = audioFondo.currentTime;
    let indiceActivo = 0;

    for (let i = 0; i < LETRA_CANCION.length; i++) {
        if (tiempoActual >= LETRA_CANCION[i].tiempo) {
            indiceActivo = i;
        }
    }

    lineas.forEach((linea, idx) => {
        linea.classList.remove('activa', 'pasada');
        if (idx === indiceActivo) {
            linea.classList.add('activa');
            linea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else if (idx < indiceActivo) {
            linea.classList.add('pasada');
        }
    });
}

renderizarLetra();
audioFondo.addEventListener('timeupdate', actualizarLetraSincronizada);