// HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
// const start = document.querySelector('#start-page');
// const container = document.querySelector('.container');

// game constants

//storing the symbols for x and o in the variables
const xSymbol = '×';
const oSymbol = '○';

// game variables

//if this is true then the game is on and if not then we are going to set this false manually in case is someone won or etc
let gameIsLive = true;
let xIsNext = true; //if this variable is true then x has next turn

//what happen when 'Start' Button Will Click
// start.addEventListener("click", () => {
//     start.style.display = "none";
//     container.style.display = "block";
// });

// functions

//taking in the x or o and returning symbol for the same
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
    //this handles and prints if x has won or o and set gameIsLive to false since someone has won or game is tied so game should not proceed
    gameIsLive = false;
    if(letter === 'x'){
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won!`;
//             if(letterToSymbol(letter)){
//                    alert("X has Won");
//             }   
    }else{
        statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`;
    }
};

const checkGameStatus = () => {
    const topLeft = cellDivs[0].classList[2];
    const topMiddle = cellDivs[1].classList[2];
    const topRight = cellDivs[2].classList[2];
    const middleLeft = cellDivs[3].classList[2];
    const middleMiddle = cellDivs[4].classList[2];
    const middleRight = cellDivs[5].classList[2];
    const bottomLeft = cellDivs[6].classList[2];
    const bottomMiddle = cellDivs[7].classList[2];
    const bottomRight = cellDivs[8].classList[2];

    // check winner

    //we are checking for each starting to ending row and columns cells to check if there is some symbol or not also for win or tied

    if(topLeft && topLeft === topMiddle && topLeft === topRight){ //for row no. 1
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){ //for row no. 2
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){ //for row no. 3
        handleWin(bottomLeft); 
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topLeft && topLeft === middleLeft && topLeft === bottomLeft){ //for column no. 1
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle){ //for column no. 2
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }else if(topRight && topRight === middleRight && topRight === bottomRight){ //for column no. 3
    handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topLeft && topLeft === middleMiddle && topLeft === bottomRight){ //for main diagonal
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }else if(topRight && topRight === middleMiddle && topRight === bottomLeft){ //for second diagonal
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
        //if each of the cell is occupied and none of the condition is true then match is tied
        gameIsLive = false;
        statusDiv.innerHTML = 'Game is tied!';
    }else{
        //if no condition is met the players should continue playing
        xIsNext = !xIsNext;
        //accessing and changing the value of turn for both x and o
        if(xIsNext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }else{
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};


// event Handlers
const handleReset = () => {
    xIsNext = true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    //when game is reset then all the new added classes should be removed from classList which will inturn remove all the symbols
    for (const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
    //it is set to true so that a new game can be started
    gameIsLive = true;
};


//this handles what should happen when some player clicks the cell with its symbol
const handleCellClick = (e) => {
    const classList = e.target.classList;

    //if some element is already there then do nothing and return
    if(!gameIsLive || classList[1] === 'x' || classList[1] === 'o'){
        return;
    }

    //if no element is present in the box then check if xIsNext is true & add x to the classList else add o 
    //and set that to opposite of the present one (xisNext is used to check if X has the next turn or not)
    if(xIsNext){
        classList.add('x');
        checkGameStatus(); //checking the status of the game after each click to see if we have to put x or o
    }else{
        classList.add('o');
        checkGameStatus();
    }
};


// event listeners

//adding event listeners to reset button and each of 9 game cells

resetDiv.addEventListener('click', handleReset);

for(const cellDiv of cellDivs){
  cellDiv.addEventListener('click', handleCellClick)
}