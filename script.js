const emojis = ['🌸', '🧠', '💻', '📚', '🎀', '☕', '🎧', '✨'];
let cartas = [];
let primeiraCarta = null;
let segundaCarta = null;
let travarTabuleiro = false;
let paresEncontrados = 0;

function embaralharCartas() {
    const dupla = [...emojis, ...emojis];
    cartas = dupla.sort(() => Math.random() - 0.5);
}

function criarTabuleiro() {
    const tabuleiro = document.getElementById("game-board");
    tabuleiro.innerHTML = ""; // Corrigido aqui!

    cartas.forEach((emoji, index) => {
        const carta = document.createElement("div");
        carta.classList.add("card");
        carta.dataset.emoji = emoji;
        carta.dataset.index = index;
        carta.addEventListener("click", virarCarta);
        tabuleiro.appendChild(carta); // Corrigido aqui!
    });
}

function virarCarta() {
    if (travarTabuleiro || this.classList.contains("flipped") || this.classList.contains("matched")) return;

    this.textContent = this.dataset.emoji;
    this.classList.add("flipped");

    if (!primeiraCarta) {
        primeiraCarta = this;
        return;
    }

    segundaCarta = this;
    travarTabuleiro = true;

    verificarPar();
}

function verificarPar() {
    const isMatch = primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji;

    if (isMatch) {
        primeiraCarta.classList.add("matched");
        segundaCarta.classList.add("matched");
        paresEncontrados++;

        if (paresEncontrados === emojis.length) {
            document.getElementById("win-message").classList.remove("hidden"); // Corrigido aqui!
        }

        resetarViradas();
    } else {
        setTimeout(() => {
            primeiraCarta.textContent = "";
            segundaCarta.textContent = "";
            primeiraCarta.classList.remove("flipped");
            segundaCarta.classList.remove("flipped");
            resetarViradas();
        }, 1000);
    }
}

function resetarViradas() {
    [primeiraCarta, segundaCarta] = [null, null];
    travarTabuleiro = false;
}

function iniciarJogo() {
    paresEncontrados = 0;
    document.getElementById("win-message").classList.add("hidden"); // Corrigido aqui!
    embaralharCartas();
    criarTabuleiro();
}

// Iniciar ao carregar
iniciarJogo();

