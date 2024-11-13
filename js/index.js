
const gridSpaces = document.querySelectorAll('.grid-space');
const scoreDisplay = document.getElementById('score');

let snake = [0];
let direction = 1;
let interval;
let appleIndex;
let score = 0;
let applePlaced = false;

const placeApple = () => {
    document.querySelectorAll('.apple').forEach(apple => apple.remove());

    appleIndex = Math.floor(Math.random() * gridSpaces.length);
    const apple = document.createElement('div');
    apple.classList.add('apple');
    gridSpaces[appleIndex].appendChild(apple);
};

const moveSnake = () => {
    const head = snake[0] + direction;

    const hitLeftWall = head % 8 === 7 && direction === -1;
    const hitRightWall = head % 8 === 0 && direction === 1;
    const hitTopWall = head < 0;
    const hitBottomWall = head >= gridSpaces.length;
    if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || snake.includes(head)) {
        clearInterval(interval);
        alert("Game Over! Your score: " + score);
        return;
    }

    if (head === appleIndex) {
        score++;
        scoreDisplay.textContent = score;

        snake.unshift(head);

        placeApple();
    } else {
        const tail = snake.pop();
        gridSpaces[tail].classList.remove('snake');
        snake.unshift(head);
    }

    snake.forEach(index => gridSpaces[index].classList.add('snake'));
};

document.addEventListener('keydown', (event) => {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    if (arrowKeys.includes(event.key) && !applePlaced) {
        placeApple(); 
        applePlaced = true;
        interval = setInterval(moveSnake, 200); 
    }

    switch(event.key) {
        case 'ArrowUp': direction = -8; break; 
        case 'ArrowDown': direction = 8; break; 
        case 'ArrowLeft': direction = -1; break; 
        case 'ArrowRight': direction = 1; break; 
    }
});
