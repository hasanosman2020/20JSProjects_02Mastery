const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const playerChoice = document.getElementById('playerChoice');
const computerChoice = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('[computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGamesIcons = document.querySelectorAll('.fas');

// Putting player selection values and styling icons
function select(playerChoice){
   console.log(playerChoice);
    // Add 'selected' styling and playerChoice value
    switch(playerChoice){
        case 'rock':
            playerRock.classList.add('selected');
            playerChoice.textContent === ' --- Rock';
            break;
            case 'paper':
                playerPaper.classList.add('selected');
                playerChoice.textContent === ' --- Paper';
                break;
                case 'scissors':
                    playerScissors.classList.add('selected');
                    playerChoice.textContent === ' --- Scissors';
                    break;
                    case 'lizard':
                        playerLizard.classList.add('selected');
                        playerChoice.textContent === ' --- Lizard';
                        break;
                        case 'spock':
                            playerSpock.classList.add('selected');
                            playerChoice.textContent === ' --- Spock';
                            break;
                            default:
                                break;

    }
}
select()



const choices = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'spock'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
    spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
  };
  
