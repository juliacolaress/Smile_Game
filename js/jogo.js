// Variáveis globais
let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

// Botões
const btnReiniciar = document.getElementById('reiniciar');
const btnJogarNovamente = document.getElementById('joganovamente');

// Atualiza o placar
function atualizaPlacar() {
  desempenho = tentativas ? (acertos / tentativas) * 100 : 0;
  document.getElementById("resposta").innerHTML =
    `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(desempenho)}%`;
}

// Dispara confete contínuo por alguns segundos
function confeteContinuo(duracao = 3000) {
  const end = Date.now() + duracao;

  (function animar() {
    confetti({ particleCount: 7, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 7, angle: 120, spread: 55, origin: { x: 1 } });

    if (Date.now() < end) {
      requestAnimationFrame(animar);
    }
  })();
}

// Mostra carta com emoji e confete opcional
function mostrarCarta(obj, emojiURL, comConfete = false) {
  obj.className = "acertou";
  obj.innerHTML = obj.id;

  const img = new Image(60);
  img.src = emojiURL;
  obj.appendChild(img);

  if (comConfete && typeof confetti === 'function') {
    confeteContinuo(); // efeito de celebração
  }
}

// Reinicia o jogo completamente
function reiniciar() {
  desempenho = tentativas = acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar();
  btnJogarNovamente.className = 'visivel';
  btnReiniciar.className = 'invisivel';
}

// Recomeça rodada com cartas visíveis e resetadas
function jogarNovamente() {
  jogar = true;
  const cartas = document.querySelectorAll("div[id]");
  cartas.forEach(carta => {
    if (!isNaN(carta.id)) {
      carta.className = "inicial";
      carta.innerHTML = carta.id;
    }
  });
}

// Lógica principal de verificação da jogada
function verifica(obj) {
  if (!jogar) return alert('Clique em "Jogar novamente"');

  jogar = false;
  tentativas++;

  if (tentativas === 5) {
    btnJogarNovamente.className = 'invisivel';
    btnReiniciar.className = 'visivel';
  }

  const sorteado = Math.floor(Math.random() * 5);
  const cartaCerta = document.getElementById(sorteado);

  if (obj.id === sorteado.toString()) {
    mostrarCarta(obj, "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg", true);
    acertos++;
  } else {
    obj.className = "errou";
    obj.innerHTML = obj.id;

    const imgErro = new Image(60);
    imgErro.src = "https://em-content.zobj.net/thumbs/160/apple/354/crying-face_1f622.png";
    obj.appendChild(imgErro);

    mostrarCarta(cartaCerta, "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg");
  }

  atualizaPlacar();
}

// Eventos dos botões
btnJogarNovamente.addEventListener('click', jogarNovamente);
btnReiniciar.addEventListener('click', reiniciar);