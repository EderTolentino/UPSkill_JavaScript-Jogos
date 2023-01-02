let row = [5, 5, 5, 5, 5, 5, 5];
    
let game = [["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""]];    

// Identify the main parts of the game
let box = $("#box");
let container = $(".container");  
let start_game = $("#start_game");
let show_message = $("#container_end");
let message = $("#message");

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

// Function to fill the column and change the player - To be decreased
function fillColumn(col) {           
    if(row[col] < 0){
        alert("Esta coluna já está cheia! Jogue novamente!")
        return; 
    }   
    if(player == player1){
        fillCircle(col, "yellow", 1);
    } else if(player == player2) {
        fillCircle(col, "blue", 2);
    }
}

// Function to fill the lower circle in the column with the respective player´s color
function fillCircle(col, color, num) {        
    var circle = $("#p-" + row[col] + "_" + col);    
    circle.addClass(color);
    game[row[col]][col] = num;
    verifyVictory(player, game);
    row[col]--;
    if(finished(row)) 
        return;
    player = changePlayer(player); 
}

// Function to verify if there is a winner
function verifyVictory(player, game) {   
    // ROW:
    for (r = 0; r < 6; r++) {
        for (c = 0; c < 4; c++){
            if(player == player1 && (game[r][c] + game[r][c + 1] + game[r][c + 2] + game[r][c + 3]) === 4) {
                getData(value_player1);                   
                finalMessage(value_player1);     
                return;
            } else if(player == player2 && (game[r][c] + game[r][c + 1] + game[r][c + 2] + game[r][c + 3]) === 8) {
                getData(value_player2);                   
                finalMessage(value_player2);     
                return;
            }
        }            
    }
    // COLUMNS:
    for (c = 0; c < 7; c++) {
        for (r = 0; r < 3; r++){
            if(player == player1 && (game[r][c] + game[r + 1][c] + game[r + 2][c] + game[r + 3][c]) === 4) {
                getData(value_player1);                   
                finalMessage(value_player1);     
                return;
            } else if(player == player2 && (game[r][c] + game[r + 1][c] + game[r + 2][c] + game[r + 3][c]) === 8) {
                getData(value_player2);                   
                finalMessage(value_player2);     
                return;
            }
        }            
    }   
    // DIAGONALS /:
    for (r = 0; r < 3; r++) {
        for (c = 0; c < 4; c++){
            if(player == player1 && (game[r][c] + game[r + 1][c + 1] + game[r + 2][c + 2] + game[r + 3][c + 3]) === 4) {
                getData(value_player1);                   
                finalMessage(value_player1);     
                return;
            } else if(player == player2 && (game[r][c] + game[r + 1][c + 1] + game[r + 2][c + 2] + game[r + 3][c + 3]) === 8) {
                getData(value_player2);                   
                finalMessage(value_player2);     
                return;
            }
        }            
    }               
    // DIAGONALS \:
    for (r = 0; r < 3; r++) {
        for (c = 3; c < 7; c++) {
            if(player == player1 && (game[r][c] + game[r + 1][c - 1] + game[r + 2][c - 2] + game[r + 3][c - 3]) === 4) {
                getData(value_player1);                   
                finalMessage(value_player1);     
                return;
            } else if(player == player2 && (game[r][c] + game[r + 1][c - 1] + game[r + 2][c - 2] + game[r + 3][c - 3]) === 8) {
                getData(value_player2);                   
                finalMessage(value_player2);     
                return;
            }
        }        
    }
    return;
}   

//AUXILIARY FUNCTIONS:    
// Function to add zero befor numbers from 0 to 9:
function addZero(number) {
    if (number < 10) 
        number = "0" + number;
    return number;
}

// Function to verify if every circle is filled
function finished(array) {
    let sum = 0;
    for(i = 0; i < array.length; i++){
        sum = sum + array[i];
    }
    if(sum === -7) {
        getData("EMPATE");
        finalMessage("EMPATE");
        return true;
    }
    return false;
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

// Function to show a final message with the winner name
function finalMessage(winner) {
    if(winner === "EMPATE"){
        message.text("EMPATE");
    } else {
        message.text(winner + " Venceu!");
    }
    show_message.show();
}

/////////////////////////////////////// CLOCKER - Start ///////////////////////////////////////
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
    clearInterval(INTERVAL)
}

function reset() {
    clearInterval(INTERVAL)
    secNum = 0
    minNum = 0
    sec.innerHTML = '00'
    min.innerHTML = '00'
}
/////////////////////////////////////// CLOCKER - End ///////////////////////////////////////


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
        arrayRes.unshift({  game_name: "Quatro em Linha",
                            time: time,
                            winner: winner,
                            date: date
                      });                        
        localStorage.setItem("history", JSON.stringify(arrayRes));    
    }  
}
/////////////////////////////////////// LOCAL STORAGE - End ///////////////////////////////////////


/////////////////////////////////////// TEACHER OPTION ///////////////////////////////////////

/*
// Teacher function - alternative to verify victory 
function verifyVictory(player, game) {    
    // [x, y, r-limit, c-limit]
    let directions = [
        [0, 1, 6, 4],
        [1, 0, 3, 7],
        [1, 1, 3, 4],
        [1, -1, 3, 7]
    ]

    for(let i = 0; i < directions.length; i++) {
        let x = directions[i][0];
        let y = directions[i][1];
        for (r = 0; r < directions[i][2]; r++) {
            for (c = 0; c < directions[i][3]; c++){
                if((game[r][c] + game[r + x][c + y] + game[r + x*2][c + y*2] + game[r + x*3][c + y*3]) === (player === player1 ? 4 : 8)) {
                    getData(player === player1 ? value_player1 : value_player2);                   
                    finalMessage(player === player1 ? value_player1 : value_player2);     
                    return;
                }
            }            
        }
    }
}
    */