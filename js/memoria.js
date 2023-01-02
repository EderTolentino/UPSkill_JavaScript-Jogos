//Irá obter as todas a cartas com registadas no HTML de cada Nível
const cards_facil = document.querySelectorAll('.carta-facil');
const cards_medio = document.querySelectorAll('.carta-medio');
const cards_dificil = document.querySelectorAll('.carta-dificil');
//Verificará se a carta está virada ou não
let hasFlippedCard = false;
//Varificará se a carta está bloqueada
let lockBoard = false;
//Cartas seleccionadas por jogada
let firstCard, secondCard;
//Variável global para verificar vitória
let contador_jogadas;
let nivel;

//Função que permite virar a carta (temporáriamente, prepara para validação futura)
function flipCard() {
    if (lockBoard) {
        return; //Se a carta está bloqueada saimos já do funão
    }
    if (this === firstCard) {
        return; //Se a "segunda carta" selecionada for a própria "primeira carta", saimos já da função
    }
    this.classList.add('flip'); //adionamos então o "efeito de carta a virar"
    const audio_virar = $("#audio_virar");
    audio_virar[0].play();

    if (!hasFlippedCard) {    //Caso a carta selecionada, esteja ainda em jogo
        hasFlippedCard = true; //Carta ficará com o rótulo de carta virada para cima temporáriamente
        firstCard = this; //Decoramos a 1ª carta e saimos da função.
        return;
    }
    secondCard = this; //E Decoramos a 2ª carta
    hasFlippedCard = false; //Mantemos o rótulo de carta virada para cima.
    checkForMatch();
}

//Função que verifica se as cartas são iguais
function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        //Som para indicar que são iguais
        const audio_certo = $("#audio_certo");
        audio_certo[0].play();
        disableCards(); //Se são realmente iguais então registamos e desativamos
        contador_jogadas--;
        if(!contador_jogadas) {   //Se já terminou o jogo
            setTimeout(function(){
                const audio_fim = $("#audio_fim");
                audio_fim[0].play();
                getData(nome.val());
                $("#cronometro").hide();
                reset(); //Reset cronómetro, para um futuro, e eventual jogo.
                $("#container_end").show(); //Mostramos a caixa de texto a dar os "Parabéns" ao utilizador.
            },900)
            
            
            
        }
        return;
    }
    const audio_erro = $("#audio_erro");
    audio_erro[0].play();
    unflipCards();
}

//Função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
//Funcão que "desvira" as cartas
function unflipCards() {
    lockBoard = true; //Desbloqueio das cartas

    setTimeout(() => {  //Passado 1,5s "desviramos" as cartas
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard(); //Iremos preparar a próxima jogada
    }, 1500);
}

//Função que permite repôr a definições originais do tabuleiro e prapara tudo para uma próxima jogada
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Função que permite baralhar as cartas do nível fácil
(function shuffle() {
    cards_facil.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();
//Função que permite baralhar as cartas do nível médio
(function shuffle() {
    cards_medio.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 16);
        card.style.order = randomPosition;
    })
})();
//Função que permite baralhar as cartas do nível difícil
(function shuffle() {
    cards_dificil.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 20);
        card.style.order = randomPosition;
    })
})();

//Para cada carta disponível, se clicada será encaminhada para a função que virará a carta temporáriamente para cima
cards_facil.forEach((card) => {
    card.addEventListener('click', flipCard);
});
cards_medio.forEach((card) => {
    card.addEventListener('click', flipCard);
});
cards_dificil.forEach((card) => {
    card.addEventListener('click', flipCard);
});

//Cronómetro
//Obtenção das variáveis presentes no HTML
const seg = document.querySelector('.segundos');
const min = document.querySelector('.minutos');
//Geração e inicialização variáveis
let segNum = 0;
let minNum = 0;
let INTERVALO;

function segundos() {
    segNum++; //andamos de s em s
    if (segNum < 10) { //Para ficar com formato "0s"
        seg.innerHTML = '0' + segNum
    } else {
        seg.innerHTML = segNum //Se não mostra os segundos originais
    }

    if (segNum == 59) { //Se atingirmos o final de um minuto
        segNum = 0; //Reiniciamos os segundos a zero
        minutos() //Começamos então a contar os minutos com um raciocínio semelhante
    }
}

function minutos() {
    minNum++
    if (minNum < 10) {
        min.innerHTML = '0' + minNum;
    } else {
        min.innerHTML = minNum;
    }
}

//Função que permite iniciar o cronnómero e fazê-lo progredir de 1 em 1 segundos.
function iniciar() {
    clearInterval(INTERVALO);
    INTERVALO = setInterval(() => {
        segundos();
    }, 1000)  //1 segundo
}

//Função que permite para o tempo e preparar o cronómetro para o próximo jogo.
function parar() {
    clearInterval(INTERVALO);
}
//Função que permite inicializar valores do cronómetro do jogo anterior, incluindo no HTML
function reset() {
    clearInterval(INTERVALO);
    segNum = 0;
    minNum = 0;
    seg.innerHTML = '00';
    min.innerHTML = '00';
}

//Validação formulário (nome) e gestão de .click´s para os Jogos Fácil, Médio, Díficil
let nome = $("#nome");
let form_valid = true;

nome.on("input",function (){
    nome.removeClass("is-invalide");
});

function startGame(dificuldade) {
    form_valid = true;
    if(!nome[0].checkValidity())   {
        nome.addClass("is-invalid");
        form_valid = false;
    }
    if(!form_valid){
        return;
    }
    if (dificuldade === "facil") {
        contador_jogadas = 6;
        nivel = "Fácil";
    }
    if (dificuldade === "medio") {
        contador_jogadas = 8;
        nivel = "Médio";
    }
    if (dificuldade === "dificil") {
        contador_jogadas = 10;
        nivel = "Difícil";
    }
    $("#cronometro").show();
    $("#jogo-" + dificuldade).show();
    iniciar(); //Início do cronómetro
    $("#menu").hide();
}
$("#facil").click(function()    {
    startGame("facil")
});
$("#medio").click(function() {
    startGame("medio")
});
$("#dificil").click(function() {
    startGame("dificil")
});

/////////////////////////////////////// LOCAL STORAGE - Start ///////////////////////////////////////
// Function to get the data of the end of the game

function getData(winner) {        
    parar();
    // Time spent to finish the game:
    let time = nivel + " - " + "Tempo: " + min.innerHTML + ":" + seg.innerHTML;
    const now = new Date();
    const date = now.toLocaleDateString() + ' às ' + addZero(now.getHours()) + ':' + addZero(now.getMinutes());
    fillLocalStorage(winner, date, time);
}

// Function to fill the Local Storage
function fillLocalStorage(winner, date, time) {
    let get_storage = localStorage.getItem("history");

    if(get_storage) {
        let arrayRes = JSON.parse(get_storage);                        
        arrayRes.unshift({  game_name: "Jogo da Memória",
                            time: time,
                            winner,
                            date: date
                      });                        
        localStorage.setItem("history", JSON.stringify(arrayRes));    
    }  
}
/////////////////////////////////////// LOCAL STORAGE - End ///////////////////////////////////////

// Function to add zero befor numbers from 0 to 9:
function addZero(number) {
    if (number < 10)
        number = "0" + number;
    return number;
}