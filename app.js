const cells = Array.from(document.querySelectorAll('.cell'));
const playerDisplay = document.querySelector('.display-player');
const resetBtn = document.querySelector('#reset');
const result = document.querySelector('.result');

let board = ['','','','','','','','','',];
let currentPlayer = 'X';
let isGameActive = true;

const playerX_won = 'PlayerX won';
const playerO_won = 'PlayerO won';
const tie = 'Tie';

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

cells.forEach((cell,index)=>{
    cell.addEventListener('click', ()=>{
        console.log('clicked >>', index)
        userAction(cell,index);
    })
})

const userAction= (cell,index)=>{
    if(isValidAction(cell) && isGameActive){
        cell.innerText = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const changePlayer = () =>{
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    console.log('currnet player >>', currentPlayer);
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
}

const winner = type =>{
    switch(type){
        case playerO_won:
            result.innerHTML = `PLayer <span class="playerO">O</span> won`;
            break;
        case playerX_won:
            result.innerHTML = `Player <span class="playerX"> X </span> won`;
            break;
        case tie:
            result.innerHTML = 'Tie';
    }
    result.classList.remove('hide')
}

function handleResultValidation(){
    let roundWon = false;
    for (let i =0; i<=7; i++){
        const winCondition = winningConditions[i];
        console.log('winnign conditions >>', winCondition);
        const a = board[winCondition[0]];
        console.log('a >>', a);
        const b = board[winCondition[1]];
        console.log('b >>', b);
        const c = board[winCondition[2]];
        console.log('c >>', c);
        console.log('board >>', board);
        if(a === '' || b === '' || c === ''){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        winner(currentPlayer === 'X' ? playerX_won : playerO_won);
        isGameActive = false;
        return;
    }
    if(!board.includes('')){
        winner(tie)
    }
}

const isValidAction= cell =>{
    if(cell.innerHTML === 'X' || cell.innerHTML === 'O'){
        return false;
    }
    return true;
}

const updateBoard = index =>{
    board[index] = currentPlayer
}

const resetBoard = () =>{
    board = ['','','','','','','','','',];
    isGameActive = true;
    result.classList.add('hide');

    if(currentPlayer === 'O'){
        changePlayer();
    }

    cells.forEach(cell=>{
        cell.innerHTML = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    })
}

resetBtn.addEventListener('click', resetBoard)