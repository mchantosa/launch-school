const readline = require('readline-sync');


const VALID_CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'Spock'];
const EVALUATOR_1 = ['rock' , 'lizard' , 'Spock' , 'scissors' , 'paper'];
const EVALUATOR_2 = ['lizard' , 'paper' , 'Spock' , 'rock' , 'scissors'];
const prompt = '\n\n=> ';
const rockPaperScissorLizardSpockRules = `\n\n
  Step 1. You choose one from: ${VALID_CHOICES.join(', ')}
  Step 2. I choose one from: ${VALID_CHOICES.join(', ')}
  Step 3. We decipher the winner:
    rock > lizard > Spock > scissors > paper > rock
    lizard > paper > Spock > rock > scissors > lizard
    \n\n`;


console.log(`Greetings human, thank you for playing ${VALID_CHOICES.join(', ')} with me. Yay, I'm so excited!`);
if (readline.keyInYNStrict('\nWould you like for me to review the rules?')) {
  console.log(rockPaperScissorLizardSpockRules);
}

const NUMBER_OF_ROUNDS_TO_BE_PLAYED = askPlayerBestOfHowManyRounds();
const gameTalley = {computer: 0, player: 0};
const definitiveWin = (NUMBER_OF_ROUNDS_TO_BE_PLAYED + 1) / 2;

while (Math.max(gameTalley.computer, gameTalley.player) < definitiveWin) {
  let roundResult = playOneRound();
  if (['computer', 'player'].includes(roundResult[0])) {
    gameTalley[roundResult[0]]++;
    if (Math.max(gameTalley.computer, gameTalley.player) < definitiveWin) {
      console.log(`\nYou ${gameTalley.player}, me ${gameTalley.computer}, let's go again`);
    } else {
      const iVersesYou = (gameTalley.player > gameTalley.computer) ? 'you' : 'I';
      console.clear();
      console.log(`\nBest of ${NUMBER_OF_ROUNDS_TO_BE_PLAYED} accomplished. You ${gameTalley.player}, me ${gameTalley.computer}, ${iVersesYou} win! Good job human 😁`);
    }
  } else if (roundResult[0] === 'break') {
    if (roundResult[1] === 'player says make it stop') {
      console.log('\nSorry to see you go friend, maybe next time');
      break;
    } else {
      console.log(`\nOoooooo, looks like a tie. We both chose ${roundResult[1]}, let's go again`);
    }
  }
}


function askPlayerBestOfHowManyRounds() {
  let userBestOfHowManyInput;
  while (true) {
    userBestOfHowManyInput = readline.questionInt(
      '\nBest of? How many rounds would you like to play? (You should pick an odd number)' + prompt);
    if (!(userBestOfHowManyInput % 2)) {
      console.log(`\nYou entered ${userBestOfHowManyInput}, you should really pick an odd number`);
    } else if (userBestOfHowManyInput < 0) {
      console.log(`\nYou entered ${userBestOfHowManyInput}, you should really pick a POSITIVE odd number`);
    } else break;
  }
  console.log(`\nBest of ${userBestOfHowManyInput}, excellent!`);
  return userBestOfHowManyInput;
}

function playOneRound() {
  /*Returns one of three options:
  - Player wants to terminate game: ["break", "player says make it stop"]
  - The game tied: ["break", entry that tied]
  - There was a clear winner: [person who won]*/
  const computerChoice = VALID_CHOICES[Math.floor(Math.random() * 5)];
  const playerChoice = playerChoosesAnEntry();
  if (playerChoice === 'break') return [playerChoice, 'player says make it stop'];
  const evaluator = chooseAnEvaluatorToSelectWinner(
    computerChoice, playerChoice);
  if (!evaluator) return ['break', computerChoice];
  return [evaluateToSelectWinner(evaluator, computerChoice, playerChoice)];
}

function chooseAnEvaluatorToSelectWinner(computerChoice, playerChoice) {
  //Returns an EVALUATOR_1, EVALUATOR_2, or 0 in the event of a tie
  const evaluator1Distance = (computerChoice, playerChoice) => {
    if (computerChoice === playerChoice) {
      return 0;
    } else {
      return Math.abs(
        EVALUATOR_1.indexOf(computerChoice) - EVALUATOR_1.indexOf(playerChoice)
      );
    }
  };
  const distanceBetweenComputerChoiceAndPlayerChoice =
    evaluator1Distance(computerChoice, playerChoice);
  if (!distanceBetweenComputerChoiceAndPlayerChoice) {
    return 0;
  } else {
    return ((evaluator1Distance(computerChoice, playerChoice) === (1 || 3)) ?
      EVALUATOR_1 : EVALUATOR_2);
  }
}

function evaluateToSelectWinner(evaluator, computerChoice, playerChoice) {
  const differenceOfChoices =
    evaluator.indexOf(computerChoice) - evaluator.indexOf(playerChoice);
  if (Math.abs(differenceOfChoices) === 1) {
    if (evaluator.indexOf(computerChoice) < evaluator.indexOf(playerChoice)) {
      console.log(`\nThis round I chose ${computerChoice} and you chose ${playerChoice}. Yay, I won this round!`);
      return 'computer';
    } else {
      console.log(`\nThis round I chose ${computerChoice} and you chose ${playerChoice}. Awesome, you won this round!`);
      return 'player';
    }
  } else if (evaluator.indexOf(computerChoice) <
    evaluator.indexOf(playerChoice)) {
    console.log(`\nThis round I chose ${computerChoice} and you chose ${playerChoice}. Awesome, you won this round!`);
    return 'player';
  } else {
    console.log(`\nThis round I chose ${computerChoice} and you chose ${playerChoice}. Yay, I won this round!`);
    return 'computer';
  }
}

function playerChoosesAnEntry() {
  /* - Returns 'rock', 'paper', 'scissors', 'lizard', 'Spock', or 'break'.
     - 'break' is returned if user selects to cancel game */
  while (true) {
    const playerChoiceNumeric = readline.keyInSelect(VALID_CHOICES,"Chose one");
    console.clear();
    const playerChoice = (playerChoiceNumeric !== VALID_CHOICES.length) ?
      VALID_CHOICES[playerChoiceNumeric] : false;
    if (!playerChoice) {
      if (readline.keyInYNStrict('\nAre you sure you want to go?')) {
        console.log('\nSorry to see you leave, thank you for playing with me');
        return 'break';
      } else {
        console.log("\nYay, let's keep going");
      }
    } else {
      return playerChoice;
    }
  }
}