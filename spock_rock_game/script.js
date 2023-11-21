//import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';




const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGamesIcons = document.querySelectorAll('.fas');
//console.log(allGamesIcons)
let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;

const choices = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'spock'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
    spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
  };

function computerRandomChoice(){
    const computerChoiceNumber = Math.random();
    if(computerChoiceNumber < 0.2){
        computerChoice = 'rock';
    } else if (computerChoiceNumber <= 0.4){
            computerChoice = 'paper';
        } else if (computerChoiceNumber <= 0.6){
            computerChoice = 'scissors';
        } else if (computerChoiceNumber <= 0.8){
            computerChoice = 'lizard';
        }else if (computerChoice <= 1){
            computerChoice = 'spock';
        }
        //console.log(computerChoice)
}
function displayComputerChoice(){
    switch(computerChoice){
        case 'rock':
            computerRock.classList.add('selected');
            computerChoiceEl.textContent = ' --- Rock';
            break;
            case 'paper':
                computerPaper.classList.add('selected');
                computerChoiceEl.textContent = ' --- Paper';
                break;
                case 'scissors':
                    computerScissors.classList.add('selected');
                    computerChoiceEl.textContent = ' --- Scissors';
                    break;
                    case 'lizard':
                        computerLizard.classList.add('selected');
                        computerChoiceEl.textContent = ' --- Lizard';
                        break;
                        case 'spock':
                            computerSpock.classList.add('selected');
                            computerChoiceEl.textContent = ' --- Spock';
                            break;
                            default:
                                break;
    }
}

// Reset all 'selected' icons
function resetSelected(){
    allGamesIcons.forEach((icon) => {
        icon.classList.remove('selected')
    })
    //resetAll();
    import ('./confetti.js')
    .then((module)=> {
        module.stopConfetti();
        module.removeConfetti();
    }) 
}
    
    // Reset score & playerChoice/computerChoice
function resetAll(){
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    playerScoreEl.textContent = playerScoreNumber;
    computerScoreEl.textContent = computerScoreNumber;
    playerChoiceEl.textContent = '';
    computerChoiceEl.textContent = ''; 
    resultText.textContent = '';
    resetSelected();
    
}
window.resetAll = resetAll;

// Check result, increase scores, update resultText
function updateScore(playerChoice){
    console.log(playerChoice, computerChoice);
    if(playerChoice === computerChoice){
        resultText.textContent = "It's a tie.";
    } else {
        let choice = choices[playerChoice];
        console.log(choice.defeats.indexOf(computerChoice));
        if (choice.defeats.indexOf(computerChoice) > -1){
            import ('./confetti.js')
            .then((module) => {
                module.startConfetti();
            resultText.textContent = "You Won!";
            playerScoreNumber++;
            playerScoreEl.textContent = playerScoreNumber;
            });

        } else {
            resultText.textContent = "You Lost!";
            computerScoreNumber++;
            computerScoreEl.textContent = computerScoreNumber;
            }
    }
}

// Call functions to process turn
function checkResult(playerChoice){
    resetSelected();
    computerRandomChoice();
    displayComputerChoice();
    updateScore(playerChoice);
}

// Putting player selection values and styling icons
function select(playerChoice){
   //console.log(playerChoice);
   //resetSelected();
   checkResult(playerChoice);
   
    // Add 'selected' styling and playerChoice value
    switch(playerChoice){
        case 'rock':
            playerRock.classList.add('selected');
            playerChoiceEl.textContent = ' --- Rock';
            break;
            case 'paper':
                playerPaper.classList.add('selected');
                playerChoiceEl.textContent = ' --- Paper';
                break;
                case 'scissors':
                    playerScissors.classList.add('selected');
                    playerChoiceEl.textContent = ' --- Scissors';
                    break;
                    case 'lizard':
                        playerLizard.classList.add('selected');
                        playerChoiceEl.textContent = ' --- Lizard';
                        break;
                        case 'spock':
                            playerSpock.classList.add('selected');
                            playerChoiceEl.textContent = ' --- Spock';
                            break;
                            default:
                                break;

    }
}
window.select = select;


//On startup, set initial values
resetAll();
