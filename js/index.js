const holes = document.getElementsByClassName('hole');
const moles = document.getElementsByClassName('mole');

let score = 0;
let endGame = false;
let counter = 0;

const moveMole = () => {
    // choose a random hole for the mole to pop out of
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // move the mole up
    hole.classList.add('up');

    // choose a random amount of time between 2 ms and 1 s
    const randomTime = Math.round(Math.random() * (1000 - 200) + 200);
    
    // after a random amount of time, move the mole down
    setTimeout(() => {
        hole.classList.remove('up');

        // if the game is still going, take another turn
        if (!endGame) takeTurn();
    }, randomTime);
}

const takeTurn = () => {
    // increment counter by one
    counter++;

    // check for the end of the game
    counter >= 20 ? endGame = true : endGame = false;

    // move a random mole up
    moveMole();
}

const startGame = () => {
    takeTurn();
}

// bind event listener to start button
document.getElementById('start').addEventListener('click', startGame)



const whack = () => {
    // increment the score by one
    score++;

    // update the score on the screen
    document.getElementById('score').textContent = score;
}

// bind event listeners to each mole
for (index in moles) {
    const mole = moles[index];
 
    if (typeof(mole) === 'object') {
        mole.addEventListener('click', whack);
    }
}
