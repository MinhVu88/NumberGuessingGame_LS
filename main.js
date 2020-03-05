let game = {
    'min': 1,
    'max': 10
};

function showMessage(msg, color) {
    game.msg.innerHTML = msg;

    game.msg.style.color = color || 'black';
};

function getRandomNo(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function endGame() {
    game.btn.innerHTML = 'Reset';

    game.input.style.display = 'none';

    game.btn.classList.add('replay'); // when game's over, guess btn ---> replay btn

    game.max += 5; // after each reset, max increases by 5
};

function guess() {
    // if user hits replay, init() is called -> replay btn ---> guess btn -> input field shows up
    if (game.btn.classList.contains('replay')) {
        init();

        game.btn.innerHTML = 'Guess';

        game.input.style.display = 'inline-block';

        game.btn.classList.remove('replay');
    } else {
        // if btn has no replay class, that means user's still guessing
        game.rounds++;

        let user = parseInt(game.input.value);

        game.input.value = ''; // the input field is blank after each guess entered

        if (user === game.random) {
            showMessage(`Correct! user: ${user} (in ${game.rounds} rounds) | computer: ${game.random}`);

            game.input.style.borderColor = 'green';

            endGame(); // when user wins, game's over
        } else if(user < game.min || user > game.max) {
            showMessage('Invalid guess', 'crimson');
        } else {
            let feedback = user > game.random ? {'color': 'yellow', 'content': 'user > computer'} 
                                              : {'color': 'blue', 'content': 'user < computer'};

            showMessage(feedback.content, feedback.color);

            game.input.style.borderColor = feedback.color;
        }

        console.log(game.random);
    }
};

// initialize the game
function init() {
    game.rounds = 0;

    game.random = getRandomNo(game.max, game.min);

    showMessage(`Let\'s make a wild guess to get a correct number between ${game.min} & ${game.max}`, 'pink');
};

// once the DOM's content loads, the main gameplay kicks in 
document.addEventListener('DOMContentLoaded', () => {
    game.input = document.querySelector('input');

    game.output = document.querySelector('.output');

    game.msg = document.querySelector('.message');

    game.btn = document.querySelector('button');

    game.btn.addEventListener('click', guess);

    init();
});