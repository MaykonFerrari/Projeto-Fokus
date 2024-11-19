const html = document.querySelector('html');
const focoBotao = document.querySelector('.app__card-button--foco');
const curtoBotao = document.querySelector('.app__card-button--curto');
const longoBotao = document.querySelector('.app__card-button--longo');
const timer = document.getElementById('timer');
const imagens = document.querySelector('.app__image');
const frases = document.querySelector('.app__title');
const botaoIniciar = document.querySelector('#start-pause');
const foco = document.querySelectorAll('.app__card-button');
const musicaInput = document.getElementById('alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
const volumeControl = document.getElementById('volumeControl');
const comecarPausar = document.querySelector('#start-pause span');
const iconPausarIniciar = document.querySelector('.app__card-primary-butto-icon');

musicaInput.addEventListener('change', () =>{
    if(musica.paused) {
        musica.play();
    } else{
        musica.pause();
    }
});

function ajustarVolume(){
    musica.volume = volumeControl.value;
}

let contagemEmSegundos = 1500;
let intervalo = null;

const musicaPlay = new Audio('/sons/play.wav');
const musicaPause = new Audio('/sons/pause.mp3');
const musicaFim = new Audio('/sons/beep.mp3');

focoBotao.addEventListener('click', () => {
    contagemEmSegundos = 1500;
    alterarContexto('foco');
    focoBotao.classList.add('active');
});

curtoBotao.addEventListener('click', () => {
    contagemEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBotao.classList.add('active');
});

longoBotao.addEventListener('click', () => {
    contagemEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBotao.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarContagem();
    foco.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    imagens.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case 'foco':
            frases.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
        `
            break;
        case 'descanso-curto':
            frases.innerHTML = `
            Que tal dar uma respirada?
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `
            break;
        case 'descanso-longo':
            frases.innerHTML = `
            Hora de voltar à superfície.
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(contagemEmSegundos <= 0){
        musicaFim.play();
        alert("a contagem chegou a 0");
        zerarContagem();
        return;
    }
    contagemEmSegundos -=1
    mostrarContagem();
}

botaoIniciar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(intervalo){
        iconPausarIniciar.setAttribute('src', '/imagens/play_arrow.png');
        musicaPause.play();
        zerarContagem();
        return;
    }
    iconPausarIniciar.setAttribute('src', '/imagens/pause.png');
    musicaPlay.play();
    intervalo = setInterval(contagemRegressiva, 1000);
    comecarPausar.textContent = 'Pausar';
}

function zerarContagem(){
    comecarPausar.textContent = 'Começar';
    clearInterval(intervalo);
    intervalo = null;
}

function mostrarContagem(){
    const tempo = new Date(contagemEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

mostrarContagem();