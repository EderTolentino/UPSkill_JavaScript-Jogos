let game = [["", "", ""],
            ["", "", ""],
            ["", "", ""]];    

// Identify the main parts of the game
var box = $("#box");
var container = $(".container");  
let start_game = $("#start_game");
let show_message = $("#container_end");
let message = $("#message");
let round = $("#roundValue");
let round_value = 0;
let vic1 = $("#victory1");
let vic2 = $("#victory2");
let vic1_value = 0;
let vic2_value = 0;

// Get the data from the inputs
let player1 = $("#player1");
let player2 = $("#player2");          
let value_player1;
let value_player2;       

// Toggle the players
let playing1 = $("#playing1");
let playing2 = $("#playing2");   
let player1_name = $("#player1_name");
let player2_name = $("#player2_name");

// Set the actual player
let player = player1;    
playing1.addClass("playing");

// Function to show which player is playing
function playing(player) {
    if(player == player1){
        playing1.addClass("playing");
        playing2.removeClass("playing");
    } else if (player == player2) {
        playing2.addClass("playing");
        playing1.removeClass("playing");
    }
}   

// Function to get the names of the players - check if the input is filled - start the game
start_game.click(function () {
    value_player1 = player1.val();
    value_player2 = player2.val();  

    player1_name.text(value_player1);
    player2_name.text(value_player2);

    let form_valid = true;

    if(!player1[0].checkValidity()) {
        player1.addClass("is-invalid");
        form_valid = false;
    }

    if(!player2[0].checkValidity()) {
        player2.addClass("is-invalid");
        form_valid = false;
    }

    if(!form_valid) {
        alert("Faltam os nomes dos jogadores");
        return;
    }
    startGame();    
})

// Function to start the game
function startGame() {
    box.show();
    container.hide();
    start_clocker();
} 

// Function to fill each cell
function fillCell (cod) {
    let cell = $("#p" + cod); 

    // Verify if the cell is empty
    if(cell.text() == ""){
        if(player == player1){
            cell.text("X");
            fillArray(cod, "X");
            verifyVictory(player); 
            // Verify if there is any empty cell
            if(verifyEmpty() === 0) {
                resetGame();                
                addRound("even");
            }
            player = changePlayer(player);
        } else if (player == player2) {
            cell.text("O");
            fillArray(cod, "O");
            verifyVictory(player);
            // Verify if there is any empty cell
            if(verifyEmpty() === 0) {
                resetGame();
                addRound("even");
            }
            player = changePlayer(player);
        }
    }     
}

// Function to fill the Array JavaScript - This array is going to be used to check if there is a winner
function fillArray(cod, simbol) {
    switch (cod){
        case 1:
            game[0][0] = simbol;
            break;
        case 2:
            game[0][1] = simbol;
            break; 
        case 3:
            game[0][2] = simbol;
            break; 
        case 4:
            game[1][0] = simbol;
            break; 
        case 5:
            game[1][1] = simbol;
            break; 
        case 6:
            game[1][2] = simbol;
            break; 
        case 7:
            game[2][0] = simbol;
            break; 
        case 8:
            game[2][1] = simbol;
            break; 
        case 9:
            game[2][2] = simbol;
            break; 
    }
}

// Function to verify if there is a victory
function verifyVictory(player) {
    // ROW 1
    if(game[0][0] === game[0][1] && game[0][0] === game[0][2] && game[0][0] !== "") {
        addRound(player);
    }
    // ROW 2
    if(game[1][0] === game[1][1] && game[1][0] === game[1][2] && game[1][0] !== "") {
        addRound(player);
    }
    // ROW 3
    if(game[2][0] === game[2][1] && game[2][0] === game[2][2] && game[2][0] !== "") {
        addRound(player);
    }

    // COLUMN 1
    if(game[0][0] === game[1][0] && game[0][0] === game[2][0] && game[0][0] !== "") {
        addRound(player);
    }
    // COLUMN 2
    if(game[0][1] === game[1][1] && game[0][1] === game[2][1] && game[0][1] !== "") {
        addRound(player);
    }
    // COLUMN 3
    if(game[0][2] === game[1][2] && game[0][2] === game[2][2] && game[0][2] !== "") {
        addRound(player);
    }     

    // DIAGONAL 1
    if(game[0][0] === game[1][1] && game[0][0] === game[2][2] && game[0][0] !== "") {
        addRound(player);
    }
    // DIAGONAL 2
    if(game[0][2] === game[1][1] && game[0][2] === game[2][0] && game[0][2] !== "") {
        addRound(player);
    }
}

// Function to verify if any cell is still empty
function verifyEmpty() {
    let countEmpty = 0;
    for(let i = 1; i <= 9; i++){
        let cell = $("#p" + i); 
        if(cell.text() === "")
            countEmpty++;            
    }
    return countEmpty;
}

// Function to add round and add points if there is a winner
// If it is a even - nothing happens
function addRound(player) {
    round_value++;
    round.text(round_value + "/5");
    if (player == player1){
        vic1_value++;
        vic1.text(vic1_value);
    } else if (player == player2) {
        vic2_value++;
        vic2.text(vic2_value);
    } 

    if(round_value === 5) {
        finalMessage(getWinner(vic1_value, vic2_value));
        getData(getWinner(vic1_value, vic2_value));
    } else {
        resetGame();
    }
}

// Function to verify which player has more victories
function getWinner(vic1, vic2) {
    if(vic1 > vic2) {
        return value_player1;            
    } else if (vic2 > vic1) {
        return value_player2;
    } else {
        return "EMPATE";
    }            
}

// Function to reset the game and clean the table board
function resetGame() {
    reset();
    start_clocker();
    for(let i = 1; i <= 9; i++){
        let cell = $("#p" + i); 
        cell.text("");
    }
    game = [["", "", ""],
            ["", "", ""],
            ["", "", ""]]; 
}

// Clocker
const sec = document.querySelector('.seconds');
const min = document.querySelector('.minutes');

let secNum = 0;
let minNum = 0;
let INTERVAL;

function seconds() {
    secNum++;  
    secNum = addZero(secNum);
    sec.innerHTML = secNum;  
    if (secNum == 59) {
        secNum = 0
        minutes()
    }
}

function minutes() {
    minNum++;
    minNum = addZero(minNum);
    min.innerHTML = minNum; 
}

function start_clocker() {
    clearInterval(INTERVAL)
    INTERVAL = setInterval(() => {
        seconds()
    }, 1000)
}

function stop_clocker() {
    //Guardar variáveis para o local storage no futuro aqui
    clearInterval(INTERVAL)
}

function reset() {
    clearInterval(INTERVAL)
    secNum = 0
    minNum = 0
    sec.innerHTML = '00'
    min.innerHTML = '00'
}

//AUXILIARY FUNCTIONS:
// Function to add zero befor numbers from 0 to 9:
function addZero(number) {
    if (number < 10) 
        number = "0" + number;
    return number;
}

// Function to change the players
function changePlayer(player) {
    if(player == player1) {
        player = player2;            
    } else {
        player = player1; 
    }
    playing(player); 
    return player;
}

// Function to show a final message with the winner name
function finalMessage(winner) {
    if(winner === "EMPATE"){
        message.text(winner);
    } else {
        message.text(winner + " Venceu!");  
    }
    show_message.show();
}

/////////////////////////////////////// LOCAL STORAGE - Start ///////////////////////////////////////
// Function to get the data of the end of the game
function getData(winner) {        
    stop_clocker();
    let time = min.innerHTML + ":" + sec.innerHTML;
    const now = new Date();
    const date = now.toLocaleDateString() + ' às ' + addZero(now.getHours()) + ':' + addZero(now.getMinutes());
    fillLocalStorage(winner, date, time);
}

// Function to fill the Local Storage
function fillLocalStorage(winner, date, time) {
    let get_storage = localStorage.getItem("history");

    if(get_storage) {
        let arrayRes = JSON.parse(get_storage);                        
        arrayRes.unshift({  game_name: "Jogo do Galo",
                            time: time,
                            winner: winner,
                            date: date
                      });                        
        localStorage.setItem("history", JSON.stringify(arrayRes));    
    }  
}
/////////////////////////////////////// LOCAL STORAGE - End ///////////////////////////////////////