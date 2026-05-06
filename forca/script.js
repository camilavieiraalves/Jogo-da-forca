const palavras = [
  { palavra: "AMERICO", dica: "Parte do nome do autor" },
  { palavra: "PARAIBA", dica: "Estado onde nasceu" },
  { palavra: "ESCRITOR", dica: "Profissão dele" },
  { palavra: "POLITICO", dica: "Outra área de atuação" },
  { palavra: "SERTAO", dica: "Região retratada" }
];

let palavra, dica, display, erros;

const dicaEl = document.getElementById("dica");
const palavraEl = document.getElementById("palavra");
const letrasEl = document.getElementById("letras");
const canvas = document.getElementById("forca");
const ctx = canvas.getContext("2d");
const mensagemEl = document.getElementById("mensagem");
const btnReiniciar = document.getElementById("reiniciar");

function iniciarJogo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  letrasEl.innerHTML = "";
  mensagemEl.textContent = "";
  btnReiniciar.style.display = "none";

  const atual = palavras[Math.floor(Math.random() * palavras.length)];
  palavra = atual.palavra;
  dica = atual.dica;

  display = Array(palavra.length).fill("_");
  erros = 0;

  dicaEl.textContent = "Dica: " + dica;
  palavraEl.textContent = display.join(" ");

  desenharForcaBase();
  criarBotoes();
}

function criarBotoes() {
  for (let i = 65; i <= 90; i++) {
    const letra = String.fromCharCode(i);
    const btn = document.createElement("button");

    btn.textContent = letra;
    btn.onclick = () => jogar(letra, btn);

    letrasEl.appendChild(btn);
  }
}

function jogar(letra, btn) {
  btn.disabled = true;

  if (palavra.includes(letra)) {
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === letra) {
        display[i] = letra;
        palavraEl.classList.add("acerto");

setTimeout(() => {
  palavraEl.classList.remove("acerto");
}, 500);
      }
    }
  } else {
  erros++;
  desenharBoneco();

  document.querySelector(".jogo").classList.add("erro");

  setTimeout(() => {
    document.querySelector(".jogo").classList.remove("erro");
  }, 300);
}

  palavraEl.textContent = display.join(" ");

  // GANHOU 😄
  if (!display.includes("_")) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharForcaBase();
    desenharFeliz();

    document.querySelector(".jogo").classList.add("vitoria");
    fimDeJogo();
  }

  // PERDEU 💀
  if (erros === 6) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharForcaBase();
    desenharMorto();

    mensagemEl.textContent = "Você perdeu! Palavra: " + palavra;
    fimDeJogo();
  }
}

function fimDeJogo() {
  document.querySelectorAll("#letras button")
    .forEach(btn => btn.disabled = true);

  btnReiniciar.style.display = "block";
}

btnReiniciar.onclick = iniciarJogo;

// 🪵 FORCA BASE (sempre aparece)
function desenharForcaBase() {
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(10, 190);
  ctx.lineTo(190, 190);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 190);
  ctx.lineTo(50, 10);
  ctx.lineTo(120, 10);
  ctx.lineTo(120, 30);
  ctx.stroke();
}

// 😐 CABEÇA NORMAL
function desenharCabeca() {
  ctx.beginPath();
  ctx.arc(120, 50, 20, 0, Math.PI * 2);
  ctx.stroke();

  // olhos
  ctx.beginPath();
  ctx.arc(112, 45, 2, 0, Math.PI * 2);
  ctx.arc(128, 45, 2, 0, Math.PI * 2);
  ctx.fill();
}

// 💀 CARA DE MORTO
function desenharMorto() {
  ctx.beginPath();
  ctx.arc(120, 50, 20, 0, Math.PI * 2);
  ctx.stroke();

  // olhos X
  ctx.beginPath();
  ctx.moveTo(110, 40);
  ctx.lineTo(115, 50);
  ctx.moveTo(115, 40);
  ctx.lineTo(110, 50);

  ctx.moveTo(125, 40);
  ctx.lineTo(130, 50);
  ctx.moveTo(130, 40);
  ctx.lineTo(125, 50);
  ctx.stroke();
}

// 😄 CARA FELIZ
function desenharFeliz() {
  ctx.beginPath();
  ctx.arc(120, 50, 20, 0, Math.PI * 2);
  ctx.stroke();

  // olhos
  ctx.beginPath();
  ctx.arc(112, 45, 2, 0, Math.PI * 2);
  ctx.arc(128, 45, 2, 0, Math.PI * 2);
  ctx.fill();

  // sorriso
  ctx.beginPath();
  ctx.arc(120, 55, 8, 0, Math.PI);
  ctx.stroke();
}

// 👤 DESENHO POR PARTES
function desenharBoneco() {
  ctx.lineWidth = 2;

  if (erros === 1) desenharCabeca();

  if (erros === 2) {
    ctx.beginPath();
    ctx.moveTo(120, 70);
    ctx.lineTo(120, 130);
    ctx.stroke();
  }

  if (erros === 3) {
    ctx.beginPath();
    ctx.moveTo(120, 90);
    ctx.lineTo(90, 110);
    ctx.stroke();
  }

  if (erros === 4) {
    ctx.beginPath();
    ctx.moveTo(120, 90);
    ctx.lineTo(150, 110);
    ctx.stroke();
  }

  if (erros === 5) {
    ctx.beginPath();
    ctx.moveTo(120, 130);
    ctx.lineTo(90, 160);
    ctx.stroke();
  }

  if (erros === 6) {
    ctx.beginPath();
    ctx.moveTo(120, 130);
    ctx.lineTo(150, 160);
    ctx.stroke();
  }
}

// 🚀 INICIA
iniciarJogo();
function iniciarCarrossel(id) {
  const slides = document.querySelectorAll(`#${id} .slide`);
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("ativo");
    index = (index + 1) % slides.length;
    slides[index].classList.add("ativo");
  }, 3000);
  document.querySelector(".jogo").classList.remove("vitoria");
}

iniciarCarrossel("carrossel-esquerda");
iniciarCarrossel("carrossel-direita");