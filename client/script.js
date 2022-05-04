let osTurn 
const oClass ='o';
const xClass = 'x';
const winText = document.querySelector('[data-winning-message-text]');
const winScreen = document.getElementById('winningMessage');
const WIN_COMBO = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restart = document.getElementById('restartButton');

// socket init

const sock = io();

restart.addEventListener('click', startGame);

startGame();


function startGame(){
    osTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(xClass)
        cell.classList.remove(oClass)
        cell.addEventListener('click', clickHandle , {once : true})
    })
    boardHover();
    winScreen.classList.remove('show');

}


function clickHandle(e){
    const cell = e.target;
    const currentClass = osTurn ? oClass : xClass;
   //place mark
   placeMark(cell, currentClass);
   //check for win
   if (checkWin(currentClass)){
       endGame(false);
   }
   else if(isDraw()){
        endGame(true);
   }
   else{
     //check for draw
    //switch Turns
    switchTurns();
    boardHover();
   }
  
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function switchTurns(){
    osTurn = !osTurn;
}

function boardHover(){
    board.classList.remove(oClass);
    board.classList.remove(xClass);
    osTurn ? 
    board.classList.add(oClass): board.classList.add(xClass);
}

function checkWin(currentClass){
    return WIN_COMBO.some(combo =>{
       return combo.every(index =>{
          return cells[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw){
    if (draw){
        winText.innerText = 'Draw!';
        winScreen.classList.add('show');
    }
    else{
        winText.innerText = `${osTurn ? "O" : "X" }'s wins!` ;
        winScreen.classList.add('show');
    }
}

function isDraw(){
    return [...cells].every(cell =>{
       return cell.classList.contains(xClass) ||  cell.classList.contains(oClass);
    })
}
